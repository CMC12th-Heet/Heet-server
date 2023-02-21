import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Content } from './content.entity';
import { User } from './user.entity';
import { Like } from './like.entity';

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  post_id: number;

  @Column()
  title: string;

  // ----- post : content = 1 : N -----
  @ManyToOne((type) => User, (user) => user.user_id)
  user_id: User;

  // ----- post : content = 1 : N -----
  @OneToMany(() => Content, (content) => content.post_id)
  @JoinColumn()
  content_id: Content[];

  // ----- Post : Like = 1 : N -----
  @OneToMany(() => Like, (like) => like.post_id)
  like_id: Like[];
}
