import { IsOptional, IsString } from 'class-validator';

export class UpdateCommentFileDto {
  @IsOptional()
  @IsString()
  fileURL: string;
}
