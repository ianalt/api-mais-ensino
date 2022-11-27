import { IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

export class UpdateCommentDto {
  @IsOptional()
  @IsString()
  content: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  userId: number;
}
