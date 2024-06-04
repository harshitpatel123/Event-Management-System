import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Grid, Switch } from '@mui/material';
import { useForm } from 'react-hook-form';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { addData } from "../../redux/features/commonData/commonData";
import { useDispatch } from 'react-redux';
import { service } from '../../utils/Service/service';
import { showFormattedDate, validateEmail } from '../../utils/common';
import moment from 'moment';
import { ForkLeft } from '@mui/icons-material';



interface ProjectTemplateFormProps {
    method: string;
}


interface Task {
    task_id: number;
    task_name: string;
    task_date: string;
    responsible_person: string;
    email_to: string;
    reminder_date: string;
    reminder_time: string;
}

interface EventData {
    event_id: number;
    user_id: number;
    event_name: string;
    event_date: string;
    event_description: string;
    task: Task[];
}

const showDateYYMMDD = (date: any) => {
    return date ? moment(date).format("yyyy-MM-DD") : null;
};

const EventForm: React.FC<ProjectTemplateFormProps> = ({ method }) => {
    const dispatchData = useDispatch();
    const { register, handleSubmit, trigger, formState: { errors }, setValue, getValues, unregister } = useForm<EventData>();
    const history = useNavigate();
    const { id } = useParams();
    const [tasks, setTasks] = useState([{ id: 1 }]);
    // let hasError = false;


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await service.makeAPICall({
                    methodName: service.Methods.GET,
                    apiUrl: service.API_URL.event.get,
                    params: id,
                });
                // set default values of react hook form
                const eventData: EventData = response?.data.data;
                console.log('incoming ', eventData)

                const newTasks = eventData.task.map((wp) => ({
                    id: wp.task_id,
                    task_id: wp.task_id,
                    task_name: wp.task_name,
                    task_date: showFormattedDate(wp.task_date) || '2024-04-19',
                    responsible_person: wp.responsible_person,
                    email_to: wp.email_to,
                    reminder_date: wp.reminder_date,
                    reminder_time: wp.reminder_time,
                }));
                setTasks(newTasks);

                // Set form values using setValue
                setValue('event_id', eventData.event_id);
                setValue('event_name', eventData.event_name);
                setValue('event_date', showDateYYMMDD(eventData.event_date) || '2024-04-19');
                setValue('event_description', eventData.event_description);

                newTasks.forEach((wp, index) => {
                    setValue(`task.${wp.id}.task_id`, wp.task_id);
                    setValue(`task.${wp.id}.task_name`, wp.task_name);
                    setValue(`task.${wp.id}.task_date`, showDateYYMMDD(wp.task_date) || '2024-04-19');
                    setValue(`task.${wp.id}.responsible_person`, wp.responsible_person);
                    setValue(`task.${wp.id}.email_to`, wp.email_to);
                    setValue(`task.${wp.id}.reminder_date`, showDateYYMMDD(wp.reminder_date) || '2024-04-19');
                    setValue(`task.${wp.id}.reminder_time`, wp.reminder_time);
                });
                trigger();
            } catch (error) {
                console.log(error);
            }
        };

        if (id && method === 'PUT') {
            fetchData();
        }
    }, [id, method, setValue]);




    const onSubmit = async (eventData: EventData) => {
        try {
            // Filter out work packages with empty titles
            const filteredTasks = Object.values(eventData.task)
                .filter((wp) => wp.task_name.trim() !== '')
                .map((wp: any) => {

                    return {
                        ...wp,
                        task_id: wp.task_id,
                    };
                });

            const formattedData = {
                ...eventData,
                user_id: Number(localStorage.getItem('user_id')) || 0,
                event_id: eventData.event_id,
                task: filteredTasks,
            };

            console.log('final', formattedData)
            // return null

            const apiMethod = method === 'POST' ? service.Methods.POST : service.Methods.POST;
            const url = method === 'POST' ? service.API_URL.event.create : service.API_URL.event.update;
            await service.makeAPICall({
                methodName: apiMethod,
                apiUrl: url,
                body: formattedData,
            });
            history(-1);
        } catch (error) {
            console.log(error);
        }
    };



    const handleAddWorkPackage = () => {
        setTasks((prevtasks) => [
            ...prevtasks,
            { id: Date.now() },
        ]);
    };


    const handleRemoveWorkPackage = (taskId: number) => {
        setTasks((prevtasks) =>
            prevtasks.filter((wp) => wp.id !== taskId)
        );

        // Clear form values for the removed work package
        setValue(`task.${taskId}.task_name`, '');

    };

    // hasError = Object.keys(errors).length > 0;


    return (
        <>
            <div className="add-eventbg">
                <h1 className='addevent-h1'>{method === 'POST' ? 'Add' : 'Update'} {'Event'}</h1>
                {errors.event_name?.message && <span className='eventValidate-1'> {errors.event_name?.message}</span>}
                {errors.event_date?.message && <span className='eventValidate-2'> {errors.event_date?.message}</span>}
                {errors.event_description?.message && <span className='eventValidate-3'> {errors.event_description?.message}</span>}

                <Grid container spacing={1}>
                    <Grid item xs={15}>

                        <div className="add-main">
                            <Grid container spacing={2}>
                                <Grid item xs={8} md={3} lg={4}>
                                    <span>Event Name</span>
                                    <input className='add-box1' type="text" {...register("event_name", { required: 'Event name is required' })} />
                                </Grid>
                                <Grid item xs={8} md={3} lg={4}>
                                    <span className='add-tittle1'>Event Date</span>
                                    <input className='add-box3' type="date" {...register("event_date", { required: 'Event date is required' })} />
                                </Grid>
                                {/* <Grid item xs={8} md={3} lg={4}> */}
                                <span className='add-tittle2'>Event Description</span>
                                <textarea className='add-box2'  {...register("event_description", { required: 'Description is required' })} />
                                {/* </Grid> */}
                            </Grid>

                        </div>
                        <span className='addevent-h3'>Event Tasks</span>
                        <button className='btn btn-primary' style={{ marginLeft: '1%' }} onClick={handleAddWorkPackage} >
                            Add Task
                        </button>

                        {tasks.map((singleTask) => (
                            <div className='addtask-1' key={singleTask.id} style={{ border: '1px solid black', marginTop: '2%' }}>
                                <Grid container spacing={3} mt={0} ml={3} mb={3}>
                                    <Grid container spacing={1} mt={0} ml={1} mb={0} justifyContent="flex-end">
                                        {tasks.length > 1 && (
                                            <Grid className='task-del-grid' item xs={8} md={3} mt={1} lg={1.5}>
                                                <button className='btn btn-danger' onClick={() => handleRemoveWorkPackage(singleTask.id)} >
                                                    <DeleteOutlineIcon />
                                                </button>
                                            </Grid>
                                        )}
                                    </Grid>
                                    <Grid item xs={8} md={3} lg={5}>
                                        <span className='add-taskname1'>Task Name</span>
                                        <input className='add-tasknamebox1' {...register(`task.${singleTask.id}.task_name`, { required: 'Task name is required' })} type="text" />
                                        <br />
                                        {errors?.task?.[singleTask.id]?.task_name?.message && <span className='eventValidate-4'> {errors.task?.[singleTask.id]?.task_name?.message}</span>}
                                    </Grid>
                                    <Grid item xs={8} md={3} lg={3}>
                                        <span className='add-taskname1'>Task Date</span>
                                        <input className='add-tasknamebox2' {...register(`task.${singleTask.id}.task_date`, { required: 'Task date is required' })} type="date" />
                                        <br />
                                        {errors?.task?.[singleTask.id]?.task_date?.message && <span className='eventValidate-5'> {errors.task?.[singleTask.id]?.task_date?.message}</span>}
                                    </Grid>
                                    <Grid item xs={8} md={3} lg={5}>
                                        <span className='add-taskname1'>Responsible Person</span>
                                        <input className='add-tasknamebox3' {...register(`task.${singleTask.id}.responsible_person`, { required: 'Responsible person is required' })} type="text" />
                                        <br />
                                        {errors?.task?.[singleTask.id]?.responsible_person?.message && <span className='eventValidate-6'> {errors.task?.[singleTask.id]?.responsible_person?.message}</span>}
                                    </Grid>
                                    <Grid item xs={8} md={3} lg={6}>
                                        <span className='add-taskname1'>Email To</span>
                                        <input className='add-tasknamebox4'{...register(`task.${singleTask.id}.email_to`, { required: 'EMail is required', validate: validateEmail, })} type="text" />
                                        <br />
                                        {errors?.task?.[singleTask.id]?.email_to?.message && <span className='eventValidate-7'> {errors.task?.[singleTask.id]?.email_to?.message}</span>}
                                    </Grid>
                                    <Grid item xs={8} md={3} lg={3}>
                                        <span className='add-taskname1'>Reminder Date</span>
                                        <input className='add-tasknamebox5' {...register(`task.${singleTask.id}.reminder_date`, { required: 'Reminder date is required' })} type="date" />
                                        <br />
                                        {errors?.task?.[singleTask.id]?.reminder_date?.message && <span className='eventValidate-8'> {errors.task?.[singleTask.id]?.reminder_date?.message}</span>}
                                    </Grid>
                                    <Grid item xs={8} md={3} lg={6}>
                                        <span className='add-taskname2'>Reminder Time</span>
                                        <input className='add-tasknamebox6' {...register(`task.${singleTask.id}.reminder_time`, { required: 'Reminder time is required' })} type="time" />
                                        <br />
                                        {errors?.task?.[singleTask.id]?.reminder_time?.message && <span className='eventValidate-9'> {errors.task?.[singleTask.id]?.reminder_time?.message}</span>}
                                    </Grid>
                                </Grid>
                            </div>

                        ))}


                        <button className='btn btn-success' style={{ marginTop: '3%', marginLeft: '44%', marginBottom: '5%' }} onClick={handleSubmit(onSubmit)}>
                            {method === 'POST' ? 'Add' : 'Update'} Event
                        </button>
                        <button className='btn btn-danger' style={{ marginTop: '3%', marginLeft: '4%', marginBottom: '5%' }} onClick={() => { history(-1) }}>
                            Cancel
                        </button>

                        {/* {hasError && <p style={{ color: 'red' }}>Please fill in all fields.</p>} */}

                    </Grid>
                </Grid>

            </div>
        </>
    );
};

export default EventForm;
