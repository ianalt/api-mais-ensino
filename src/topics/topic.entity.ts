import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comment } from 'src/comments/comment.entity';
import { Category } from 'src/categories/category.entity';
import { TopicFile } from 'src/topic-files/topic-file.entity';

@Entity({ name: 'topicos' })
export class Topic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @Column({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @Column({ name: 'active' })
  active: boolean;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'content' })
  content: string;

  @Column({ name: 'video_url', nullable: true })
  videoURL: string;

  @ManyToOne(() => Category, (category) => category.topics)
  @JoinColumn({ name: 'id_categoria' })
  category: Category;

  @OneToMany(() => TopicFile, (topicFile) => topicFile.topic)
  topicFiles: TopicFile[];

  @OneToMany(() => Comment, (comment) => comment.topic)
  comments: Comment[];
}
