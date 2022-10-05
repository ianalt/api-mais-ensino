import { IsInt, IsPositive, IsString } from 'class-validator';

export class CreateCommentDTO {
  @IsString()
  content: string;

  @IsInt()
  @IsPositive()
  userID: number;
}
