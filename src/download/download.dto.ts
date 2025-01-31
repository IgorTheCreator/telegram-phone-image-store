import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class PhoneNumberDto {
  @ApiProperty({
    description: 'Номер телефона',
    pattern: '+7**********',
    example: '+7**********',
  })
  @IsString()
  phone: string
}

export class UpdateUserDto {
  @ApiProperty({
    description: 'Номер телефона',
    pattern: '+7**********',
    example: '+7**********',
    required: false,
  })
  @IsString()
  @IsOptional()
  phone?: string
}
