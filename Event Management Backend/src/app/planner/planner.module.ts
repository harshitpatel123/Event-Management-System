import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Planner } from './Planner.entity';
import { plannerController } from './planner.controller';
import { plannerService } from './planner.service';

@Module({
    imports: [TypeOrmModule.forFeature([Planner])],
    controllers: [plannerController],
    providers: [plannerService],
})
export class plannerModule {}
