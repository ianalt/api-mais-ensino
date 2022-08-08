import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Subject } from 'src/subjects/subject.entity';
import { KnowledgeAreaOption } from './enums/knowledge-area-option.enum';

@Entity({ name: 'areas_conhecimento' })
export class KnowledgeArea {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @Column({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @Column({ name: 'active' })
  active: boolean;

  @Column({ name: 'name' })
  name: KnowledgeAreaOption;

  @Column({ name: 'description' })
  description: string;

  @OneToMany(() => Subject, (subject) => subject.knowledgeArea)
  subjects: Subject[];
}
