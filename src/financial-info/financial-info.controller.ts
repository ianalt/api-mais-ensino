import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateFinancialInfoDto } from './dtos/create-financial-info.dto';
import { UpdateFinancialInfoDto } from './dtos/update-financial-info.dto';
import { FinancialInfoService } from './financial-info.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('financial-info')
export class FinancialInfoController {
  constructor(private financialInfoService: FinancialInfoService) {}

  @Roles('admin')
  @Get('/:id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const financialInfo = await this.financialInfoService.findById(id);

    if (!financialInfo)
      throw new NotFoundException('Financial info not found.');

    return financialInfo;
  }

  @Roles('admin')
  @Get()
  findAll() {
    return this.financialInfoService.findAll();
  }

  @Roles('admin')
  @Post('/:userId')
  create(
    @Body() body: CreateFinancialInfoDto,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.financialInfoService.create(body, userId);
  }

  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Patch('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateFinancialInfoDto,
  ) {
    return await this.financialInfoService.update(id, body);
  }

  @Roles('admin')
  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.financialInfoService.delete(id);
  }

  @Roles('admin')
  @Delete('/:id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.financialInfoService.remove(id);
  }
}
