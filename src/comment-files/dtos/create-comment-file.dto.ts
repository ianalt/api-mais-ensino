import { IsString } from 'class-validator';

export class CreateCommentFileDTO {
  @IsString()
  fileURL: string;
}
