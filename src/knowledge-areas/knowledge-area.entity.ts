import { Subject } from 'src/subjects/subject.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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
  name: string;

  @Column({ name: 'description' })
  description: string;

  @OneToMany(() => Subject, (subject) => subject.knowledgeArea)
  subjects: Subject[];
}
