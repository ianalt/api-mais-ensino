import { IsString } from 'class-validator';

export class CreateTopicFileDto {
  @IsString()
  fileURL: string;
}
