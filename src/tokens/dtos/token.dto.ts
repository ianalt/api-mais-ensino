import { Expose } from 'class-transformer';

export class TokenDTO {
  @Expose()
  id: number;

  @Expose()
  createdAt: Date;

  @Expose()
  content: string;
}
