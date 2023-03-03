import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: '이메일', default: 'aa@aa.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: '아이디', default: 'MITAdmin' })
  @IsNotEmpty()
  username: string;
  @ApiProperty({ description: '비밀번호', default: '1234' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: '아까 구한 동네 문자열 넣기', default: '강남구' })
  @IsNotEmpty()
  town: string;
}
