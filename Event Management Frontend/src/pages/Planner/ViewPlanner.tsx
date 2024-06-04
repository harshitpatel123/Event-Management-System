import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { service } from '../../utils/Service/service';
import { showFormattedDate } from '../../utils/common';

import '../css/style.css'
import mypic from '../images/djnight-1.jpg'

interface CmsType {
    page_id: number,
    page_name: string,
    page_url: string,
    description: string,
    is_active: boolean,
    meta_title: string | null,
    meta_description: string | null,
}



const ViewPlanner: React.FC = () => {
    const { id } = useParams();
    const history = useNavigate();
    const [plannerData, setPlannerData] = useState<any>();

    const fetchPlanner = async (id: string | undefined) => {
        try {
            const response = await service.makeAPICall({
                methodName: service.Methods.GET,
                apiUrl: service.API_URL.planner.get,
                params: id
            });
            return response?.data?.data;
        } catch (error) {
            console.log(error)
        }
        return null;
    }

    useEffect(() => {
        fetchPlanner(id).then((data: CmsType) => { setPlannerData(data) }).catch((error) => { console.log(error) });
    }, [])

    const modifyKey = (key: string): string => {
        let words = key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        return words;
    }

    const decodeHTML = (html: string) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    };

    const removeKey = ['created_by', 'updated_by', 'deleted_at', 'deleted_by']

    return (
        <>

            {
                plannerData ?
                    <>

                        <div className='viewplanner-bg'>

                            <div className="d-flex  align-item-center jusfify-content-center">


                                <form action='#'>

                                    <div>
                                        <label htmlFor="fname" className='viewplanner-lable1'> Name</label>
                                        <input value={plannerData.name} className="viewplanner-box1" type="text" />
                                    </div>

                                    <div>
                                        <label htmlFor='Email-Id' className='viewplanner-lable2'>Email-Id</label>
                                        <input value={plannerData.email} className='viewplanner-box2' type='text' />
                                    </div>

                                    <div>
                                        <label htmlFor='Contact-No' className='viewplanner-lable3'>Contact-No</label>
                                        <input value={plannerData.contact} className='viewplanner-box3' type='text' />
                                    </div>

                                    <div>
                                        <label htmlFor='Business-Name' className='viewplanner-lable4'>Business-Name</label>
                                        <input value={plannerData.business_name} className='viewplanner-box4' type='text' />
                                    </div>

                                    <div>
                                        <label htmlFor='Business-Description' className='viewplanner-lable5'>Business-Description</label>
                                        <textarea value={plannerData.business_description} className='viewplanner-box5' />
                                    </div>

                                    <div>
                                        <label htmlFor='Portfolio-Link' className='viewplanner-lable6'>Portfoilio-Link</label>
                                        <input value={plannerData.portfolio_link} className='viewplanner-box6' type='text' />
                                    </div>

                                    <div>
                                        <label htmlFor='Average-Price' className='viewplanner-lable7'>Average-Price</label>
                                        <input value={plannerData.average_price} className='viewplanner-box7' type='number' />
                                    </div>

                                    <div>
                                        <label htmlFor='Pricing-Info' className='viewplanner-lable8'>Pricing-Info</label>
                                        <input value={plannerData.pricing_info} className='viewplanner-box8' type='text' />
                                    </div>

                                    <div>
                                        <label htmlFor='Services-Offered' className='viewplanner-lable9'>Services-Offered</label>
                                        <input value={plannerData.services_offered} className='viewplanner-box9' type='text' />
                                    </div>

                                </form>
                            </div>

                            <button onClick={()=>history(-1)} type="button" className="btn-view btn-outline-dark">Back</button>

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

export default ViewPlanner;