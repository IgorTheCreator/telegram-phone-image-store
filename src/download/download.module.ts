import { Module } from '@nestjs/common'
import { UtilsModule } from 'src/utils/utils.module'
import { DownloadController } from './download.controller'
import { DownloadService } from './download.service'

@Module({
  imports: [UtilsModule],
  providers: [DownloadService],
  controllers: [DownloadController],
})
export class DownloadModule {}
