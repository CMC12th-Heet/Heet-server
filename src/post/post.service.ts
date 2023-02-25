import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { MapService } from './map.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { Store } from '../entities/store.entity';
import { UploadService } from './upload.service';

@Injectable()
export class PostService {
  constructor(
    private readonly mapService: MapService,
    private readonly uploadService: UploadService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(Store)
    private storeRepository: Repository<Store>,
  ) {}

  async create(getUser, createPostDto: CreatePostDto, fileUrl: string) {
    const user_id = await this.findUser(getUser.email);
    const store_id = await this.findStore(createPostDto.store_id);

    const post = await this.postRepository.create({
      ...createPostDto,
      user_id,
      store_id,
      fileUrl,
    });
    await this.postRepository
      .save(post)
      .then((post) => {
        console.log(post);
        return post;
      })
      .catch((e) => {
        return e;
      });
  }

  async getFileLinks(files) {
    console.log('in');
    let imgPATHBundle = '';
    await files.map(async (file: Express.Multer.File) => {
      const key = await this.uploadService.uploadImage(file);
      imgPATHBundle += `${key};`;
      console.log(key);
    });
    return imgPATHBundle;
  }

  findAll() {
    return `This action returns all post`;
  }

  async findOne(id: number) {
    let post = await this.postRepository.findOne({
      where: {
        post_id: id,
      },
    });
    post['urlList'] = post.fileUrl.split(';');
    return post;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  async verifyMyTown(getUser, x: string, y: string) {
    const user = await this.userRepository.findOne({
      where: { email: getUser.email },
    });
    const userAddress = await this.mapService.getUserAddressFromPosition(x, y);
    console.log(userAddress);
    console.log(user.town);
    if (userAddress.includes(user.town) && user.is_verify == false) {
      await this.userRepository
        .createQueryBuilder()
        .update()
        .set({
          is_verify: true,
        })
        .where('email = :email', { email: getUser.email })
        .execute();
      return Object.assign({
        message: 'success',
      });
    } else {
      return Object.assign({
        message: 'fail',
      });
    }
  }

  async is_verify(email) {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });
    return user.is_verify;
  }

  async findUser(email) {
    return await this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async findStore(storeId: number) {
    return await this.storeRepository.findOne({
      where: {
        store_id: storeId,
      },
    });
  }
}
