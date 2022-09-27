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
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CreateKnowledgeAreaDTO } from './dtos/create-knowledge-area.dto';
import { KnowledgeAreaDTO } from './dtos/knowledge-area.dto';
import { UpdateKnowledgeAreaDTO } from './dtos/update-knowledge-area.dto';
import { KnowledgeAreasService } from './knowledge-areas.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('knowledge-areas')
export class KnowledgeAreasController {
  constructor(private knowledgeAreasService: KnowledgeAreasService) {}

  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Get('/:id')
  @Serialize(KnowledgeAreaDTO)
  async findByID(@Param('id') id: string) {
    const knowledgeArea = await this.knowledgeAreasService.findByID(
      parseInt(id),
    );

    if (!knowledgeArea)
      throw new NotFoundException('Knowledge area not found.');

    return knowledgeArea;
  }

  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Get()
  @Serialize(KnowledgeAreaDTO)
  async findAll() {
    const knowledgeAreas = await this.knowledgeAreasService.findAll();

    if (!knowledgeAreas)
      throw new NotFoundException('Could not find knowledge areas.');

    return knowledgeAreas;
  }

  @Roles('admin')
  @Post()
  @Serialize(KnowledgeAreaDTO)
  async create(@Body() body: CreateKnowledgeAreaDTO) {
    return this.knowledgeAreasService.create(body);
  }

  @Roles('admin')
  @Patch('/:id')
  @Serialize(KnowledgeAreaDTO)
  async update(@Param('id') id: string, @Body() body: UpdateKnowledgeAreaDTO) {
    return await this.knowledgeAreasService.update(parseInt(id), body);
  }

  @Roles('admin')
  @Patch('delete/:id')
  @Serialize(KnowledgeAreaDTO)
  async delete(@Param('id') id: string) {
    return await this.knowledgeAreasService.delete(parseInt(id));
  }

  @Roles('admin')
  @Delete('/:id')
  @Serialize(KnowledgeAreaDTO)
  async remove(@Param('id') id: string) {
    return await this.knowledgeAreasService.remove(parseInt(id));
  }
}
