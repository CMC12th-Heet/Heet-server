import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @IsNotEmpty()
  @ApiProperty({ description: '코멘트' })
  content?: string;
}
