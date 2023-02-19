import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeORMConfig } from './config/typeORM.config';
import { PostModule } from './post/post.module';

@Module({
  imports: [UserModule, TypeOrmModule.forRoot(TypeORMConfig), PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
