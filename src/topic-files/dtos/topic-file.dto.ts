import { Expose } from 'class-transformer';

export class TopicFileDTO {
  @Expose()
  id: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  active: boolean;

  @Expose()
  fileUrl: string;
}
