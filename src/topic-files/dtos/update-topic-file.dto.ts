import { IsOptional, IsString } from 'class-validator';

export class UpdateTopicFileDTO {
  @IsOptional()
  @IsString()
  fileURL: string;
}
