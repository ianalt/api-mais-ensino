import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Comment } from 'src/comments/comment.entity';

@Entity({ name: 'arquivos_comentarios' })
export class CommentFile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @Column({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @Column({ name: 'active' })
  active: boolean;

  @Column({ name: 'file_url' })
  fileUrl: string;

  @ManyToOne(() => Comment, (comment) => comment.commentFiles)
  @JoinColumn({ name: 'id_comentario' })
  comment: Comment;
}
