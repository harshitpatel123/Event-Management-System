import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Event } from './Event.entity';
import { Task } from './Task.entity';
import { ListEventDto } from './dto/list-event.dto';
import { CreateEventDto } from './dto/create-event.dto';
import { SendEmailDto, sendEmail } from 'src/utils/mail.util';

@Injectable()
export class EventService {

    constructor(
        @InjectRepository(Event) private eventRepository: Repository<Event>,
        @InjectRepository(Task) private taskRepository: Repository<Task>,
    ) { }

    async listEvent(listEventDto: ListEventDto): Promise<Event[]> {
        let whereCondition:any = {};
        if (Number(listEventDto.user_id) !== 1) {
            whereCondition = {
                ...(listEventDto.user_id !== undefined && { user_id: listEventDto.user_id }),
            };
        }
        return await this.eventRepository.find({ where: whereCondition });
    }

    async insertEvent(createEventDto: CreateEventDto): Promise<any> {
        if (createEventDto.event_id !== undefined) {
            const updatedTaskIds: number[] = createEventDto.task.map((task: any) => task.task_id);

            const oldEvent = await this.findEvent(createEventDto.event_id);
            const deleteTaskIds: number[] = oldEvent.task
                .filter((task: any) => !updatedTaskIds.includes(task.task_id))
                .map((task: any) => task.task_id);
            // Soft delete work packages that are not in updated data
            if (deleteTaskIds.length > 0) {
                await this.taskRepository.update(deleteTaskIds, { deleted_at: new Date() })
            }
        }

        const event = this.eventRepository.create({
            ...(createEventDto.event_id !== undefined && { event_id: createEventDto.event_id }),
            user_id: createEventDto.user_id,
            event_name: createEventDto.event_name,
            event_date: createEventDto.event_date,
            event_description: createEventDto.event_description,

        });
        const savedEvent = await this.eventRepository.save(event);

        for (const taskDto of createEventDto.task) {
            const task = this.taskRepository.create({
                ...(taskDto.task_id !== undefined && { task_id: taskDto.task_id }),
                event_id: savedEvent.event_id,
                task_name: taskDto.task_name,
                task_date: taskDto.task_date,
                responsible_person: taskDto.responsible_person,
                email_to: taskDto.email_to,
                reminder_date: taskDto.reminder_date,
                reminder_time: taskDto.reminder_time,
            });
            const savedTask = await this.taskRepository.save(task);

            // For scheduling mail

            const mailDetails = {
                event_name: savedEvent.event_name,
                task_name: savedTask.task_name,
                task_date: savedTask.task_date,
                responsible_person: savedTask.responsible_person,
                email_to: savedTask.email_to,
            }

            const reminderTimeParts = savedTask.reminder_time.split(':');
            const reminderTime = new Date();
            reminderTime.setHours(parseInt(reminderTimeParts[0], 10)); // Hours
            reminderTime.setMinutes(parseInt(reminderTimeParts[1], 10)); // Minutes

            const currentTime = new Date();
            const timeDifference = await (reminderTime.getTime() - currentTime.getTime());
            console.log('time set to -------', timeDifference / 60000)
            if (timeDifference > 0) {
                setTimeout(async () => {
                    await this.sendMail(mailDetails);
                }, timeDifference);
            }
        }
        return this.findEvent(savedEvent.event_id);
    }

    async sendMail(mailDetails: any) {
        try {

            console.log('mail sending------------')
            const event_name = mailDetails.event_name;
            const emailDto: SendEmailDto = {
                to: [mailDetails.email_to],
                subject: `Reminder For ${event_name}`,
                template: 'reminder',
                data: {
                    task_name: mailDetails.task_name,
                    task_date: mailDetails.task_date,
                    responsible_person: mailDetails.responsible_person,
                },
            };
            await sendEmail(emailDto);
        }
        catch (err) {
            console.log(err.message);
        }
    }

    async findEvent(event_id: number): Promise<ViewEventDto> {
        const event: ViewEventDto = await this.eventRepository.createQueryBuilder('event')
            .leftJoinAndSelect('event.task', 'task')
            .where('event.event_id = :event_id', { event_id: event_id })
            .getOne()
        return event
    }

    async deleteEvent(event_id: number): Promise<void> {
        await this.taskRepository
            .createQueryBuilder()
            .update(Task)
            .set({ deleted_at: new Date() })
            .where("event_id = :id", { id: event_id })
            .execute();
        await this.eventRepository
            .createQueryBuilder()
            .update(Event)
            .set({ deleted_at: new Date() })
            .where("event_id = :id", { id: event_id })
            .execute();
    }

}
