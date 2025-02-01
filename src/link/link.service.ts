import { Buffer } from 'node:buffer'
import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { UtilsService } from 'src/utils/utils.service'
import { PhoneNumberDto } from './link.dto'

@Injectable()
export class LinkService {
  private readonly logger = new Logger(LinkService.name)
  constructor(private readonly utils: UtilsService, private readonly prisma: PrismaService) {}

  async getLink(file: Express.Multer.File) {
    try {
      const base64 = file.buffer.toString('base64')
      const hash = this.utils.sha256(base64)
      const image = await this.prisma.image.findFirst({
        where: {
          hash,
        },
        select: {
          userId: true,
        },
      })
      const user = await this.prisma.user.findUnique({
        where: {
          id: image.userId,
        },
        select: {
          link: true,
          phone: true,
        },
      })
      if (!user) {
        throw new BadRequestException('User does not exists')
      }
      return { link: user.link, phone: user.phone }
    } catch (e) {
      this.logger.error(e.message)
      throw new InternalServerErrorException('Something went wrong')
    }
  }

  async deleteLink({ phone }: PhoneNumberDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          phone,
        },
      })

      if (!user) {
        throw new BadRequestException('User does not exists')
      }

      await this.prisma.user.delete({
        where: {
          phone,
        },
      })

      return { success: true }
    } catch (e) {
      this.logger.error(e)
      throw new InternalServerErrorException('Something went wrong')
    }
  }

  async getQRCode(file: Express.Multer.File) {
    try {
      const base64 = file.buffer.toString('base64')
      const hash = this.utils.sha256(base64)
      const image = await this.prisma.image.findFirst({
        where: {
          hash,
        },
        select: {
          userId: true,
        },
      })
      const user = await this.prisma.user.findUnique({
        where: {
          id: image.userId,
        },
        select: {
          link: true,
          phone: true,
        },
      })
      if (!user) {
        throw new BadRequestException('User does not exists')
      }

      const qrcode = await this.utils.generateQRcode(user.link)
      const imageQRCode = qrcode.split(',')[1]
      const imgBuffer = Buffer.from(imageQRCode, 'base64')

      return imgBuffer
    } catch (e) {
      this.logger.error(e.message)
      throw new InternalServerErrorException('Something went wrong')
    }
  }
}
