import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Subject } from 'src/subjects/subject.entity';
import { Topic } from 'src/topics/topic.entity';

@Entity({ name: 'categorias' })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @Column({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @Column({ name: 'active' })
  active: boolean;

  @Column({ name: 'name' })
  name: string;

  @ManyToOne(() => Subject, (subject) => subject.categories)
  @JoinColumn({ name: 'id_disciplina' })
  subject: Subject;

  @OneToMany(() => Topic, (topic) => topic.category)
  topics: Topic[];
}
