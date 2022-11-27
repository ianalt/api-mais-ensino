import { IsInt, IsNumber, IsPositive } from 'class-validator';

export class CreateFinancialInfoDto {
  @IsNumber()
  @IsPositive()
  generalIncome: number;

  @IsInt()
  @IsPositive()
  totalHouseHoldMembers: number;
}
