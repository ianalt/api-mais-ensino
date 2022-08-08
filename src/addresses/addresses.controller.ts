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
import { AddressesService } from './addresses.service';
import { CreateAddressDTO } from './dtos/create-address.dto';
import { UpdateAddressDTO } from './dtos/update-address.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('addresses')
export class AddressesController {
  constructor(private addressesService: AddressesService) {}

  @Roles('admin')
  @Get('/history/:id')
  async findById(@Param('id') id: string) {
    const address = await this.addressesService.findById(parseInt(id));

    if (!address) throw new NotFoundException('Address not found.');

    return address;
  }

  @Roles('admin')
  @Get('/:id')
  async findActiveById(@Param('id') id: string) {
    const address = await this.addressesService.findActiveById(parseInt(id));

    if (!address) throw new NotFoundException('Address not found.');

    return address;
  }

  @Roles('admin')
  @Get('/history')
  findAll() {
    return this.addressesService.findAll();
  }

  @Roles('admin')
  @Get()
  findAllActive() {
    return this.addressesService.findAllActive();
  }

  @Roles('admin')
  @Post('user/:userId')
  async create(
    @Body() body: CreateAddressDTO,
    @Param('userId') userId: string,
  ) {
    return this.addressesService.create(body, parseInt(userId));
  }

  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Patch('/:id')
  async update(@Param('id') id: string, @Body() body: UpdateAddressDTO) {
    return await this.addressesService.update(parseInt(id), body);
  }

  @Roles('admin')
  @Patch('delete/:id')
  async delete(@Param('id') id: string) {
    return await this.addressesService.setActive(parseInt(id), false);
  }

  @Roles('admin')
  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return await this.addressesService.remove(parseInt(id));
  }
}
