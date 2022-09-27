import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Address } from 'src/users/addresses/address.entity';
import { EducationInfo } from 'src/users/education-info/education-info.entity';
import { FinancialInfo } from 'src/users/financial-info/financial-info.entity';
import { PhoneNumber } from 'src/users/phone-numbers/phone-number.entity';
import { Subject } from 'src/subjects/subject.entity';
import { Token } from 'src/tokens/token.entity';
import { Ethnicity } from './enums/ethnicity.enum';
import { Comment } from 'src/comments/comment.entity';
import { Role } from 'src/auth/enums/role.enum';
import { Gender } from './enums/gender.enum';

@Entity({ name: 'usuarios' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @Column({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @Column({ name: 'active' })
  active: boolean;

  @Column({ name: 'role' })
  role: Role;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'cpf', unique: true })
  cpf: string;

  @Column({ name: 'birth_date', type: 'date' })
  birthDate: Date;

  @Column({ name: 'ethnicity' })
  ethnicity: Ethnicity;

  @Column({ name: 'gender' })
  gender: Gender;

  @OneToOne(() => Address, (address) => address.user)
  address: Address;

  @OneToOne(() => FinancialInfo, (financialInfo) => financialInfo.user)
  financialInfo: FinancialInfo;

  @OneToMany(() => Token, (token) => token.user)
  tokens: Token[];

  @OneToMany(() => PhoneNumber, (phoneNumber) => phoneNumber.user)
  phoneNumbers: PhoneNumber[];

  @OneToMany(() => EducationInfo, (educationInfo) => educationInfo.user)
  educationInfoList: EducationInfo[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @ManyToOne(() => Subject, (subject) => subject.users, { nullable: true })
  @JoinColumn({ name: 'id_disciplina' })
  subject: Subject;
}
