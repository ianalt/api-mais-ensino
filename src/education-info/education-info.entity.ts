import { User } from 'src/users/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { SchoolingLevel } from './enums/schooling-level.enum';

@Entity({ name: 'info_educacionais' })
export class EducationInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @Column({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @Column({ name: 'active' })
  active: boolean;

  @Column({ name: 'schooling_level' })
  schoolingLevel: SchoolingLevel;

  @Column({ name: 'course_name', nullable: true })
  courseName: string | null;

  @Column({ name: 'institution_name' })
  institutionName: string;

  @Column({ name: 'start_year', type: 'year' })
  startYear: string;

  @Column({ name: 'conclusion_year', type: 'year', nullable: true })
  conclusionYear: string | null;

  @ManyToOne(() => User, (user) => user.educationInfoList)
  @JoinColumn({ name: 'id_usuario' })
  user: User;
}
