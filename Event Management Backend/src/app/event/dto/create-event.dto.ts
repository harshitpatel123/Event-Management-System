import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class TaskDto {
    @IsOptional()
    task_id?: number;

    @ApiProperty({ description: 'Enter task name', example: 'Cake Baking' })
    @IsString()
    @IsNotEmpty()
    task_name: string;

    @ApiProperty({ description: 'Enter task date', example: '2024-03-14' })
    @IsNotEmpty()
    task_date: Date;

    @ApiProperty({ description: 'Enter responsible person', example: 'John Doe' })
    @IsString()
    @IsNotEmpty()
    responsible_person: string;

    @ApiProperty({ description: 'Enter email to', example: 'john@example.com' })
    @IsOptional()
    email_to: string;

    @ApiProperty({ description: 'Enter reminder date', example: '2024-03-14' })
    @IsOptional()
    reminder_date: Date;

    @ApiProperty({ description: 'Enter reminder time', example: '09:00:00' })
    @IsOptional()
    reminder_time: string;
}

export class CreateEventDto {
    @IsOptional()
    event_id?: number;

    @ApiProperty({ description: 'Enter user ID', example: 1 })
    @IsNumber()
    @IsNotEmpty()
    user_id: number;

    @ApiProperty({ description: 'Enter event name', example: 'Birthday' })
    @IsString()
    @IsNotEmpty()
    event_name: string;

    @ApiProperty({ description: 'Enter event date', example: '2024-03-14' })
    @IsNotEmpty()
    event_date: Date;

    @ApiProperty({ description: 'Enter event description', example: 'harshit birthday is coming' })
    @IsString()
    event_description?: string;

    @ApiProperty({ type: [TaskDto] })
    @ValidateNested({ each: true })
    @Type(() => TaskDto)
    task: TaskDto[];
}
