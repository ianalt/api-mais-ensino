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
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { ClassesModule } from './classes/classes.module';
import { ClassFilesModule } from './class-files/class-files.module';

import { Classes } from './classes/classes.entity';
import { ClassFile } from './class-files/class-file.entity';

@Module({
  imports: [
    CacheModule.register(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
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
            Classes,
            ClassFile,
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
    ClassesModule,
    ClassFilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
