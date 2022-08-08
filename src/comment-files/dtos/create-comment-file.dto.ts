import { IsString } from 'class-validator';

export class CreateCommentFileDTO {
  @IsString()
  fileUrl: string;
}
