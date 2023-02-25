import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyEmailDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: '이메일' })
  email: string;
}
