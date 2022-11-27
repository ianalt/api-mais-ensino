import { IsOptional, IsString } from 'class-validator';

export class UpdateTopicFileDto {
  @IsOptional()
  @IsString()
  fileURL: string;
}
