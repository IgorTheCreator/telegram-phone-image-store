import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class PhoneNumberDto {
  @ApiProperty({
    description: 'Номер телефона',
    pattern: '+7**********',
    example: '+7**********',
  })
  @IsString()
  phone: string
}
