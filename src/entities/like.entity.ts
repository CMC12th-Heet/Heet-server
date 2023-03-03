// import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
// import { User } from './user.entity';
// import { Post } from './post.entity';
//
// @Entity()
// export class Like extends BaseEntity {
//   @PrimaryGeneratedColumn()
//   likeId: number;
//
//   // ----- User : Like = 1 : N -----
//   @ManyToOne(() => User, (user) => user.like_id)
//   user_id: User;
//
//   // ----- Post : Like = 1 : N -----
//   @ManyToOne(() => Post, (post) => post.like_id)
//   post_id: Post;
// }
