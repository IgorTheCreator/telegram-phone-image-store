import { UtilsService } from 'src/utils/utils.service'
import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common'
import { PhoneNumberDto, UpdateUserDto } from './download.dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class DownloadService {
  private readonly logger = new Logger(DownloadService.name)
  private telegramUrl = 'https://t.me/'
  constructor(private readonly utils: UtilsService, private readonly prisma: PrismaService) {}

  async dowloadInfo(files: Array<Express.Multer.File>, { phone }: PhoneNumberDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          phone,
        },
      })
      if (user) {
        throw new BadRequestException('User already exists')
      }

      const createdUser = await this.prisma.user.create({
        data: {
          phone,
          link: `${this.telegramUrl}${phone}`,
        },
        select: {
          id: true,
        },
      })

      Promise.all(
        files.map(async ({ buffer }) => {
          const base64 = buffer.toString('base64')
          const hash = this.utils.sha256(base64)

          return this.prisma.image.create({
            data: {
              hash,
              userId: createdUser.id,
            },
          })
        })
      )

      return { success: true }
    } catch (e) {
      this.logger.error(e)
      throw new InternalServerErrorException('Something went wrong')
    }
  }

  async updateInfo(files: Array<Express.Multer.File>, { phone }: PhoneNumberDto, { phone: newPhone }: UpdateUserDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          phone,
        },
        select: {
          id: true,
        },
      })

      if (!user) {
        throw new BadRequestException('User does not exists')
      }

      if (newPhone) {
        await this.prisma.user.update({
          where: {
            phone,
          },
          data: {
            phone: newPhone,
            link: `${this.telegramUrl}${newPhone}`,
          },
        })
      }

      await Promise.all(
        files.map(({ buffer }) => {
          const base64 = Buffer.from(buffer).toString('base64')
          const hash = this.utils.sha256(base64)
          return this.prisma.image.create({
            data: {
              hash,
              userId: user.id,
            },
          })
        })
      )

      return { success: true }
    } catch (e) {
      this.logger.error(e.message)
      throw new InternalServerErrorException('Internal Server Error')
    }
  }
}
