import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { CreateTokenDto } from './dtos/create-token.dto';
import { Token } from './token.entity';
import { sub } from 'date-fns';

@Injectable()
export class TokensService {
  constructor(
    @InjectRepository(Token)
    private tokensRepository: Repository<Token>,
  ) {}

  private allRelations = ['user'];

  async findById(id: number) {
    if (!id) return null;

    return await this.tokensRepository.findOne({
      where: { id, active: true },
      relations: this.allRelations,
    });
  }

  async findAll() {
    const tokens = await this.tokensRepository.find({
      where: { active: true },
      relations: this.allRelations,
    });

    if (!tokens) throw new NotFoundException('Tokens não encontrados');

    return tokens;
  }

  create(body: CreateTokenDto) {
    const newToken = this.tokensRepository.create({
      ...body,
    });

    if (!newToken)
      throw new BadRequestException('Não foi possível criar o token');

    return this.tokensRepository.save(newToken);
  }

  async delete(id: number) {
    const token = await this.findById(id);

    if (!token) throw new NotFoundException('Token não encontrado');

    token.active = false;

    return this.tokensRepository.save(token);
  }

  async remove(id: number) {
    const token = await this.findById(id);

    if (!token) throw new NotFoundException('Token não encontrado');

    return this.tokensRepository.remove(token);
  }

  async getAccessCount() {
    const currentDate = new Date();
    const yesterday = sub(currentDate, { days: 1 });

    const count = await this.tokensRepository.count({
      where: {
        createdAt: Between(yesterday, currentDate),
        user: { role: 'estudante' },
      },
      relations: ['user'],
    });

    return {
      count,
    };
  }
}
