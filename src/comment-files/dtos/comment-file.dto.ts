import { Expose } from 'class-transformer';

export class CommentFileDTO {
  @Expose()
  id: number;

  @Expose()
  fileUrl: string;
}
