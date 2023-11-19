import { Answer } from 'src/answers/answer.entity';
import { Classes } from 'src/classes/classes.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'duvidas' })
export class Question {
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

  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[];

  @ManyToOne(() => User, (user) => user.createdQuestions)
  @JoinColumn({ name: 'created_by' })
  createdBy: User;

  @ManyToOne(() => Classes, (oneClass) => oneClass.questions)
  @JoinColumn({ name: 'id_aula' })
  class: Classes;
}
