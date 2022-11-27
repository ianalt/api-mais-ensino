import { IsInt, IsNumber, IsOptional, IsPositive } from 'class-validator';

export class UpdateFinancialInfoDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  generalIncome: number;

  @IsInt()
  @IsPositive()
  totalHouseHoldMembers: number;
}
