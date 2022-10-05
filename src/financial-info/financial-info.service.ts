import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateFinancialInfoDTO } from './dtos/create-financial-info.dto';
import { UpdateFinancialInfoDTO } from './dtos/update-financial-info.dto';
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

  findByID(id: number) {
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

  async create(body: CreateFinancialInfoDTO, userID: number) {
    const user = await this.usersRepository.findOne(userID);

    if (!user) throw new NotFoundException('User not found.');

    const newFinancialInfo = this.financialInfoRepository.create({
      ...body,
    });

    newFinancialInfo.user = user;

    return this.financialInfoRepository.save(newFinancialInfo);
  }

  async update(id: number, body: UpdateFinancialInfoDTO) {
    const financialInfo = await this.findByID(id);

    if (!financialInfo)
      throw new NotFoundException('Financial info not found.');

    const attrs: Partial<FinancialInfo> = body;

    financialInfo.updatedAt = new Date();

    Object.assign(financialInfo, attrs);

    return this.financialInfoRepository.save(financialInfo);
  }

  async delete(id: number) {
    const financialInfo = await this.findByID(id);

    if (!financialInfo)
      throw new NotFoundException('Financial info not found.');

    financialInfo.updatedAt = new Date();
    financialInfo.active = false;

    return this.financialInfoRepository.save(financialInfo);
  }

  async remove(id: number) {
    const financialInfo = await this.findByID(id);

    if (!financialInfo)
      throw new NotFoundException('Financial info not found.');

    return this.financialInfoRepository.remove(financialInfo);
  }
}
