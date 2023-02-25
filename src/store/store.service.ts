import { Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { MapService } from '../post/map.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from 'src/entities/store.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StoreService {
  constructor(
    private readonly mapService: MapService,
    @InjectRepository(Store)
    private storeRepository: Repository<Store>,
  ) {}

  async create(createStoreDto: CreateStoreDto) {
    const is_exist = await this.is_exist(createStoreDto.url);
    if (is_exist) return is_exist;
    const newStore = await this.storeRepository.create(createStoreDto);
    await this.storeRepository.save(newStore);
    return newStore.store_id;
  }

  findByKeyword(keyword: string) {
    return this.mapService.getStoreListFromKeyword(keyword);
  }

  async is_exist(url: string) {
    const store = await this.storeRepository.findOne({
      where: {
        url,
      },
    });
    if (store) return store.store_id;
    else return null;
  }
}
