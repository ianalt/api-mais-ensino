import { User } from 'src/users/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { State } from './enums/state.enum';

@Entity({ name: 'enderecos' })
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @Column({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @Column({ name: 'active' })
  active: boolean;

  @Column({ name: 'cep' })
  cep: string;

  @Column({ name: 'street' })
  street: string;

  @Column({ name: 'street_number' })
  streetNumber: string;

  @Column({ name: 'neighborhood' })
  neighborhood: string;

  @Column({ name: 'complement', nullable: true })
  complement: string;

  @Column({ name: 'city' })
  city: string;

  @Column({ name: 'state' })
  state: State;

  @OneToOne(() => User, (user) => user.address)
  @JoinColumn({ name: 'id_usuario' })
  user: User;
}
