import { IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateCategoryDTO {
  @IsString()
  name: string;

  @IsInt()
  @IsPositive()
  subjectID: number;
}
