import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateFinancialInfoDto } from './dtos/create-financial-info.dto';
import { UpdateFinancialInfoDto } from './dtos/update-financial-info.dto';
import { FinancialInfo } from './financial-info.entity';

@Injectable()
export class FinancialInfoService {
  constructor(
    @InjectRepository(FinancialInfo)
    private financialInfoRepository: Repository<FinancialInfo>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  private allRelations = ['user'];

  findById(id: number) {
    if (!id) return null;

    return this.financialInfoRepository.findOne({
      where: { id, active: true },
      relations: this.allRelations,
    });
  }

  findAll() {
    return this.financialInfoRepository.find({
      where: { active: true },
      relations: this.allRelations,
    });
  }

  async create(body: CreateFinancialInfoDto, userId: number) {
    const user = await this.usersRepository.findOne(userId);

    if (!user) throw new NotFoundException('User not found.');

    const newFinancialInfo = this.financialInfoRepository.create({
      ...body,
    });

    newFinancialInfo.user = user;

    return this.financialInfoRepository.save(newFinancialInfo);
  }

  async update(id: number, body: UpdateFinancialInfoDto) {
    const financialInfo = await this.findById(id);

    if (!financialInfo)
      throw new NotFoundException('Informação financeira não encontrada');

    const attrs: Partial<FinancialInfo> = body;

    financialInfo.updatedAt = new Date();

    Object.assign(financialInfo, attrs);

    return this.financialInfoRepository.save(financialInfo);
  }

  async delete(id: number) {
    const financialInfo = await this.findById(id);

    if (!financialInfo)
      throw new NotFoundException('Financial info not found.');

    financialInfo.updatedAt = new Date();
    financialInfo.active = false;

    return this.financialInfoRepository.save(financialInfo);
  }

  async remove(id: number) {
    const financialInfo = await this.findById(id);

    if (!financialInfo)
      throw new NotFoundException('Financial info not found.');

    return this.financialInfoRepository.remove(financialInfo);
  }

  async getIncomeStats() {
    const result: { avg: number } = await this.financialInfoRepository
      .createQueryBuilder('fi')
      .select('AVG(fi.general_income / fi.total_household_members)', 'avg')
      .innerJoin(User, 'u', 'fi.id_usuario = u.id')
      .where("u.role = 'estudante' ")
      .getRawOne();

    return { avg: parseFloat(result.avg.toFixed(2)) };
  }
}
