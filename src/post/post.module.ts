import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../entities/post.entity';
import { User } from '../entities/user.entity';
import { JwtStrategy } from '../user/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { MapService } from './map.service';
import { UploadService } from './upload.service';
import { HttpModule } from '@nestjs/axios';
import { Store } from '../entities/store.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post, Store]), HttpModule],
  controllers: [PostController],
  providers: [
    PostService,
    JwtStrategy,
    PassportModule,
    MapService,
    UploadService,
  ],
})
export class PostModule {}
