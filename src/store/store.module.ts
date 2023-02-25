import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from '../entities/store.entity';
import { JwtStrategy } from '../user/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { User } from '../entities/user.entity';
import { HttpModule } from '@nestjs/axios';
import { MapService } from '../post/map.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Store]), HttpModule],
  controllers: [StoreController],
  providers: [StoreService, JwtStrategy, PassportModule, MapService],
})
export class StoreModule {}
