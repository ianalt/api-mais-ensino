import { IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsInt()
  @IsPositive()
  subjectId: number;
}
