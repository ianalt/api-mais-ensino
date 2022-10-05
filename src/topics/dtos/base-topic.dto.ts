import { Expose } from 'class-transformer';

export class BaseTopicDTO {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  content: string;

  @Expose()
  videoURL: string;
}
