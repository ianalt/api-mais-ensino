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
import { CreateFullUserDTO } from './dtos/create-full-user.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { UserDTO } from './dtos/user.dto';
import { UsersService } from './users.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Get('profile')
  @Serialize(UserDTO)
  async getProfile(@Request() req) {
    return req.user;
  }

  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Get('/:id')
  @Serialize(UserDTO)
  async findByID(@Param('id') id: string) {
    return await this.usersService.findByID(parseInt(id));
  }

  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Get()
  @Serialize(UserDTO)
  async findAll() {
    return await this.usersService.findAll();
  }

  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Get()
  @Serialize(UserDTO)
  async findAllStudents() {
    return await this.usersService.findAllStudents();
  }

  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Get()
  @Serialize(UserDTO)
  async findAllMonitors() {
    return await this.usersService.findAllMonitors();
  }

  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Get()
  @Serialize(UserDTO)
  async findAllTeachers() {
    return await this.usersService.findAllTeachers();
  }

  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Post()
  @Serialize(UserDTO)
  async create(@Body() body: CreateFullUserDTO) {
    return await this.usersService.create(body);
  }

  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Patch('/:id')
  @Serialize(UserDTO)
  async update(@Param('id') id: string, @Body() body: UpdateUserDTO) {
    return await this.usersService.update(parseInt(id), body);
  }

  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Patch('/delete/:id')
  @Serialize(UserDTO)
  async delete(@Param('id') id: string) {
    return await this.usersService.delete(parseInt(id));
  }

  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Delete('/:id')
  @Serialize(UserDTO)
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(parseInt(id));
  }
}
