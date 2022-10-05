import { User } from 'src/users/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'numeros_telefone' })
export class PhoneNumber {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @Column({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @Column({ name: 'active' })
  active: boolean;

  @Column({ name: 'phone_number' })
  phoneNumber: string;

  @ManyToOne(() => User, (user) => user.phoneNumbers)
  @JoinColumn({ name: 'id_usuario' })
  user: User;
}
