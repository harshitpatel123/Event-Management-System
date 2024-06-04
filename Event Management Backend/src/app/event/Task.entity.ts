import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Event } from "./Event.entity";

@Entity('task')
export class Task {

    @PrimaryGeneratedColumn()
    task_id: number;

    @Column()
    event_id: number;

    @Column()
    task_name: string;

    @Column()
    task_date: Date;

    @Column({ nullable: true })
    responsible_person: string;

    @Column({ nullable: true })
    email_to: string;

    @Column({ nullable: true })
    reminder_date: Date;

    @Column({ nullable: true })
    reminder_time: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @ManyToOne(
        () => Event,
        (event) => event.task,
    )
    @JoinColumn({ name: 'event_id' })
    event: Event;
}
