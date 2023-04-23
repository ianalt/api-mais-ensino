import { IsInt, IsNumber, IsPositive } from 'class-validator';

export class CreateFinancialInfoDto {
  @IsNumber(
    {},
    {
      message:
        'O valor da renda familiar geral precisa ser um valor em reais (R$)',
    },
  )
  @IsPositive({
    message: 'O valor da renda familiar geral precisa ser um valor positivo',
  })
  generalIncome: number;

  @IsInt({
    message: 'O total de membros no domicílio precisa ser um valor inteiro',
  })
  @IsPositive({
    message: 'O total de membros no domicílio precisa ser um valor positivo',
  })
  totalHouseHoldMembers: number;
}
