import { Controller, Delete, Get, Param, StreamableFile, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { PhoneNumberDto } from './link.dto'
import { LinkService } from './link.service'

@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Get('/')
  @UseInterceptors(FileInterceptor('file'))
  getLink(@UploadedFile() file: Express.Multer.File) {
    return this.linkService.getLink(file)
  }

  @Get('/qrcode')
  @UseInterceptors(FileInterceptor('file'))
  async getQRCode(@UploadedFile() file: Express.Multer.File) {
    const image = await this.linkService.getQRCode(file)
    return new StreamableFile(image, {
      type: 'image/png',
      length: image.length,
      disposition: 'attachment; filename="qrcode.png"',
    })
  }

  @Delete('/:phone')
  deleteLink(@Param() phone: PhoneNumberDto) {
    return this.linkService.deleteLink(phone)
  }
}
