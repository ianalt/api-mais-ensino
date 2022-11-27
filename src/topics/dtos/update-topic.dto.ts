import { IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

export class UpdateTopicDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  videoURL: string;

  @IsInt()
  @IsPositive()
  categoryId: number;
}
