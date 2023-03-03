import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class Store extends BaseEntity {
  @PrimaryGeneratedColumn()
  store_id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  url: string;

  @Column()
  address: string;

  // ----- User : Post = 1:N ----
  @OneToMany(() => Post, (post) => post.store)
  post: Post[];

  // // ----- User : Like = 1 : N -----
  // @OneToMany(() => Like, (like) => like.user_id)
  // like_id: Like[];
}
