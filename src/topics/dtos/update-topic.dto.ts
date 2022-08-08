import { IsOptional, IsString } from 'class-validator';

export class UpdateTopicDTO {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  videoUrl: string;
}
