import { IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsInt()
  @IsPositive()
  subjectId: number;
}
