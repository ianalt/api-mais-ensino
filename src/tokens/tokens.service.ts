import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTokenDTO } from './dtos/create-token.dto';
import { Token } from './token.entity';

@Injectable()
export class TokensService {
  constructor(
    @InjectRepository(Token)
    private tokensRepository: Repository<Token>,
  ) {}

  private allRelations = ['user'];

  async findByID(id: number) {
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

    if (!tokens) throw new NotFoundException('Tokens not found.');

    return tokens;
  }

  create(body: CreateTokenDTO) {
    const newToken = this.tokensRepository.create({
      ...body,
    });

    if (!newToken) throw new BadRequestException('Could not create new token.');

    return this.tokensRepository.save(newToken);
  }

  async delete(id: number) {
    const token = await this.findByID(id);

    if (!token) throw new NotFoundException('Token not found.');

    token.active = false;

    return this.tokensRepository.save(token);
  }

  async remove(id: number) {
    const token = await this.findByID(id);

    if (!token) throw new NotFoundException('Token not found.');

    return this.tokensRepository.remove(token);
  }
}
