import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Planner {

    @PrimaryGeneratedColumn()
    planner_id: number;

    @Column()
    user_id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    contact: number;

    @Column()
    business_name: string;

    @Column({ nullable: true })
    business_description: string;

    @Column({ nullable: true })
    portfolio_link: string;

    @Column()
    average_price: number;

    @Column({ nullable: true })
    pricing_info: string;

    @Column({ nullable: true })
    services_offered: string;

    @Column()
    created_by: number;

    @Column()
    updated_by: number;

    @Column({ nullable: true })
    deleted_by: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}
