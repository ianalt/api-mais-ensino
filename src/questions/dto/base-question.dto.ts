import { Expose } from 'class-transformer';

export class BaseQuestionDto {
  @Expose()
  id: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  active: boolean;

  @Expose()
  title: string;

  @Expose()
  content: string;
}
