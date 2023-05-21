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
import { CreateEducationInfoDto } from './dtos/create-education-info.dto';
import { UpdateEducationInfoDto } from './dtos/update-education-info.dto';
import { EducationInfoService } from './education-info.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('education-info')
export class EducationInfoController {
  constructor(private educationInfoService: EducationInfoService) {}

  @Roles('admin')
  @Get('/:id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const educationInfo = await this.educationInfoService.findById(id);

    if (!educationInfo)
      throw new NotFoundException('Education info not found.');

    return educationInfo;
  }

  @Roles('admin')
  @Get()
  findAll() {
    return this.educationInfoService.findAll();
  }

  @Roles('admin')
  @Post('/:userId')
  create(
    @Body() body: CreateEducationInfoDto,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.educationInfoService.create(body, userId);
  }

  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Patch('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateEducationInfoDto,
  ) {
    return await this.educationInfoService.update(id, body);
  }

  @Roles('admin')
  @Delete('/:id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.educationInfoService.remove(id);
  }
}
