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
import { CreateFinancialInfoDTO } from './dtos/create-financial-info.dto';
import { UpdateFinancialInfoDTO } from './dtos/update-financial-info.dto';
import { FinancialInfoService } from './financial-info.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('financial-info')
export class FinancialInfoController {
  constructor(private financialInfoService: FinancialInfoService) {}

  @Roles('admin')
  @Get('/history/:id')
  async findById(@Param('id') id: string) {
    const financialInfo = await this.financialInfoService.findById(
      parseInt(id),
    );

    if (!financialInfo)
      throw new NotFoundException('Financial info not found.');

    return financialInfo;
  }

  @Roles('admin')
  @Get('/:id')
  async findActiveById(@Param('id') id: string) {
    const financialInfo = await this.financialInfoService.findActiveById(
      parseInt(id),
    );

    if (!financialInfo)
      throw new NotFoundException('Financial info not found.');

    return financialInfo;
  }

  @Roles('admin')
  @Get('/history')
  findAll() {
    return this.financialInfoService.findAll();
  }

  @Roles('admin')
  @Get()
  findAllActive() {
    return this.financialInfoService.findAllActive();
  }

  @Roles('admin')
  @Post('/:userId')
  create(
    @Body() body: CreateFinancialInfoDTO,
    @Param('userId') userId: string,
  ) {
    return this.financialInfoService.create(body, parseInt(userId));
  }

  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Patch('/:id')
  async update(@Param('id') id: string, @Body() body: UpdateFinancialInfoDTO) {
    return await this.financialInfoService.update(parseInt(id), body);
  }

  @Roles('admin')
  @Patch('delete/:id')
  async delete(@Param('id') id: string) {
    return await this.financialInfoService.setActive(parseInt(id), false);
  }

  @Roles('admin')
  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return await this.financialInfoService.remove(parseInt(id));
  }
}
