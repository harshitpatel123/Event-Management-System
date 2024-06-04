import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { service } from "../../utils/Service/service";
import { useForm } from 'react-hook-form';

import '../css/style.css'
import formbg from '../images/formimg3.jpg'


interface CmsPageFormProps {
    method: string;
}

interface plannerData {
    user_id: number,
    name: string,
    email: string,
    contact: number,
    business_name: string,
    business_description: string,
    portfolio_link: string,
    average_price: number,
    pricing_info: string,
    services_offered: string
}

const PlannerForm: React.FC<CmsPageFormProps> = ({ method }) => {
    const { register, handleSubmit, trigger, formState: { errors }, setValue, getValues } = useForm<plannerData>();
    const history = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await service.makeAPICall({
                    methodName: service.Methods.GET,
                    apiUrl: service.API_URL.planner.get,
                    params: id,
                });
                // set default values of react hook form
                const planner: plannerData = response?.data.data;
                // Set form values using setValue
                Object.entries(planner).forEach(([key, value]) => {
                    setValue(key as keyof plannerData, value);
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


    const onSubmit = async (plannerData: plannerData) => {

        plannerData.user_id = Number(localStorage.getItem('user_id')) || 0;
        plannerData.contact = Number(getValues('contact'))
        plannerData.average_price = Number(getValues('average_price'))

        try {
            const apiMethod = method === 'POST' ? service.Methods.POST : service.Methods.PUT;
            const url = method === 'POST' ? service.API_URL.planner.create : service.API_URL.planner.update;
            await service.makeAPICall({
                methodName: apiMethod,
                apiUrl: url,
                params: id ?? '',
                body: plannerData,
            });
            history(-1)
        } catch (error) {
            console.log(error);
        }
    };

    const hasError = Object.keys(errors).length > 0;

    return (
        <>


            <img className="form-bg " src={formbg} alt="" />

            <div className="formsquare-box">
                <div className="formcontainer">

                    <h1 className="formtxt-1">Enter Your Detail</h1>

                    <div id="formbox1">
                        <form>
                            <input {...register('business_name', { required: true })} className="formtxt-2" type="text" placeholder="Business-Name" />
                            <input {...register('email', { required: true })} className="formtxt-4" type="text" placeholder="Email-Id" />
                            <input {...register('contact', { required: true })} className="formtxt-5" type="number" placeholder="Contact Number" />
                            <input {...register('name', { required: true })} className="formtxt-6" type="text" placeholder="Person Name" />
                            <input {...register('business_description', { required: true })} className="formtxt-7" type="text" placeholder="Business-Description" />
                            <input {...register('average_price', { required: true })} className="formtxt-8" type="number" placeholder="Average-Price" />
                            <input {...register('pricing_info', { required: true })} className="formtxt-9" type="text" placeholder="Price-Info" />
                            <input {...register('services_offered', { required: true })} className="formtxt-10" type="text" placeholder="Service-Offered" />
                            <input {...register('portfolio_link', { required: true })} className="formtxt-12" type="text" placeholder="Portfolio Link" />
                            <button onClick={handleSubmit(onSubmit)} className="formtxt-11" >{method === 'POST' ? 'Register' : 'Update'}</button>
                            <button onClick={(e) => { e.preventDefault(); history(-1); }} className="formtxt-14" >Back</button>
                        </form>
                    </div>
                </div>
                {hasError && <p style={{ color: 'red' }}>Please fill in all fields.</p>}

            </div>




            {/* <DashboardLayout>
                <DashboardNavbar />
                <MDBox pt={4} pb={3}>
                    <Grid container spacing={1}>
                        <Grid item xs={15}>
                            <MDBox mx={2} my={3} mt={-3} py={2} px={2} variant="gradient" bgColor={sidenavColor} borderRadius="lg" coloredShadow="info">
                                <MDTypography variant="h6" color="white">
                                    {method === 'POST' ? 'Add' : 'Update'} {globalMessages.cms.title}
                                </MDTypography>
                            </MDBox>
                            <MDBox component="form" role="form">
                                <MDBox mb={2} >
                                    <MDInput my={2} {...register("page_name", {
                                        required: 'Page title is requird',
                                        onChange: (e:any) => {
                                            getUrl && setValue('page_url', e.target.value.trim().replace(/\s+/g, '-').toLowerCase())
                                        }
                                    })}
                                        InputLabelProps={{ shrink: true }} label={globalMessages.cms.page_title} fullWidth required />
                                    {errors.page_name?.message && <ErrorShow error={errors.page_name?.message} />}
                                </MDBox>
                                <MDBox mb={2}>
                                    <MDInput my={2}  {...register("page_url", {
                                        required: 'Page URL is requird',
                                        onChange: () => {
                                            setGetUrl(false);
                                        }
                                    })} InputLabelProps={{ shrink: true }} label={globalMessages.cms.page_url} fullWidth required />
                                    {errors.page_url?.message && <ErrorShow error={errors.page_url?.message} />}
                                </MDBox>
                                <MDBox mb={2}>
                                    <MDTypography variant="button" fontSize={'0.7em'} fontWeight="regular" color="text" sx={{ cursor: "pointer", userSelect: "none", ml: 1 }}>
                                        {globalMessages.cms.description}
                                    </MDTypography>
                                    <Editor
                                        apiKey="26gbys1jawyqqnhug3vkrra5acd8f99cijzfpqwsu3ovu157"
                                        value={getValues('description')}
                                        {...register("description")}
                                        init={{
                                            height: 200,
                                            menubar: false,
                                        }}
                                        onEditorChange={(newValue, editor) => {
                                            setValue('description', editor.getContent({ format: 'raw' }));
                                            trigger('description')
                                        }}
                                    />
                                    {errors.description?.message && <ErrorShow error={errors.description?.message} />}
                                </MDBox>
                                <MDBox mb={2}>
                                    <MDInput {...register("meta_title")} InputLabelProps={{ shrink: true }} label={globalMessages.cms.meta_title} fullWidth multiline required />
                                    {errors.meta_title?.message && <ErrorShow error={errors.meta_title?.message} />}
                                </MDBox>
                                <MDBox mb={2}>
                                    <MDInput {...register("meta_description")} InputLabelProps={{ shrink: true }} label={globalMessages.cms.meta_description} fullWidth multiline rows={4} required />
                                    {errors.meta_description?.message && <ErrorShow error={errors.meta_description?.message} />}
                                </MDBox>
                                <MDBox mx={2} display='flex' alignItems='center' mb={2}>
                                    <MDTypography variant="button" fontSize={'0.8em'} fontWeight="regular" color="text" sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}>
                                        {globalMessages.cms.is_active}
                                    </MDTypography>
                                    <Switch checked={getValues('is_active')}  {...register("is_active")} onClick={handleToggle} />
                                </MDBox>
                                <MDBox>
                                    <MDButton variant="gradient" color={sidenavColor} sx={{ mr: 2 }} onClick={handleSubmit(onSubmit)}>
                                        {method === 'POST' ? 'Add' : 'Update'} {globalMessages.cms.save_button_text}
                                    </MDButton>
                                    <MDButton variant="gradient" color="error" onClick={() => history(-1)}>
                                        {globalMessages.cms.cancel_button_text}
                                    </MDButton>
                                </MDBox>
                            </MDBox>
                        </Grid>
                    </Grid>
                </MDBox>
                </DashboardLayout> */}
        </>
    );
};

export default PlannerForm;
