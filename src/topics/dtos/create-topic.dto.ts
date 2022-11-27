import { IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateTopicDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  videoURL: string;

  @IsInt()
  @IsPositive()
  categoryId: number;
}
