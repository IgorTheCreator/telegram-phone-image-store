import { DownloadService } from './download.service'
import { Body, Controller, Param, Post, Put, UploadedFiles, UseInterceptors } from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { PhoneNumberDto } from './download.dto'

@Controller('download')
export class DownloadController {
  constructor(private readonly downloadService: DownloadService) {}

  @Post('/')
  @UseInterceptors(FilesInterceptor('files'))
  dowlnloadInfo(@UploadedFiles() files: Array<Express.Multer.File>, @Body() body: PhoneNumberDto) {
    return this.downloadService.dowloadInfo(files, body)
  }

  @Put('/:phone')
  @UseInterceptors(FilesInterceptor('files'))
  updateInfo(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: PhoneNumberDto,
    @Param() param: PhoneNumberDto
  ) {
    return this.downloadService.updateInfo(files, param, body)
  }
}
