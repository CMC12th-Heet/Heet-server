import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { JwtStrategy } from '../user/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Post } from '../entities/post.entity';
import { Comment } from '../entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post, Comment])],
  controllers: [CommentController],
  providers: [CommentService, JwtStrategy, PassportModule],
})
export class CommentModule {}
