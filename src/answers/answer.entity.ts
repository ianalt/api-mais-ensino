import { Question } from 'src/questions/question.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'respostas' })
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @Column({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @Column({ name: 'verified' })
  verified: boolean;

  @Column({ name: 'content' })
  content: string;

  @ManyToOne(() => Question, (question) => question.answers)
  @JoinColumn({ name: 'id_duvida' })
  question: Question;

  @ManyToOne(() => User, (user) => user.createdAnswers)
  @JoinColumn({ name: 'created_by' })
  createdBy: User;

  @ManyToOne(() => User, (user) => user.verifiedAnswers)
  @JoinColumn({ name: 'verified_by' })
  verifiedBy: User;
}
