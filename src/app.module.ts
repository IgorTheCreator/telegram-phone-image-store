import { Module } from '@nestjs/common'
import { DownloadModule } from './download/download.module'
import { PrismaModule } from './prisma/prisma.module'
import { LinkModule } from './link/link.module';

@Module({
  imports: [PrismaModule, DownloadModule, LinkModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
