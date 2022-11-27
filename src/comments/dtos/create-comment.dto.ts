import { IsInt, IsPositive, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  content: string;

  @IsInt()
  @IsPositive()
  userId: number;
}
