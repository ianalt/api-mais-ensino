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
  @Get('/:id')
  async findByID(@Param('id') id: string) {
    const financialInfo = await this.financialInfoService.findByID(
      parseInt(id),
    );

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
  @Post('/:userID')
  create(
    @Body() body: CreateFinancialInfoDTO,
    @Param('userID') userID: string,
  ) {
    return this.financialInfoService.create(body, parseInt(userID));
  }

  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Patch('/:id')
  async update(@Param('id') id: string, @Body() body: UpdateFinancialInfoDTO) {
    return await this.financialInfoService.update(parseInt(id), body);
  }

  @Roles('admin')
  @Patch('delete/:id')
  async delete(@Param('id') id: string) {
    return await this.financialInfoService.delete(parseInt(id));
  }

  @Roles('admin')
  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return await this.financialInfoService.remove(parseInt(id));
  }
}
