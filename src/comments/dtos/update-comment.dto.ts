import { IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

export class UpdateCommentDTO {
  @IsOptional()
  @IsString()
  content: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  userID: number;
}
