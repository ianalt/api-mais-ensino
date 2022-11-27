import { Expose } from 'class-transformer';

export class FinancialInfoDto {
  @Expose()
  id: number;

  @Expose()
  generalIncome: number;

  @Expose()
  totalHouseHoldMembers: number;
}
