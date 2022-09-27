import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TokensModule } from './tokens/tokens.module';
import { AddressesModule } from './users/addresses/addresses.module';
import { PhoneNumbersModule } from './users/phone-numbers/phone-numbers.module';
import { FinancialInfoModule } from './users/financial-info/financial-info.module';
import { EducationInfoModule } from './users/education-info/education-info.module';
import { CommentsModule } from './comments/comments.module';
import { CommentFilesModule } from './comment-files/comment-files.module';
import { TopicsModule } from './topics/topics.module';
import { TopicFilesModule } from './topic-files/topic-files.module';
import { CategoriesModule } from './categories/categories.module';
import { SubjectsModule } from './subjects/subjects.module';
import { KnowledgeAreasModule } from './knowledge-areas/knowledge-areas.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Subject } from 'src/subjects/subject.entity';
import { Address } from './users/addresses/address.entity';
import { Category } from './categories/category.entity';
import { Comment } from './comments/comment.entity';
import { CommentFile } from './comment-files/comment-file.entity';
import { EducationInfo } from './users/education-info/education-info.entity';
import { FinancialInfo } from './users/financial-info/financial-info.entity';
import { KnowledgeArea } from './knowledge-areas/knowledge-area.entity';
import { PhoneNumber } from './users/phone-numbers/phone-number.entity';
import { Token } from './tokens/token.entity';
import { TopicFile } from './topic-files/topic-file.entity';
import { Topic } from './topics/topic.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
