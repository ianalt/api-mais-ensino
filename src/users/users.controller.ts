import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CreateFullUserDto } from './dtos/create-full-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Get('profile')
  @Serialize(UserDto)
  async getProfile(@Request() req) {
    return req.user;
  }

  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Get('/:id')
  @Serialize(UserDto)
  async findById(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.findById(id);
  }

  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Get()
  @Serialize(UserDto)
  async findAll() {
    return await this.usersService.findAll();
  }

  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Get()
  @Serialize(UserDto)
  async findAllStudents() {
    return await this.usersService.findAllStudents();
  }

  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Get()
  @Serialize(UserDto)
  async findAllMonitors() {
    return await this.usersService.findAllMonitors();
  }

  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Get()
  @Serialize(UserDto)
  async findAllTeachers() {
    return await this.usersService.findAllTeachers();
  }

  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Post()
  @Serialize(UserDto)
  async create(@Body() body: CreateFullUserDto) {
    return await this.usersService.create(body);
  }

  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Patch('/:id')
  @Serialize(UserDto)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ) {
    return await this.usersService.update(id, body);
  }

  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Delete('delete/:id')
  @Serialize(UserDto)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.delete(id);
  }

  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Delete('/:id')
  @Serialize(UserDto)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.remove(id);
  }
}
