import { Expose } from 'class-transformer';
import { FileType } from '../enums/file-type.enum';

export class ClassFileDto {
  @Expose()
  id: number;

  @Expose()
  createdAt: Date;

  @Expose()
  fileType: FileType;

  @Expose()
  fileName: string;

  @Expose()
  contentLength: string;

  @Expose()
  contentType: string;

  @Expose()
  path: string;
}
