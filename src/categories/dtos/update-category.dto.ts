import { IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

export class UpdateCategoryDTO {
  @IsOptional()
  @IsString()
  name: string;

  @IsInt()
  @IsPositive()
  subjectID: number;
}
