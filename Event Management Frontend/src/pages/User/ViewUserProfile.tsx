import React, { useEffect, useState } from 'react';
import { Grid, Switch, Card } from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';
import { service } from '../../utils/Service/service';
import { showFormattedDate } from '../../utils/common';

import '../css/style.css'
import mypic from '../images/djnight-1.jpg'







const ViewUserProfile: React.FC = () => {
    const { id } = useParams();
    const history = useNavigate();
    const [userData, setUserData] = useState<any>();

    const fetchUser = async (id: string | undefined) => {
        try {
            const response = await service.makeAPICall({
                methodName: service.Methods.GET,
                apiUrl: service.API_URL.user.get,
                params: id
            });
            return response?.data?.data;
        } catch (error) {
            console.log(error)
        }
        return null;
    }

    useEffect(() => {
        fetchUser(id).then((data: any) => { setUserData(data) }).catch((error) => { console.log(error) });
    }, [])




    return (
        <>
            {
                userData ?
                    <>



                        <div className="profile-viewbg">

                            <div className='profilesquare-box'>

                                <div className="container">

                                    <div className="profile-image">
                                        <img src="" alt="" />
                                    </div>
                                    <label className='username-view'>user-name</label>
                                    <input value={'@'+userData.user_name} className='img-name' type="text" />

                                    <div>
                                        <label className='profile-name1'>Full Name</label>
                                        <input value={userData.first_name + ' '+ userData.last_name} className='profile-box1' type="text" />
                                    </div>
                                    <div>
                                        <label className='profile-name2'>Email-ID</label>
                                        <input value={userData.email} className='profile-box2' type="text" />
                                    </div>
                                    <div>
                                        <label className='profile-name3'>Contact-No</label>
                                        <input value={userData.contact} className='profile-box3' type="text" />
                                    </div>
                                </div>

                            </div>

                            <button onClick={()=> history(-1)} type="button" className="btn-userview btn-outline-dark">Back</button>

                        </div>

                    </>
                    :
                    <h1>Loading...</h1>
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

export default ViewUserProfile;