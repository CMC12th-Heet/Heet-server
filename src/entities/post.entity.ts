import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Store } from './store.entity';

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

  @Column()
  fileUrl: string;

  // --- 이하 선택 옵션
  @Column({ default: null })
  satisfaction: number; // 행복지수

  @Column({ default: null })
  together_with: string;

  @Column({ default: null, length: 50 })
  perfect_day: string;

  @Column({ default: null, length: 50 })
  moving_tip: string;

  @Column({ default: null, length: 50 })
  ordering_tip: string;

  @Column({ default: null, length: 50 })
  other_tips: string;

  // ---------

  // ----- User : post = 1 : N -----
  @ManyToOne((type) => User, (user) => user.user_id)
  user_id: User;

  // ----- Store : Post = 1 : N -----
  @ManyToOne(() => Store, (store) => store.store_id)
  @JoinColumn()
  store_id: Store;
}
