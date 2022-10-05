import { IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateTopicDTO {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  videoURL: string;

  @IsInt()
  @IsPositive()
  categoryID: number;
}
