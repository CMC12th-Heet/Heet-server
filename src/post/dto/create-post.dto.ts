import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @IsNotEmpty()
  @ApiProperty({ description: '제목' })
  title: string;

  @IsNotEmpty()
  @ApiProperty({ description: '소제목' })
  mini_title: string;

  @IsNotEmpty()
  @ApiProperty({ description: '내용' })
  content: string;

  @IsNotEmpty()
  @ApiProperty({ description: '선택한 장소 ID' })
  store_id: number;

  @ApiProperty({ description: '만족도' })
  satisfaction?: number;

  @ApiProperty({ description: '누구와 함께해요' })
  together_with?: string;

  @ApiProperty({ description: '어떤 날 방문해요' })
  perfect_day?: string;

  @ApiProperty({ description: '이동 꿀팁' })
  moving_tip?: string;

  @ApiProperty({ description: '주문 꿀팁' })
  ordering_tip?: string;

  @ApiProperty({ description: '기타 꿀팁' })
  other_tips?: string;
}
