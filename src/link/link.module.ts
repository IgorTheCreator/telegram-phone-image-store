import { Module } from '@nestjs/common'
import { UtilsModule } from 'src/utils/utils.module'
import { LinkController } from './link.controller'
import { LinkService } from './link.service'

@Module({
  imports: [UtilsModule],
  providers: [LinkService],
  controllers: [LinkController],
})
export class LinkModule {}
