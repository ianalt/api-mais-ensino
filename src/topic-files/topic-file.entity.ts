import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Topic } from 'src/topics/topic.entity';

@Entity({ name: 'arquivos_topicos' })
export class TopicFile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @Column({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @Column({ name: 'active' })
  active: boolean;

  @Column({ name: 'file_url' })
  fileURL: string;

  @ManyToOne(() => Topic, (topic) => topic.topicFiles)
  @JoinColumn({ name: 'id_topico' })
  topic: Topic;
}
