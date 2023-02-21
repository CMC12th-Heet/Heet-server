import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class Content extends BaseEntity {
  @PrimaryGeneratedColumn()
  content_id: number;

  @Column()
  link: string;

  @Column()
  comment: string; // 사용자 Id

  // ----- post : content = 1 : N -----
  @ManyToOne((type) => Post, (post) => post.content_id)
  post_id: Post[];
}
