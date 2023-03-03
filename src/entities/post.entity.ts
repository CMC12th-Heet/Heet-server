import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Store } from './store.entity';
import { Comment } from './comment.entity';

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  post_id: number;

  @Column()
  title: string;

  @Column()
  mini_title: string;

  @Column()
  content: string;

  @Column({ default: '' })
  file_url: string;

  // --- 이하 선택 옵션
  @Column({ default: 0, nullable: true })
  satisfaction?: number; // 행복지수

  @Column({ default: null, nullable: true })
  together_with: string;

  @Column({ default: null, length: 50, nullable: true })
  perfect_day: string;

  @Column({ default: null, length: 50, nullable: true })
  moving_tip: string;

  @Column({ default: null, length: 50, nullable: true })
  ordering_tip: string;

  @Column({ default: null, length: 50, nullable: true })
  other_tips: string;

  @Column({ default: false, nullable: true })
  is_local: boolean;

  @CreateDateColumn()
  created_at: Date;

  // ---------

  // ----- User : post = 1 : N -----
  @ManyToOne((type) => User, (user) => user.post, { eager: true })
  @JoinColumn()
  user: User;

  // ----- Store : Post = 1 : N -----
  @ManyToOne(() => Store, (store) => store.post, { eager: true })
  @JoinColumn()
  store: Store;

  // ------- Post:Comment = 1:N ------
  @OneToMany(() => Comment, (comment) => comment.post)
  comment: Comment[];
}
