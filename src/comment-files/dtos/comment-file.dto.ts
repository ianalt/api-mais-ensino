import { Expose } from 'class-transformer';

export class CommentFileDto {
  @Expose()
  id: number;

  @Expose()
  fileURL: string;
}
