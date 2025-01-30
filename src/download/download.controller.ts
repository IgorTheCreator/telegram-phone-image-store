import { DownloadService } from './download.service'
import { Body, Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { PhoneNumberDto } from './download.dto'

@Controller('download')
export class DownloadController {
  constructor(private readonly downloadService: DownloadService) {}

  @Post('/')
  @UseInterceptors(FilesInterceptor('files'))
  dowlnloadInfo(@UploadedFiles() files: Array<Express.Multer.File>, @Body() phone: PhoneNumberDto) {
    return this.downloadService.dowloadInfo(files, phone)
  }
}
