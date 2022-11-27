import { Expose } from 'class-transformer';

export class TokenDto {
  @Expose()
  id: number;

  @Expose()
  createdAt: Date;

  @Expose()
  content: string;
}
