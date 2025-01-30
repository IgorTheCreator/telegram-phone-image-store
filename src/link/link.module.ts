import { Module } from '@nestjs/common'
import { LinkService } from './link.service'
import { UtilsModule } from 'src/utils/utils.module'
import { LinkController } from './link.controller';

@Module({
  imports: [UtilsModule],
  providers: [LinkService],
  controllers: [LinkController],
})
export class LinkModule {}
