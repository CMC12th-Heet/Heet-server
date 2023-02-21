import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../entities/post.entity';
import { User } from '../entities/user.entity';
import { JwtStrategy } from '../user/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post])],
  controllers: [PostController],
  providers: [PostService, JwtStrategy, PassportModule],
})
export class PostModule {}
