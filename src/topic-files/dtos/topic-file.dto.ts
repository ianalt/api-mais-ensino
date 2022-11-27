import { Expose } from 'class-transformer';

export class TopicFileDto {
  @Expose()
  id: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  active: boolean;

  @Expose()
  fileURL: string;
}
