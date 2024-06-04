class TaskDto {
    task_id: number;
    event_id: number;
    task_name: string;
    task_date: Date;
    responsible_person: string;
    email_to: string;
    reminder_date: Date;
    reminder_time: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
}

class ViewEventDto {
    event_id: number;
    user_id: number;
    event_name: string;
    event_date: Date;
    event_description?: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
    task: TaskDto[];
}
