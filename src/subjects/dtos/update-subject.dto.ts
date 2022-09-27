import { IsOptional, IsString } from 'class-validator';

export class UpdateSubjectDTO {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;
}
