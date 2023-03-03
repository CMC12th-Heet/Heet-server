import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Post } from './post.entity';

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  comment_id: number;

  @Column({ nullable: true })
  content: string;

  @CreateDateColumn()
  created_at: Date;

  // ---------

  // ----- User : Comment = 1 : N -----
  @ManyToOne((type) => User, (user) => user.comment, { eager: true })
  @JoinColumn()
  user: User;

  // ----- Post : Comment = 1 : N -----
  @ManyToOne(() => Post, (post) => post.comment, { eager: true })
  @JoinColumn()
  post: Post;
}
