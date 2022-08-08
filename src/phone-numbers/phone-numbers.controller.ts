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
import { CreatePhoneNumberDTO } from './dtos/create-phone-number.dto';
import { UpdatePhoneNumberDTO } from './dtos/update-phone-number.dto';
import { PhoneNumbersService } from './phone-numbers.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('phone-numbers')
export class PhoneNumbersController {
  constructor(private phoneNumbersService: PhoneNumbersService) {}

  @Roles('admin')
  @Get('/history/:id')
  async findById(@Param('id') id: string) {
    const phoneNumber = await this.phoneNumbersService.findById(parseInt(id));

    if (!phoneNumber) throw new NotFoundException('Phone number not found.');

    return phoneNumber;
  }

  @Roles('admin')
  @Get('/:id')
  async findActiveById(@Param('id') id: string) {
    const phoneNumber = await this.phoneNumbersService.findActiveById(
      parseInt(id),
    );

    if (!phoneNumber) throw new NotFoundException('Phone number not found.');

    return phoneNumber;
  }

  @Roles('admin')
  @Get('/history')
  findAll() {
    return this.phoneNumbersService.findAll();
  }

  @Roles('admin')
  @Get()
  findAllActive() {
    return this.phoneNumbersService.findAllActive();
  }

  @Roles('admin')
  @Post('/:userId')
  create(@Body() body: CreatePhoneNumberDTO, @Param('userId') userId: string) {
    return this.phoneNumbersService.create(body, parseInt(userId));
  }

  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Patch('/:id')
  async update(@Param('id') id: string, @Body() body: UpdatePhoneNumberDTO) {
    return await this.phoneNumbersService.update(parseInt(id), body);
  }

  @Roles('admin')
  @Patch('delete/:id')
  async delete(@Param('id') id: string) {
    return await this.phoneNumbersService.setActive(parseInt(id), false);
  }

  @Roles('admin')
  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return await this.phoneNumbersService.remove(parseInt(id));
  }
}
