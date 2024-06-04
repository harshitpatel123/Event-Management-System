import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Task } from "./Task.entity";

@Entity('event')
export class Event {

    @PrimaryGeneratedColumn()
    event_id: number;

    @Column()
    user_id: number;

    @Column()
    event_name: string;

    @Column()
    event_date: Date;

    @Column()
    event_description: string;

    @CreateDateColumn()
    created_at : Date;

    @UpdateDateColumn()
    updated_at : Date;

    @DeleteDateColumn()
    deleted_at : Date;

    @OneToMany(
        () => Task,
        (task) => task.event,
    )
    task: Task[];

}