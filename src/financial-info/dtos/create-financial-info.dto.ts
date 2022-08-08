import { IsInt, IsNumber, isPositive, IsPositive } from 'class-validator';

export class CreateFinancialInfoDTO {
  @IsNumber()
  @IsPositive()
  generalIncome: number;

  @IsInt()
  @IsPositive()
  totalHouseHoldMembers: number;
}
