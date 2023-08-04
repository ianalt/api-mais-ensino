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
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CreateKnowledgeAreaDto } from './dtos/create-knowledge-area.dto';
import { KnowledgeAreaDto } from './dtos/knowledge-area.dto';
import { UpdateKnowledgeAreaDto } from './dtos/update-knowledge-area.dto';
import { KnowledgeAreasService } from './knowledge-areas.service';

@Controller('knowledge-areas')
export class KnowledgeAreasController {
  constructor(private knowledgeAreasService: KnowledgeAreasService) {}

  @Get('/welcome')
  @Serialize(KnowledgeAreaDto)
  async findAllForWelcome() {
    const knowledgeAreas = await this.knowledgeAreasService.findAll();

    if (!knowledgeAreas)
      throw new NotFoundException('Could not find knowledge areas.');

    return knowledgeAreas;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Get('/:id')
  @Serialize(KnowledgeAreaDto)
  async findById(@Param('id', ParseIntPipe) id: number) {
    const knowledgeArea = await this.knowledgeAreasService.findById(id);

    if (!knowledgeArea)
      throw new NotFoundException('Knowledge area not found.');

    return knowledgeArea;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Get()
  @Serialize(KnowledgeAreaDto)
  async findAll() {
    const knowledgeAreas = await this.knowledgeAreasService.findAll();

    if (!knowledgeAreas)
      throw new NotFoundException(
        'Não foi possível encontrar áreas de conhecimento.',
      );

    return knowledgeAreas;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  @Serialize(KnowledgeAreaDto)
  async create(@Body() body: CreateKnowledgeAreaDto) {
    return await this.knowledgeAreasService.create(body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch('/:id')
  @Serialize(KnowledgeAreaDto)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateKnowledgeAreaDto,
  ) {
    return await this.knowledgeAreasService.update(id, body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete('delete/:id')
  @Serialize(KnowledgeAreaDto)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.knowledgeAreasService.delete(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete('/:id')
  @Serialize(KnowledgeAreaDto)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.knowledgeAreasService.remove(id);
  }
}
