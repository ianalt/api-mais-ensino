import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { CommentFile } from 'src/comment-files/comment-file.entity';
import { Topic } from 'src/topics/topic.entity';
import { User } from 'src/users/user.entity';

@Entity({ name: 'comentarios' })
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @Column({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @Column({ name: 'active' })
  active: boolean;

  @Column({ name: 'content' })
  content: string;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'id_usuario' })
  user: User;

  @ManyToOne(() => Comment, (comment) => comment.subComments)
  @JoinColumn({ name: 'id_comentario' })
  comment: Comment;

  @OneToMany(() => Comment, (subComment) => subComment.comment)
  subComments: Comment[];

  @OneToMany(() => CommentFile, (commentFile) => commentFile.comment)
  commentFiles: CommentFile[];

  @ManyToOne(() => Topic, (topic) => topic.comments)
  @JoinColumn({ name: 'id_topico' })
  topic: Topic;
}
