import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { UtilsService } from 'src/utils/utils.service'

@Injectable()
export class LinkService {
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
      return { link: user.link, phone: user.phone }
    } catch (e) {
      throw new Error('Something went wrong')
    }
  }
}
