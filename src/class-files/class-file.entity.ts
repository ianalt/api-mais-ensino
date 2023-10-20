import { Classes } from 'src/classes/classes.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FileType } from './enums/file-type.enum';

@Entity({ name: 'arquivos_aulas' })
export class ClassFile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @Column({ name: 'file_type' })
  fileType: FileType;

  @Column({ name: 'file_name' })
  fileName: string;

  @Column({ name: 'content_length' })
  contentLength: string;

  @Column({ name: 'content_type' })
  contentType: string;

  @Column({ name: 'path' })
  path: string;

  @ManyToOne(() => Classes, (oneClass) => oneClass.classFiles)
  @JoinColumn({ name: 'id_aula' })
  class: Classes;
}
