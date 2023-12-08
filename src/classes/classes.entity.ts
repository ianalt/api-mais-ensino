import { Category } from 'src/categories/category.entity';
import { ClassFile } from 'src/class-files/class-file.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'aulas' })
export class Classes {
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

  @OneToMany(() => ClassFile, (classFile) => classFile.class)
  classFiles: ClassFile[];

  @ManyToOne(() => User, (user) => user.createdClasses)
  @JoinColumn({ name: 'created_by' })
  createdBy: User;

  @ManyToOne(() => Category, (category) => category.classes)
  @JoinColumn({ name: 'id_categoria' })
  category?: Category;
}
