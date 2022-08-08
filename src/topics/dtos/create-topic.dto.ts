import { IsString } from 'class-validator';

export class CreateTopicDTO {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  videoUrl: string;
}
