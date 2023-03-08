import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { UpdatePostDto } from './dto/update-post.dto';
import { MapService } from './map.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../user/user.decorator';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

let FileExtender;

@ApiBearerAuth('Authorization')
@UseGuards(AuthGuard('jwt'))
@Controller('post')
@ApiTags('게시판 API')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly uploadService: UploadService,
    private readonly mapService: MapService,
  ) {}

  @ApiOperation({
    summary: '게시글 작성 API',
    description: '작성한다.',
  })
  @Post()
  @UseInterceptors(FilesInterceptor('files', 10)) // 10은 최대파일개수
  @ApiBody({ description: '게시판,,, + 사진 여러개', type: CreatePostDto })
  async uploadFile(
    @GetUser() getUser,
    @UploadedFiles() files,
    @Body() createPostDto: CreatePostDto,
  ) {
    if (!(await this.postService.is_verify(getUser.email)))
      return new ForbiddenException('위치 인증을 먼저 해주세요.');
    return this.postService.create(getUser, createPostDto, files);
  }

  @ApiOperation({
    summary: '전체 조회 API',
    description: '전체 글 조회(로컬만)',
  })
  @ApiQuery({ description: '새로운 글 순서', name: 'isNew' })
  @ApiQuery({ description: '인기 글 순서', name: 'isHot' })
  @Get()
  findAll(@Query('isNew') isNew: string, @Query('isHot') isHot: string) {
    return this.postService.findAll(isNew, isHot);
  }

  @ApiOperation({
    summary: '게시글 상세 조회 API',
    description: '게시글 상세 조회합니다.',
  })
  @ApiQuery({ description: '게시글 id', name: 'id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  update(
    @GetUser() getUser,
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postService.update(getUser, +id, updatePostDto);
  }

  @Post('/verify')
  @ApiOperation({ summary: '(초기 1회)로컬 인증 API', description: '중복확인' })
  @ApiQuery({ description: '현재 좌표 x', name: 'x' })
  @ApiQuery({ description: '현재 좌표 y', name: 'y' })
  verifyMyTown(
    @GetUser() getUser,
    @Query('x') x: string,
    @Query('y') y: string,
  ) {
    return this.postService.verifyMyTown(getUser, x, y);
  }
}
