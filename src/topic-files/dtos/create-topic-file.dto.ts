import { IsString } from 'class-validator';

export class CreateTopicFileDTO {
  @IsString()
  fileURL: string;
}
