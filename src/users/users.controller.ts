import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
  UnprocessableEntityException,
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
import { SignUpDto } from 'src/auth/dtos/sign-up.dto';
import { AddUserDto } from './dtos/add-user.dto';
import { AddAdminDto } from './dtos/add-admin.dto';
import { AddMonitorDto } from './dtos/add-monitor.dto';
import { AddStudentDto } from './dtos/add-student.dto';
import { AddTeacherDto } from './dtos/add-teacher.dto';
import { UpdateStudentDto } from './dtos/update-student.dto';

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

  @Roles('admin')
  @Post('/student')
  @Serialize(UserDto)
  async addStudent(@Body() body: AddStudentDto) {
    const { cpf, email } = body.user;

    const cpfBeingUsed = await this.usersService.findByCpf(cpf);
    const emailBeingUsed = await this.usersService.findByEmail(email);

    if (cpfBeingUsed && emailBeingUsed)
      throw new UnprocessableEntityException(
        'Ambos CPF e e-mail providos já estão sendo utilizados. Digite um CPF e um e-mail válidos.',
      );

    if (!emailBeingUsed && cpfBeingUsed)
      throw new UnprocessableEntityException(
        'O CPF provido já está sendo utilizado. Digite um CPF válido.',
      );

    if (!cpfBeingUsed && emailBeingUsed)
      throw new UnprocessableEntityException(
        'O e-mail provido já está sendo utilizado. Digite um e-mail válido.',
      );

    const addedStudent = await this.usersService.addStudent(body);

    if (!addedStudent)
      throw new UnprocessableEntityException(
        'Um erro surgiu enquanto o cadastro era realizado. Por favor, tente novamente.',
      );

    return addedStudent;
  }

  @Roles('admin')
  @Post('/monitor')
  @Serialize(UserDto)
  async addMonitor(@Body() body: AddMonitorDto) {
    const { cpf, email } = body.user;

    const cpfBeingUsed = await this.usersService.findByCpf(cpf);
    const emailBeingUsed = await this.usersService.findByEmail(email);

    if (cpfBeingUsed && emailBeingUsed)
      throw new UnprocessableEntityException(
        'Ambos CPF e e-mail providos já estão sendo utilizados. Digite um CPF e um e-mail válidos.',
      );

    if (!emailBeingUsed && cpfBeingUsed)
      throw new UnprocessableEntityException(
        'O CPF provido já está sendo utilizado. Digite um CPF válido.',
      );

    if (!cpfBeingUsed && emailBeingUsed)
      throw new UnprocessableEntityException(
        'O e-mail provido já está sendo utilizado. Digite um e-mail válido.',
      );

    const addedMonitor = await this.usersService.addMonitor(body);

    if (!addedMonitor)
      throw new UnprocessableEntityException(
        'Um erro surgiu enquanto o cadastro era realizado. Por favor, tente novamente.',
      );

    return addedMonitor;
  }

  @Roles('admin')
  @Post('/teacher')
  @Serialize(UserDto)
  async addTeacher(@Body() body: AddTeacherDto) {
    const { cpf, email } = body.user;

    const cpfBeingUsed = await this.usersService.findByCpf(cpf);
    const emailBeingUsed = await this.usersService.findByEmail(email);

    if (cpfBeingUsed && emailBeingUsed)
      throw new UnprocessableEntityException(
        'Ambos CPF e e-mail providos já estão sendo utilizados. Digite um CPF e um e-mail válidos.',
      );

    if (!emailBeingUsed && cpfBeingUsed)
      throw new UnprocessableEntityException(
        'O CPF provido já está sendo utilizado. Digite um CPF válido.',
      );

    if (!cpfBeingUsed && emailBeingUsed)
      throw new UnprocessableEntityException(
        'O e-mail provido já está sendo utilizado. Digite um e-mail válido.',
      );

    const addedTeacher = await this.usersService.addTeacher(body);

    if (!addedTeacher)
      throw new UnprocessableEntityException(
        'Um erro surgiu enquanto o cadastro era realizado. Por favor, tente novamente.',
      );

    return addedTeacher;
  }

  @Roles('admin')
  @Post('/admin')
  @Serialize(UserDto)
  async addAdmin(@Body() body: AddAdminDto) {
    const { cpf, email } = body.user;

    const cpfBeingUsed = await this.usersService.findByCpf(cpf);
    const emailBeingUsed = await this.usersService.findByEmail(email);

    if (cpfBeingUsed && emailBeingUsed)
      throw new UnprocessableEntityException(
        'Ambos CPF e e-mail providos já estão sendo utilizados. Digite um CPF e um e-mail válidos.',
      );

    if (!emailBeingUsed && cpfBeingUsed)
      throw new UnprocessableEntityException(
        'O CPF provido já está sendo utilizado. Digite um CPF válido.',
      );

    if (!cpfBeingUsed && emailBeingUsed)
      throw new UnprocessableEntityException(
        'O e-mail provido já está sendo utilizado. Digite um e-mail válido.',
      );

    const addedAdmin = await this.usersService.addAdmin(body);

    if (!addedAdmin)
      throw new UnprocessableEntityException(
        'Um erro surgiu enquanto o cadastro era realizado. Por favor, tente novamente.',
      );

    return addedAdmin;
  }

  //TODO para multiplos itens, verifica sem tem id. se tiver, atualiza o que já tem. senão, cria do 0 (id?: number)
  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Patch('/:id')
  @Serialize(UserDto)
  async updateStudent(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateStudentDto,
  ) {
    return await this.usersService.updateStudent(id, body);
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
