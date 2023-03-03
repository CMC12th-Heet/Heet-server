import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './post.entity';
import { Comment } from './comment.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  username: string; // 사용자 Id

  @Column()
  password: string;

  @Column({ default: false })
  is_verify: boolean;

  @Column()
  town: string; // 사용자가 지정한 대표 동네

  // ----- User : Post = 1:N ----
  @OneToMany(() => Post, (post) => post.user)
  post: Post[];

  // ------- User :Comment = 1:N ------
  @OneToMany(() => Comment, (comment) => comment.user)
  comment: Comment[];
}
