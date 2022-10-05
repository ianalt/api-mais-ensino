import { IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

export class UpdateTopicDTO {
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
  categoryID: number;
}
