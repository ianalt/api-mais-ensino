import { Expose } from 'class-transformer';

export class FinancialInfoDTO {
  @Expose()
  id: number;

  @Expose()
  generalIncome: number;

  @Expose()
  totalHouseHoldMembers: number;
}
