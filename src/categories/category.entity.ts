import { Classes } from 'src/classes/classes.entity';
import { Subject } from 'src/subjects/subject.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @OneToMany(() => Classes, (oneClass) => oneClass.category)
  classes: Classes[];
}
