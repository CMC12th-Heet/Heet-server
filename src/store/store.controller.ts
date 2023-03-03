import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth('Authorization')
@UseGuards(AuthGuard('jwt'))
@Controller('store')
@ApiTags('지도 API')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  @ApiOperation({
    summary: '장소 등록 api',
    description: '장소를 등록한다.',
  })
  @ApiBody({ description: '장소 등록', type: CreateStoreDto })
  create(@Body() createStoreDto: CreateStoreDto) {
    return this.storeService.create(createStoreDto);
  }

  @Get()
  @ApiOperation({ summary: '장소 조회 API', description: '위치를 조회합니다.' })
  @ApiQuery({ description: '장소 키워드', name: 'keyword' })
  findByKeyword(@Query('keyword') keyword: string) {
    return this.storeService.findByKeyword(keyword);
  }
}
