import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { Comment } from '../entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async createComment(
    getUser,
    createCommentDto: CreateCommentDto,
    postId: number,
  ) {
    const user = (await this.findUser(getUser.email)) || null;
    const post = (await this.findPost(postId)) || null;
    const comment = await this.commentRepository.create({
      ...createCommentDto,
      user,
      post,
    });
    await this.commentRepository.save(comment);
  }

  async findPostComment(id: number) {
    const post = await this.findPost(id);
    return await this.commentRepository
      .createQueryBuilder('u')
      .leftJoinAndSelect('u.user', 'g')
      .where('u.postPostId = :id', { id: post.post_id })
      .getMany();
  }

  async deleteComment(id: number) {
    const result = await this.commentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('댓글을 찾을 수 없습니다.');
    }
    return { message: 'gooood' };
  }

  async findUser(email) {
    return await this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async findPost(post_id) {
    return await this.postRepository.findOne({
      where: {
        post_id,
      },
    });
  }
}
