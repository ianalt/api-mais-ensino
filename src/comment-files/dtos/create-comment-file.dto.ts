import { IsString } from 'class-validator';

export class CreateCommentFileDto {
  @IsString()
  fileURL: string;
}
