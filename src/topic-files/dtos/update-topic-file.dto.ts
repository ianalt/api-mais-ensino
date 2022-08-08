import { IsOptional, IsString } from 'class-validator';

export class UpdateTopicFileDTO {
  @IsOptional()
  @IsString()
  fileUrl: string;
}
