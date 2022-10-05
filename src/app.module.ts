import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from 'src/subjects/subject.entity';
import { Address } from './addresses/address.entity';
import { AddressesModule } from './addresses/addresses.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/category.entity';
import { CommentFile } from './comment-files/comment-file.entity';
import { CommentFilesModule } from './comment-files/comment-files.module';
import { Comment } from './comments/comment.entity';
import { CommentsModule } from './comments/comments.module';
import { EducationInfo } from './education-info/education-info.entity';
import { EducationInfoModule } from './education-info/education-info.module';
import { FinancialInfo } from './financial-info/financial-info.entity';
import { FinancialInfoModule } from './financial-info/financial-info.module';
import { KnowledgeArea } from './knowledge-areas/knowledge-area.entity';
import { KnowledgeAreasModule } from './knowledge-areas/knowledge-areas.module';
import { PhoneNumber } from './phone-numbers/phone-number.entity';
import { PhoneNumbersModule } from './phone-numbers/phone-numbers.module';
import { SubjectsModule } from './subjects/subjects.module';
import { Token } from './tokens/token.entity';
import { TokensModule } from './tokens/tokens.module';
import { TopicFile } from './topic-files/topic-file.entity';
import { TopicFilesModule } from './topic-files/topic-files.module';
import { Topic } from './topics/topic.entity';
import { TopicsModule } from './topics/topics.module';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    CacheModule.register(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'mysql',
          host: config.get<string>('DB_HOST'),
          port: config.get<number>('DB_PORT'),
          username: config.get<string>('DB_USERNAME'),
          password: config.get<string>('DB_PASSWORD'),
          database: config.get<string>('DB_NAME'),
          entities: [
            Token,
            Address,
            PhoneNumber,
            FinancialInfo,
            EducationInfo,
            User,
            Subject,
            KnowledgeArea,
            Category,
            Topic,
            TopicFile,
            Comment,
            CommentFile,
          ],
          synchronize: false,
        };
      },
    }),
    AuthModule,
    TokensModule,
    AddressesModule,
    PhoneNumbersModule,
    FinancialInfoModule,
    EducationInfoModule,
    UsersModule,
    SubjectsModule,
    KnowledgeAreasModule,
    CategoriesModule,
    TopicsModule,
    TopicFilesModule,
    CommentsModule,
    CommentFilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
