import { UtilsService } from 'src/utils/utils.service'
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { PhoneNumberDto } from './download.dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class DownloadService {
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
        files.map(async (file) => {
          const base64 = file.buffer.toString('base64')
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
      throw new InternalServerErrorException('Something went wrong')
    }
  }
}
