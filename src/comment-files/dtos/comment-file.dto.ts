import { Expose } from 'class-transformer';

export class CommentFileDTO {
  @Expose()
  id: number;

  @Expose()
  fileURL: string;
}
