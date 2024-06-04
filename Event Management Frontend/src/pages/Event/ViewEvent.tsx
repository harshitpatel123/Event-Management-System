import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { service } from '../../utils/Service/service';
import { showFormattedDate } from '../../utils/common';

import '../css/style.css'
import mypic from '../images/djnight-1.jpg'
import { Card, Grid } from '@mui/material';

interface CmsType {
    page_id: number,
    page_name: string,
    page_url: string,
    description: string,
    is_active: boolean,
    meta_title: string | null,
    meta_description: string | null,
}



const ViewEvent: React.FC = () => {
    const { id } = useParams();
    const history = useNavigate();
    const [eventData, setEventData] = useState<any>();

    const fetchEvent = async (id: string | undefined) => {
        try {
            const response = await service.makeAPICall({
                methodName: service.Methods.GET,
                apiUrl: service.API_URL.event.get,
                params: id
            });
            console.log('incoming', response?.data.data)
            return response?.data?.data;
        } catch (error) {
            console.log(error)
        }
        return null;
    }

    useEffect(() => {
        fetchEvent(id).then((data: CmsType) => { setEventData(data) }).catch((error) => { console.log(error) });
    }, [])


    return (
        <>

            {
                eventData ?
                    <>

                        <div className="add-eventbg" >
                            <h1 className='addevent-h1'>Event Details</h1>
                            {/* <div > */}

                            <Grid container spacing={1}>
                                <Grid item xs={15}>


                                    {/* <form action='#'> */}

                                    <div className='add-main'>

                                        <Grid container spacing={2}>
                                            <Grid item xs={8} md={3} lg={4}>
                                                <label htmlFor="fname" >Event Name</label>
                                                <input className='add-box1' value={eventData.event_name} type="text" />
                                            </Grid>

                                            <Grid item xs={8} md={3} lg={4}>
                                                <label className='add-tittle1' htmlFor='Email-Id'>Event Date</label>
                                                <input className='add-box3' style={{ width: '55%' }} value={showFormattedDate(eventData.event_date) || 'No Value'} type='text' />
                                            </Grid>


                                            <label className='add-tittle2' htmlFor='Business-Description' >Business-Description</label>
                                            <textarea className='add-box2' value={eventData.event_description} />

                                        </Grid>
                                    </div>

                                    <span className='addevent-h3'>Event's Task</span>

                                    {
                                        eventData?.task.map((singleTask: any) => (
                                            <>
                                                <div className='addtask-1' key={singleTask.id} style={{ border: '1px solid black', marginTop: '4%' }}>
                                                    <Grid container spacing={3} mt={0} ml={3} mb={3}>

                                                        <Grid item xs={8} md={3} lg={5}>
                                                            <label className='add-taskname1' htmlFor="fname" >Task Name</label>
                                                            <input className='add-tasknamebox1' value={singleTask.task_name} type="text" />
                                                        </Grid>
                                                        <Grid item xs={8} md={3} lg={3}>
                                                            <label className='add-taskname1' htmlFor="fname" >Task Date</label>
                                                            <input className='view-tasknamebox2' value={showFormattedDate(singleTask.task_date) || 'No value'} type="text" />
                                                        </Grid>
                                                        <Grid item xs={8} md={3} lg={5}>
                                                            <label className='add-taskname1'  htmlFor="fname" >Responsible Person</label>
                                                            <input className='add-tasknamebox3' value={singleTask.responsible_person} type="text" />
                                                            </Grid>
                                                            <Grid item xs={8} md={3} lg={6}>
                                                            <label className='add-taskname1'  htmlFor="fname" >Email To</label>
                                                            <input className='add-tasknamebox4' value={singleTask.email_to} type="text" />
                                                            </Grid>
                                                            <Grid item xs={8} md={3} lg={5}>
                                                            <label className='add-taskname1' htmlFor="fname" >Reminder date</label>
                                                            <input  className='view-tasknamebox5'  value={showFormattedDate(singleTask.reminder_date) || 'No Value'} type="text" />
                                                            </Grid>
                                                            <Grid item xs={8} md={3} lg={4}>
                                                            <label className='view-taskname2' htmlFor="fname" >Reminder Time</label>
                                                            <input  className='view-tasknamebox6' value={singleTask.reminder_time} type="text" />
                                                            </Grid>
                                                    </Grid>
                                                </div>
                                            </>
                                        ))}


                                    {/* </form > */}
                                    {/* </div> */}

                                    <button className='btn btn-success' style={{marginTop : '3%' , marginLeft : '50%', marginBottom:'5%' }} onClick={() => history(-1)} type="button" >Back</button>
                                </Grid>
                            </Grid>


                        </div>

                    </> : <h1>Loading....</h1>
            }


            {/* <MDBox pt={2} pb={3}>
                    <Grid container spacing={5}>
                        <Grid item xs={12}>
                            <Card>
                                <MDBox mx={2} mt={-3} py={2.5} px={2} varia nt="gradient" display='flex' justifyContent='space-between' bgColor={sidenavColor} borderRadius="lg" coloredShadow="info">
                                    <MDTypography display="flex" alignItems="center" justifyContent="space-between" variant="h6" color="white">
                                        {cms?.page_name}
                                    </MDTypography>
                                    <MDButton variant="contained" color={sidenavColor} onClick={() => history(-1)}>
                                        Go back
                                    </MDButton>
                                </MDBox>
                                <MDBox>
                                    {
                                        cms && Object.entries(cms).filter(([key, value]) => {
                                            return !removeKey.includes(key);
                                        }).map(([key, value]) => {
                                            return (
                                                <>
                                                    <MDBox key={key} variant='div' display="flex" justifyContent="space-between" alignItems="center" px={2} py={1.5}>
                                                        <MDTypography style={{ fontSize: '1.1rem' }} variant="span" flex='2'>{modifyKey(key)} :</MDTypography>
                                                        {
                                                            key === 'created_at' || key === 'updated_at' ?
                                                                <MDTypography flex='8' textAlign="left" variant="span" style={{ fontSize: '1rem' }}>{showFormattedDate(value) || 'No value'}</MDTypography>
                                                                :
                                                                typeof value === 'boolean' ?
                                                                    <MDTypography flex='8' textAlign="left" variant="span" style={{ fontSize: '1rem' }}>{value === true ? 'Yes' : 'No' || 'No value'}</MDTypography>
                                                                    :
                                                                    <MDTypography flex='8' textAlign="left" variant="span" style={{ fontSize: '1rem' }}>{decodeHTML(value) || 'No value'}</MDTypography>
                                                        }
                                                    </MDBox>
                                                    <MDTypography component='hr' style={{ border: `1px solid #EDEFF0` }} />
                                                </>
                                            )
                                        })
                                    }
                                </MDBox>
                            </Card>
                        </Grid>
                    </Grid>
                </MDBox> */}


        </>
    );
}

export default ViewEvent;