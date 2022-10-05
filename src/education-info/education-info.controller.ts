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
import { CreateEducationInfoDTO } from './dtos/create-education-info.dto';
import { UpdateEducationInfoDTO } from './dtos/update-education-info.dto';
import { EducationInfoService } from './education-info.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('education-info')
export class EducationInfoController {
  constructor(private educationInfoService: EducationInfoService) {}

  @Roles('admin')
  @Get('/:id')
  async findByID(@Param('id') id: string) {
    const educationInfo = await this.educationInfoService.findByID(
      parseInt(id),
    );

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
  @Post('/:userID')
  create(
    @Body() body: CreateEducationInfoDTO,
    @Param('userID') userID: string,
  ) {
    return this.educationInfoService.create(body, parseInt(userID));
  }

  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Patch('/:id')
  async update(@Param('id') id: string, @Body() body: UpdateEducationInfoDTO) {
    return await this.educationInfoService.update(parseInt(id), body);
  }

  @Roles('admin')
  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return await this.educationInfoService.delete(parseInt(id));
  }

  @Roles('admin')
  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return await this.educationInfoService.remove(parseInt(id));
  }
}
