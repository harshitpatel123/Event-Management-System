import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { appConfig } from '../config/app.config';
import { databaseConfig } from '../config/database.config';
import { i18nConfig } from 'src/config/i18n.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { I18nModule } from 'nestjs-i18n';
import { plannerModule } from './planner/planner.module';
import { UserModule } from './user/user.module';
import { EventModule } from './event/event.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
    imports: [
        ConfigModule.forRoot(appConfig),
        TypeOrmModule.forRoot(databaseConfig),
        I18nModule.forRoot(i18nConfig),
        plannerModule,
        UserModule,
        EventModule,
        ScheduleModule.forRoot()
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }


