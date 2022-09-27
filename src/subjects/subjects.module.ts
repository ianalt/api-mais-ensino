import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KnowledgeArea } from 'src/knowledge-areas/knowledge-area.entity';
import { Subject } from 'src/subjects/subject.entity';
import { SubjectsController } from './subjects.controller';
import { SubjectsService } from './subjects.service';

@Module({
  providers: [SubjectsService],
  imports: [TypeOrmModule.forFeature([Subject, KnowledgeArea])],
  controllers: [SubjectsController],
})
export class SubjectsModule {}
