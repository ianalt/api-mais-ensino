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
import { CreateKnowledgeAreaDTO } from './dtos/create-knowledge-area.dto';
import { UpdateKnowledgeAreaDTO } from './dtos/update-knowledge-area.dto';
import { KnowledgeAreasService } from './knowledge-areas.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('knowledge-areas')
export class KnowledgeAreasController {
  constructor(private knowledgeAreasService: KnowledgeAreasService) {}

  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Get('/:id')
  async findById(@Param('id') id: string) {
    const knowledgeArea = await this.knowledgeAreasService.findById(
      parseInt(id),
    );

    if (!knowledgeArea)
      throw new NotFoundException('Knowledge area not found.');

    return knowledgeArea;
  }

  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Get()
  async findAll() {
    const knowledgeAreas = await this.knowledgeAreasService.findAll();

    if (!knowledgeAreas)
      throw new NotFoundException('Could not find knowledge areas.');

    return knowledgeAreas;
  }

  @Roles('admin')
  @Post()
  create(@Body() body: CreateKnowledgeAreaDTO) {
    return this.knowledgeAreasService.create(body);
  }

  @Roles('admin')
  @Patch('/:id')
  async update(@Param('id') id: string, @Body() body: UpdateKnowledgeAreaDTO) {
    return await this.knowledgeAreasService.update(parseInt(id), body);
  }

  @Roles('admin')
  @Patch('delete/:id')
  async delete(@Param('id') id: string) {
    return await this.knowledgeAreasService.delete(parseInt(id));
  }

  @Roles('admin')
  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return await this.knowledgeAreasService.remove(parseInt(id));
  }
}
