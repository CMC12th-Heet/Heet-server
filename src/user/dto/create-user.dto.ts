import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: '이메일' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: '아이디' })
  @IsNotEmpty()
  username: string;
  @ApiProperty({ description: '비밀번호' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: '동네 이름(미정정,,)' })
  @IsNotEmpty()
  town: string;
}
