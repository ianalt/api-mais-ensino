import { IsString } from 'class-validator';

export class CreateTopicFileDTO {
  @IsString()
  fileUrl: string;
}
