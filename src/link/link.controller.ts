import { Controller, Delete, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { PhoneNumberDto } from './link.dto'
import { LinkService } from './link.service'

@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  getLink(@UploadedFile() file: Express.Multer.File) {
    return this.linkService.getLink(file)
  }

  @Delete('/:phone')
  deleteLink(@Param() phone: PhoneNumberDto) {
    return this.linkService.deleteLink(phone)
  }
}
