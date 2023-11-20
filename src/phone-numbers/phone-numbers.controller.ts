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
import { CreatePhoneNumberDto } from './dtos/create-phone-number.dto';
import { UpdatePhoneNumberDto } from './dtos/update-phone-number.dto';
import { PhoneNumbersService } from './phone-numbers.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('phone-numbers')
export class PhoneNumbersController {
  constructor(private phoneNumbersService: PhoneNumbersService) {}

  @Roles('admin')
  @Get('/:id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const phoneNumber = await this.phoneNumbersService.findById(id);

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
  async create(
    @Body() body: CreatePhoneNumberDto,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.phoneNumbersService.create(body, userId);
  }

  @Roles('estudante', 'professor', 'admin')
  @Patch('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdatePhoneNumberDto,
  ) {
    return await this.phoneNumbersService.update(id, body);
  }

  @Roles('admin')
  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.phoneNumbersService.delete(id);
  }

  @Roles('admin')
  @Delete('/:id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.phoneNumbersService.remove(id);
  }
}
