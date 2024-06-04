import { Module } from '@nestjs/common';
import { EventService} from './event.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventController } from './event.controller';
import { Event } from './Event.entity';
import { Task } from './Task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event,Task])],
  controllers: [EventController],
  providers: [EventService]
})
export class EventModule {}
