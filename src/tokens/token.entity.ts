import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/users/user.entity';

@Entity({ name: 'tokens' })
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @Column({ name: 'active' })
  active: boolean;

  @Column({ name: 'content' })
  content: string;

  @ManyToOne(() => User, (user) => user.tokens)
  @JoinColumn({ name: 'id_usuario' })
  user: User;
}
