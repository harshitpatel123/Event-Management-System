import { Injectable } from '@nestjs/common';
import { LessThanOrEqual, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Planner } from './Planner.entity';
import { ListPlannerDto } from './dto/list-planner.dto';
import { CreatePlannerDto } from './dto/create-planner.dto';

@Injectable()
export class plannerService {

    constructor(@InjectRepository(Planner) private plannerRepository: Repository<Planner>) { }

    async listPlanner(listPlannerDto: ListPlannerDto): Promise<Planner[]> {
        const whereCondition: any = {};
        if (listPlannerDto.business_name !== undefined) {
            whereCondition.business_name = Like(`%${listPlannerDto.business_name}%`);
        }
        if (listPlannerDto.average_price) {
            whereCondition.average_price = LessThanOrEqual(parseInt(listPlannerDto.average_price)); // Use LessThanOrEqual
        }
        return await this.plannerRepository.find({ where: whereCondition });
    }

    async createPlanner(createPlannerDto: CreatePlannerDto): Promise<Planner> {
        let fields = {
            ...createPlannerDto,
            created_by: 3,
            updated_by: 3
        };
        return await this.plannerRepository.save(fields);
    }

    async updatePlanner(planner_id: number, createPlannerDto: CreatePlannerDto): Promise<void> {
        let fields = {
            ...createPlannerDto,
            updated_by: 2,
        };
        await this.plannerRepository.update(planner_id, fields);
    }

    async deletePlanner(planner_id: number): Promise<void> {
        let delete_user = 5
        await this.plannerRepository.update(planner_id, { deleted_by: delete_user })
        await this.plannerRepository.softDelete({ planner_id });
    }

    async findPlanner(planner_id: number): Promise<Planner> {
        return await this.plannerRepository.findOne({ where: { planner_id } });
    }

}
