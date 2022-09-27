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
  @Get('/:id')
  async findById(@Param('id') id: string) {
    const phoneNumber = await this.phoneNumbersService.findById(parseInt(id));

    if (!phoneNumber) throw new NotFoundException('Phone number not found.');

    return phoneNumber;
  }

  @Roles('admin')
  @Get()
  findAll() {
    return this.phoneNumbersService.findAll();
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
    return await this.phoneNumbersService.delete(parseInt(id));
  }

  @Roles('admin')
  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return await this.phoneNumbersService.remove(parseInt(id));
  }
}
