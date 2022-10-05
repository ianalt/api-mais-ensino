import { IsOptional, IsString } from 'class-validator';

export class UpdateCommentFileDTO {
  @IsOptional()
  @IsString()
  fileURL: string;
}
