import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStoreDto {
  @ApiProperty({ description: '가게 이름', default: '롤리폴리꼬또' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'kakaomap url',
    default: 'http://place.map.kakao.com/810229516',
  })
  @IsNotEmpty()
  url: string;

  @ApiProperty({
    description: '가게 지번 주소',
    default: '서울 강남구 논현동 269-10',
  })
  @IsNotEmpty()
  address: string;
}
