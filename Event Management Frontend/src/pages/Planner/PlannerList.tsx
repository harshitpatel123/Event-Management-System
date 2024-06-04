import React, { useEffect, useState } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Card } from "@mui/material";
import { service } from "../../utils/Service/service";
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';



const PlannerList: React.FC = () => {
    const history = useNavigate();
    const [updateOpen, setUpdateOpen] = useState<boolean>(false);
    const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
    const [rows, setRows] = useState<any>([]);
    const [index, setIndex] = useState<number | undefined>(undefined);
    const [filter, setfilter] = useState({
        business_name: '',
        average_price: undefined
    })


    const queryData = () => {
        const filteredValues = Object.fromEntries(
            Object.entries(filter).filter(([key, value]) => {
                return value !== undefined && value !== '';
            })
        );
        return filteredValues;
    };

    const fetchData = async () => {
        try {
            const response = await service.makeAPICall({
                methodName: service.Methods.GET,
                apiUrl: service.API_URL.planner.list,
                query: queryData()
            });
            setRows(response?.data.data.reverse());
            console.log('data', response?.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setTimeout(() => { fetchData(); }, 100)
    }, [index, filter])

    const handleToggleDelete = async () => {
        try {
            await service.makeAPICall({
                methodName: service.Methods.DELETE,
                apiUrl: service.API_URL.planner.delete,
                params: index ?? '',
            });
            setIndex(undefined)
        } catch (error) {
            console.log(error)
        }
    };

    const handleNavigateUpdate = (id: number) => {
        history(`/planner/update/${id}`);
    }

    const handleToggleView = async (id: number) => {
        history(`/planner/view/${id}`);
    };

    const handleNavigation = () => {
        history('/planner/add');
    };

    const handleUserNavigation = () => {
        history('/user');
    };

    const handleChange = (name: string, value: string) => {
        setfilter((prevData) => ({ ...prevData, [name]: value }));
    };



    return (
        <>
            <Navbar />

            <div className="planner-listbg">


                <h1 className='event-listname'><center style={{ marginBottom: '1%' }}>Planner List</center></h1>


                <div className="container px-5" >

                    <div className="row gx-5" style={{ marginLeft: "15%" }}>
                        <div className="col">
                            <div className="input-group mb-1">
                                <span className="input-group-text" id="basic-addon1">Search</span>
                                <input
                                    value={filter.business_name}
                                    onChange={(e: { target: { value: string; }; }) => handleChange("business_name", e.target.value)}
                                    type="text" className="form-control"
                                    placeholder="Planner Name" aria-label="Username"
                                    aria-describedby="basic-addon1" />
                            </div>
                        </div>
                        <div className="col" >
                            <div className="input-group mb-1">
                                <span className="input-group-text" id="basic-addon1">Price</span>
                                <input
                                    value={filter.average_price}
                                    onChange={(e: any) => handleChange("average_price", e.target.value)}
                                    type="number" className="form-control"
                                    placeholder="Average Price" aria-label="Username"
                                    aria-describedby="basic-addon1" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container px-4" style={{ marginLeft: '45%' }}>
                    <button onClick={handleNavigation} type="button" className="btn btn-success">Register</button>
                </div>
                {rows.map((planner: any) => (
                    <div key={planner.planner_id} style={{ marginTop: '2%', marginLeft: '5%', marginRight: '5%', paddingLeft: '4%', paddingRight: '4%' }} >
                        <div className="card" style={{ border: '2px solid black', borderRadius: '14px', paddingLeft: '4%' }}>
                            <div className="card-body">
                                <h3 className="card-title">{planner.business_name}</h3>
                                <h5 className="card-title">Average Price: {planner.average_price}</h5>
                                <p className="card-text">Description: {planner.business_description}</p>
                                <IconButton onClick={() => handleToggleView(planner.planner_id)}>
                                    <VisibilityIcon />
                                </IconButton>
                                <IconButton onClick={() => handleNavigateUpdate(planner.planner_id)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    onClick={() => setIndex(planner.planner_id || undefined)}
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




            {/* <MDBox pt={6} pb={3}>
                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <Card>
                                <MDBox mx={2} mt={-3} py={2} px={2} variant="gradient" bgColor={'white'} borderRadius="lg" coloredShadow="info">
                                    <MDTypography display="flex" alignItems="center" justifyContent="space-between" variant="h6" color="white">
                                        {globalMessages.cms.table_name}
                                        <Grid>
                                            <MDInput sx={{ mr: 1, backgroundColor: (theme: any) => theme.palette.light.main, borderRadius: 2, }}
                                                value={filter.page_name} label={globalMessages.cms.search} onChange={(e: { target: { value: string; }; }) => handleChange("page_name", e.target.value)} />
                                            <MDButton variant={'contained'} color={'white'} onClick={handleNavigation} children={<Add />} />
                                        </Grid>
                                    </MDTypography>

                                </MDBox>
                                <MDBox mx={2} mt={3} display='flex' justifyContent='space-around' alignItems='center'>
                                    <Grid container spacing={3}>
                                        <Grid item xs={8} md={3} lg={2}>
                                            <MDBox fontSize='medium' alignItems='center'>
                                                <Select value={filter.is_active} placeholder={globalMessages.cms.select_status} options={activeOptions} handleChange={(e) => handleChange("is_active", e.value)} />
                                            </MDBox>
                                        </Grid>
                                        <Grid item ml={'69%'}>
                                            <MDBox >
                                                <MDButton onClick={downloadCsv} color={'white'}>Export to CSV</MDButton>
                                            </MDBox>
                                        </Grid>
                                    </Grid>
                                </MDBox>

                                <MDBox pt={1}>
                                    {/* <DataTable table={{ columns, rows }} isSorted={true} entriesPerPage={true} showTotalEntries={false} noEndBorder /> */}
            {/* </MDBox>
                            </Card>
                        </Grid>
                    </Grid>
                </MDBox>
            <Confirm message={globalMessages.cms.delete_confirm} method={service.Methods.DELETE} url={service.API_URL.cms.delete} visible={deleteOpen} closeModal={handleToggleDelete} id={index} />
            <Confirm message={globalMessages.cms.status_update_confirm} method={service.Methods.GET} url={service.API_URL.cms.updateStatus} visible={updateOpen} closeModal={handleToggleStatus} id={index} /> */}

        </>
    )
}

export default PlannerList;
