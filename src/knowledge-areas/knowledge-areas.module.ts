import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KnowledgeArea } from './knowledge-area.entity';
import { KnowledgeAreasService } from './knowledge-areas.service';
import { KnowledgeAreasController } from './knowledge-areas.controller';

@Module({
  providers: [KnowledgeAreasService],
  imports: [TypeOrmModule.forFeature([KnowledgeArea])],
  controllers: [KnowledgeAreasController],
})
export class KnowledgeAreasModule {}
