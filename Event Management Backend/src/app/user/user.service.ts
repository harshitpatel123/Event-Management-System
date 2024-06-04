import { Injectable } from '@nestjs/common';
import { LessThanOrEqual, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';import { User } from './User.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ListUserDto } from './dto/list-user.dto';


@Injectable()
export class userService {

    constructor(@InjectRepository(User) private plannerRepository: Repository<User>) { }

    async listUser(): Promise<User[]> {
        return await this.plannerRepository.find();
    }

    async login(listUserDto: ListUserDto): Promise<User> {
        const whereCondition: any = {};
        if (listUserDto.user_name !== undefined) {
            whereCondition.user_name = listUserDto.user_name;
        }
        return await this.plannerRepository.findOne({ where: whereCondition });
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        return await this.plannerRepository.save(createUserDto);
    }

    async updateUser(user_id: number, createUserDto: CreateUserDto): Promise<void> {
        await this.plannerRepository.update(user_id, createUserDto);
    }

    async deleteUser(user_id: number): Promise<void> {
        await this.plannerRepository.softDelete({ user_id });
    }

    async findUser(user_id: number): Promise<User> {
        return await this.plannerRepository.findOne({ where: { user_id } });
    }

}
