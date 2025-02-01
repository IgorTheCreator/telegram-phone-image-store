import { createHash } from 'node:crypto'
import { Injectable } from '@nestjs/common'
import { toDataURL } from 'qrcode'

@Injectable()
export class UtilsService {
  sha256(content: string) {
    return createHash('sha256').update(content).digest('hex')
  }

  async generateQRcode(link: string) {
    return toDataURL(link)
  }
}
