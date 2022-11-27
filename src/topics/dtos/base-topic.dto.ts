import { Expose } from 'class-transformer';

export class BaseTopicDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  content: string;

  @Expose()
  videoURL: string;
}
