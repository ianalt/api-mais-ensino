import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
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
import { FinancialInfoService } from 'src/financial-info/financial-info.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { TokensService } from 'src/tokens/tokens.service';
import { AddAdminDto } from './dtos/add-admin.dto';
import { AddStudentDto } from './dtos/add-student.dto';
import { AddTeacherDto } from './dtos/add-teacher.dto';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { UpdateAdminDto } from './dtos/update-admin.dto';
import { UpdateStudentDto } from './dtos/update-student.dto';
import { UpdateTeacherDto } from './dtos/update-teacher.dto';
import { UserDto } from './dtos/user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private tokensService: TokensService,
    private financialInfoService: FinancialInfoService,
  ) {}

  @Roles('estudante', 'professor', 'admin')
  @Get()
  @Serialize(UserDto)
  async findAll() {
    return await this.usersService.findAll();
  }

  @Roles('estudante', 'professor', 'admin')
  @Get('/profile')
  @Serialize(UserDto)
  async getProfile(@Request() req) {
    return req.user;
  }

  @Roles('admin')
  @Get('gender-stats')
  async getGenderStats() {
    return await this.usersService.getGenderStats();
  }

  @Roles('admin')
  @Get('ethnicity-stats')
  async getEthnicityStats() {
    return await this.usersService.getEthnicityStats();
  }

  @Roles('admin')
  @Get('income-stats')
  async getIncomeStats() {
    return await this.financialInfoService.getIncomeStats();
  }

  @Roles('admin')
  @Get('uf-stats')
  async getUfStats() {
    return await this.usersService.getUfStats();
  }

  @Roles('admin')
  @Get('access-count')
  async getAccessCount() {
    return await this.tokensService.getAccessCount();
  }

  @Roles('estudante', 'professor', 'admin')
  @Get('/:id')
  @Serialize(UserDto)
  async findById(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.findById(id);
  }

  @Roles('admin')
  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.remove(id);
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

    if (cpfBeingUsed)
      throw new UnprocessableEntityException(
        'O CPF provido já está sendo utilizado. Digite um CPF válido.',
      );

    if (emailBeingUsed)
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

    if (cpfBeingUsed)
      throw new UnprocessableEntityException(
        'O CPF provido já está sendo utilizado. Digite um CPF válido.',
      );

    if (emailBeingUsed)
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

    if (cpfBeingUsed)
      throw new UnprocessableEntityException(
        'O CPF provido já está sendo utilizado. Digite um CPF válido.',
      );

    if (emailBeingUsed)
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

  @Roles('admin')
  @Patch('/student/:id')
  @Serialize(UserDto)
  async updateStudent(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateStudentDto,
  ) {
    const { cpf, email } = body.user;

    const cpfBeingUsed = await this.usersService.findByCpf(cpf);
    const emailBeingUsed = await this.usersService.findByEmail(email);

    if (
      cpfBeingUsed &&
      emailBeingUsed &&
      cpfBeingUsed.id !== id &&
      emailBeingUsed.id !== id
    )
      throw new UnprocessableEntityException(
        'Ambos CPF e e-mail providos já estão sendo utilizados. Digite um CPF e um e-mail válidos.',
      );

    if (cpfBeingUsed && cpfBeingUsed.id !== id)
      throw new UnprocessableEntityException(
        'O CPF provido já está sendo utilizado. Digite um CPF válido.',
      );

    if (emailBeingUsed && emailBeingUsed.id !== id)
      throw new UnprocessableEntityException(
        'O e-mail provido já está sendo utilizado. Digite um e-mail válido.',
      );

    return await this.usersService.updateStudent(id, body);
  }

  @Roles('admin')
  @Patch('/teacher/:id')
  @Serialize(UserDto)
  async updateTeacher(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateTeacherDto,
  ) {
    const { cpf, email } = body.user;

    const cpfBeingUsed = await this.usersService.findByCpf(cpf);
    const emailBeingUsed = await this.usersService.findByEmail(email);

    if (
      cpfBeingUsed &&
      emailBeingUsed &&
      cpfBeingUsed.id !== id &&
      emailBeingUsed.id !== id
    )
      throw new UnprocessableEntityException(
        'Ambos CPF e e-mail providos já estão sendo utilizados. Digite um CPF e um e-mail válidos.',
      );

    if (cpfBeingUsed && cpfBeingUsed.id !== id)
      throw new UnprocessableEntityException(
        'O CPF provido já está sendo utilizado. Digite um CPF válido.',
      );

    if (emailBeingUsed && emailBeingUsed.id !== id)
      throw new UnprocessableEntityException(
        'O e-mail provido já está sendo utilizado. Digite um e-mail válido.',
      );

    return await this.usersService.updateTeacher(id, body);
  }

  @Roles('admin')
  @Patch('/admin/:id')
  @Serialize(UserDto)
  async updateAdmin(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateAdminDto,
  ) {
    const { cpf, email } = body.user;

    const cpfBeingUsed = await this.usersService.findByCpf(cpf);
    const emailBeingUsed = await this.usersService.findByEmail(email);

    if (
      cpfBeingUsed &&
      emailBeingUsed &&
      cpfBeingUsed.id !== id &&
      emailBeingUsed.id !== id
    )
      throw new UnprocessableEntityException(
        'Ambos CPF e e-mail providos já estão sendo utilizados. Digite um CPF e um e-mail válidos.',
      );

    if (cpfBeingUsed && cpfBeingUsed.id !== id)
      throw new UnprocessableEntityException(
        'O CPF provido já está sendo utilizado. Digite um CPF válido.',
      );

    if (emailBeingUsed && emailBeingUsed.id !== id)
      throw new UnprocessableEntityException(
        'O e-mail provido já está sendo utilizado. Digite um e-mail válido.',
      );

    return await this.usersService.updateAdmin(id, body);
  }

  @Roles('estudante', 'professor', 'admin')
  @Patch('/profile')
  @Serialize(UserDto)
  async editProfile(
    @Request() req,
    @Body()
    body: UpdateAdminDto | UpdateTeacherDto | UpdateStudentDto,
  ) {
    const userId = req.user.id;
    const userRole = req.user.role;

    if (!userId || userId < 0 || !userRole)
      throw new UnprocessableEntityException(
        'Não foi possível completar a solicitação',
      );

    const { cpf, email } = body.user;

    const cpfBeingUsed = await this.usersService.findByCpf(cpf);
    const emailBeingUsed = await this.usersService.findByEmail(email);

    if (
      cpfBeingUsed &&
      emailBeingUsed &&
      cpfBeingUsed.id !== userId &&
      emailBeingUsed.id !== userId
    )
      throw new UnprocessableEntityException(
        'Ambos CPF e e-mail providos já estão sendo utilizados. Digite um CPF e um e-mail válidos.',
      );

    if (cpfBeingUsed && cpfBeingUsed.id !== userId)
      throw new UnprocessableEntityException(
        'O CPF provido já está sendo utilizado. Digite um CPF válido.',
      );

    if (emailBeingUsed && emailBeingUsed.id !== userId)
      throw new UnprocessableEntityException(
        'O e-mail provido já está sendo utilizado. Digite um e-mail válido.',
      );

    return await this.usersService.editProfile(userId, userRole, body);
  }

  @Roles('estudante', 'professor', 'admin')
  @Patch('/profile/change-password')
  @HttpCode(HttpStatus.NO_CONTENT)
  async changePassword(
    @Request() req,
    @Body()
    body: ChangePasswordDto,
  ) {
    const user: User = req.user;

    if (!user || !user.id || user.id < 0)
      throw new UnprocessableEntityException(
        'Não foi possível alterar a senha',
      );

    await this.usersService.changePassword(user, body);
  }
}
