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

  async create(getUser, createPostDto: CreatePostDto, files) {
    const file_url = await this.getFileLinks(files);
    const user = await this.findUser(getUser.email);
    const store = await this.findStore(createPostDto.store_id);
    const is_local = store.address.includes(user.town);

    const satisfaction = createPostDto.satisfaction
      ? Number(createPostDto.satisfaction)
      : null;

    const post = await this.postRepository.create({
      ...createPostDto,
      user,
      store,
      file_url,
      satisfaction,
      is_local,
    });
    await this.postRepository.save(post).catch((e) => {
      return e;
    });
    return post;
  }

   async update(getUser, id, updatePostDto: UpdatePostDto) {
     const user = await this.findUser(getUser.email);
     const post = await this.postRepository.findOne({where:{post_id:id}});
     if(post.user == user){
       return  await this.postRepository
         .createQueryBuilder()
         .update(Post)
         .set({ ...updatePostDto })
         .where("postPostid = :id", { id: id }  )
         .execute()
     }
     return {"message":"본인만 삭제할 수 있습니다."}

 }

  async getFileLinks(files) {
    let imgPATHBundle = '';
    await Promise.all(
      files.map(async (file: Express.Multer.File) => {
        const key = await this.uploadService.uploadImage(file);
        imgPATHBundle += `${key};`;
      }),
    );
    return imgPATHBundle;
  }

  async findAll(isNew, isHot) {
    const posts = await this.postRepository.find({
      where: {
        is_local: true,
      },
      order: {
        created_at: isNew ? 'ASC' : 'DESC',
      },
    });
    posts.map((value, index) => {
      value['urlList'] = value.file_url.slice(0, -1).split(';');
      if (!value.is_local) delete value[index]; // error 날수도 있음
    });
    return posts;
  }

  async findOne(id: number) {
    let post = await this.postRepository.findOne({
      where: {
        post_id: id,
      },
    });
    post['urlList'] = post.file_url.slice(0, -1).split(';');
    return post;
  }


  async verifyMyTown(getUser, x: string, y: string) {
    const user = await this.userRepository.findOne({
      where: { email: getUser.email },
    });
    const userAddress = await this.mapService.getUserAddressFromPosition(x, y);
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
