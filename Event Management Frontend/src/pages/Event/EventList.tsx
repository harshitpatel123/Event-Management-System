import React, { useEffect, useState } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Card } from "@mui/material";
import { service } from "../../utils/Service/service";
import { useNavigate } from 'react-router-dom';
import { showFormattedDate } from '../../utils/common';
import Navbar from '../Navbar';

interface PlannerListType {
    name: string;
    email: string;
    contact: number;
    business_name: string;
    business_description: string;
    portfolio_link: string;
    average_price: number;
    pricing_info: string;
    services_offered: string;
}


const EventList: React.FC = () => {
    const history = useNavigate();
    const [rows, setRows] = useState<any>([]);
    const [index, setIndex] = useState<number | undefined>(undefined);

    const fetchData = async () => {
        const userId = localStorage.getItem('user_id');
        try {
            const response = await service.makeAPICall({
                methodName: service.Methods.GET,
                apiUrl: service.API_URL.event.list,
                query: `user_id=${userId}`
            });
            setRows(response?.data.data.reverse());
            console.log('data', response?.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setTimeout(() => { fetchData(); }, 100)
    }, [index])

    const handleToggleDelete = async () => {
        try {
            await service.makeAPICall({
                methodName: service.Methods.DELETE,
                apiUrl: service.API_URL.event.delete,
                params: index ?? '',
            });
            setIndex(undefined)
        } catch (error) {
            console.log(error)
        }
    };

    const handleNavigateUpdate = (id: number) => {
        history(`/event/update/${id}`);
    }

    const handleToggleView = async (id: number) => {
        history(`/event/view/${id}`);
    };

    const handleNavigation = () => {
        history('/event/add');
    };



    return (
        <>
            <Navbar />

            <div className="event-listbg">

                <h1 className='event-listname'><center style={{ marginBottom: '1%' }}>Event List</center></h1>


                <div className="container px-4">
                    <button onClick={handleNavigation} type="button" className="btn btn-success" style={{ marginLeft: '44%' }}>Create Event</button>
                </div>

                {rows.map((event: any) => (
                    <div key={event.event_id} style={{ marginTop: '2%', marginLeft: '5%', marginRight: '5%', paddingLeft: '4%', paddingRight: '4%' }} >
                        <div className="card" style={{ border: '2px solid black', borderRadius: '14px', paddingLeft: '4%' }}>
                            <div className="card-body">
                                <h3 className="card-title">Event: {event.event_name}</h3>
                                <h5 className="card-title">Date: {showFormattedDate(event.event_date)}</h5>
                                <p className="card-text">Description: {event.event_description}</p>
                                <IconButton onClick={() => handleToggleView(event.event_id)}>
                                    <VisibilityIcon />
                                </IconButton>
                                <IconButton onClick={() => handleNavigateUpdate(event.event_id)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    onClick={() => setIndex(event.event_id || undefined)}
                                    data-bs-toggle="modal"
                                    data-bs-target="#deleteconfirmation"
                                >
                                    <DeleteOutlineIcon />
                                </IconButton>
                            </div>
                        </div>


                    </div>
                ))}


                {/* Pop-up Box jsx code */}
                <section id="pop-up-box">
                    {/* Modal */}
                    <div
                        className="modal fade"
                        id="deleteconfirmation"
                        tabIndex={-1}
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">
                                        Confirm!
                                    </h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                </div>
                                <div className="modal-body">Are you sure you want to delete this record?</div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                        No
                                    </button>
                                    <button onClick={handleToggleDelete} type="button" className="btn btn-primary" data-bs-dismiss="modal">
                                        Yes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default EventList;
