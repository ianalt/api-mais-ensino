import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from 'src/categories/category.entity';
import { KnowledgeArea } from 'src/knowledge-areas/knowledge-area.entity';
import { User } from 'src/users/user.entity';
import { SubjectOption } from './enums/subject-option.enum';

@Entity({ name: 'disciplinas' })
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @Column({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @Column({ name: 'active' })
  active: boolean;

  @Column({ name: 'name' })
  name: SubjectOption;

  @Column({ name: 'description', nullable: true })
  description: string;

  @OneToMany(() => User, (user) => user.subject)
  users: User[];

  @ManyToOne(() => KnowledgeArea, (knowledgeArea) => knowledgeArea.subjects)
  @JoinColumn({ name: 'id_area_conhecimento' })
  knowledgeArea: KnowledgeArea;

  @OneToMany(() => Category, (category) => category.subject)
  categories: Category[];
}
