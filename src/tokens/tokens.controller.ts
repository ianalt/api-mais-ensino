import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateTokenDTO } from './dtos/create-token.dto';
import { TokensService } from './tokens.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('tokens')
export class TokensController {
  constructor(private tokensService: TokensService) {}

  @Roles('admin')
  @Get('/history/:id')
  async findById(@Param('id') id: string) {
    const token = await this.tokensService.findById(parseInt(id));

    if (!token) throw new NotFoundException('Token file not found.');

    return token;
  }

  @Roles('admin')
  @Get('/:id')
  async findActiveById(@Param('id') id: string) {
    const token = await this.tokensService.findActiveById(parseInt(id));

    if (!token) throw new NotFoundException('Token file not found.');

    return token;
  }

  @Roles('admin')
  @Get('/history')
  findAll() {
    return this.tokensService.findAll();
  }

  @Roles('admin')
  @Get()
  findAllActive() {
    return this.tokensService.findAllActive();
  }

  @Roles('admin')
  @Post()
  create(@Body() body: CreateTokenDTO) {
    return this.tokensService.create(body);
  }

  @Roles('admin')
  @Patch('delete/:id')
  async delete(@Param('id') id: string) {
    return await this.tokensService.setActive(parseInt(id), false);
  }

  @Roles('admin')
  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return await this.tokensService.remove(parseInt(id));
  }
}
