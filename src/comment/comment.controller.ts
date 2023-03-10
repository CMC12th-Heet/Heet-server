import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../user/user.decorator';

@ApiBearerAuth('Authorization')
@UseGuards(AuthGuard('jwt'))
@ApiTags('댓글 API')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOperation({
    summary: '댓글 쓰기 API',
    description: '댓글을 쓴다',
  })
  @ApiParam({ description: '게시글 id', name: 'id' })
  @ApiBody({ description: '게시글 내용', type: CreateCommentDto })
  @Post(':id')
  createComment(
    @GetUser() getUser,
    @Body() createCommentDto: CreateCommentDto,
    @Param('id') id: string,
  ) {
    return this.commentService.createComment(getUser, createCommentDto, +id);
  }

  @ApiOperation({
    summary: '댓글 보기 API',
    description: '댓글을 본다',
  })
  @ApiParam({ description: '게시글 id', name: 'id' })
  @Get(':id')
  findPostComment(@Param('id') id: string) {
    return this.commentService.findPostComment(+id);
  }

  @ApiOperation({
    summary: '댓글 삭제 API',
    description: '댓글을 삭제한다',
  })
  @ApiParam({ description: '댓글 id', name: 'id' })
  @Get(':id')
  deleteComment(@Param('id') id: string) {
    return this.commentService.deleteComment(+id);
  }
}
