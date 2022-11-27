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
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dtos/create-address.dto';
import { UpdateAddressDto } from './dtos/update-address.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('addresses')
export class AddressesController {
  constructor(private addressesService: AddressesService) {}

  @Roles('admin')
  @Get('/:id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const address = await this.addressesService.findById(id);

    if (!address) throw new NotFoundException('Address not found.');

    return address;
  }

  @Roles('admin')
  @Get()
  findAll() {
    return this.addressesService.findAll();
  }

  @Roles('admin')
  @Post('user/:userId')
  async create(
    @Body() body: CreateAddressDto,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.addressesService.create(body, userId);
  }

  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Patch('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateAddressDto,
  ) {
    return await this.addressesService.update(id, body);
  }

  @Roles('admin')
  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.addressesService.delete(id);
  }

  @Roles('admin')
  @Delete('/:id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.addressesService.remove(id);
  }
}
