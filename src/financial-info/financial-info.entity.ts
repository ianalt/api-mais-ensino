import { User } from 'src/users/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'info_financeiras' })
export class FinancialInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @Column({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @Column({ name: 'active' })
  active: boolean;

  @Column({ name: 'general_income' })
  generalIncome: number;

  @Column({ name: 'total_household_members' })
  totalHouseHoldMembers: number;

  @OneToOne(() => User, (user) => user.financialInfo)
  @JoinColumn({ name: 'id_usuario' })
  user: User;
}
