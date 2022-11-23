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

//TODO apply changes to user profile edition
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('addresses')
export class AddressesController {
  constructor(private addressesService: AddressesService) {}

  @Roles('admin')
  @Get('/:id')
  async findByID(@Param('id') id: string) {
    const address = await this.addressesService.findByID(parseInt(id));

    if (!address) throw new NotFoundException('Address not found.');

    return address;
  }

  @Roles('admin')
  @Get()
  findAll() {
    return this.addressesService.findAll();
  }

  @Roles('admin')
  @Post('user/:userID')
  async create(
    @Body() body: CreateAddressDTO,
    @Param('userID') userID: string,
  ) {
    return this.addressesService.create(body, parseInt(userID));
  }

  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Patch('/:id')
  async update(@Param('id') id: string, @Body() body: UpdateAddressDTO) {
    return await this.addressesService.update(parseInt(id), body);
  }

  @Roles('admin')
  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return await this.addressesService.delete(parseInt(id));
  }

  @Roles('admin')
  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return await this.addressesService.remove(parseInt(id));
  }
}
