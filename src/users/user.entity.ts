import { Address } from 'src/addresses/address.entity';
import { Role } from 'src/auth/enums/role.enum';
import { EducationInfo } from 'src/education-info/education-info.entity';
import { FinancialInfo } from 'src/financial-info/financial-info.entity';
import { PhoneNumber } from 'src/phone-numbers/phone-number.entity';
import { Subject } from 'src/subjects/subject.entity';
import { Token } from 'src/tokens/token.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Ethnicity } from './enums/ethnicity.enum';
import { Gender } from './enums/gender.enum';
import { Classes } from 'src/classes/classes.entity';

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

  @Column({ name: 'first_name' })
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

  @OneToMany(() => Classes, (oneClass) => oneClass.createdBy)
  createdClasses: Classes[];

  @ManyToOne(() => Subject, (subject) => subject.users, { nullable: true })
  @JoinColumn({ name: 'id_disciplina' })
  subject: Subject;
}
