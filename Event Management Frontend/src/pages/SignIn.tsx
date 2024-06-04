import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { service } from "../utils/Service/service";
import { Grid, Switch } from '@mui/material';
import { Add } from '@mui/icons-material';
import signbg from './images/sign-bg.avif'
import mailimg from './images/mail.png'
import phnimg from './images/phone-book.png'
import userimg from './images/user.png'
import lockimg from './images/padlock.png'

import './css/style.css'
import { useForm } from 'react-hook-form';
import { isFirstLetterCapitalAlphabets, validateAlphabetsWithCapitalFirstLetter, validateContactLength, validateEmail, validatePassword } from '../utils/common';



interface userData {
    first_name: string,
    last_name: string,
    email: string,
    contact: number,
    user_name: string,
    password: string
}

const SignIn: React.FC = () => {
    const { register, handleSubmit, trigger, formState: { errors }, setValue, getValues } = useForm<userData>();
    const history = useNavigate();



    const onSubmit = async (userData: userData) => {

        userData.contact = Number(userData.contact)

        try {
            await service.makeAPICall({
                methodName: service.Methods.POST,
                apiUrl: service.API_URL.user.create,
                body: userData,
            });
            history(-1)
        } catch (error) {
            console.log(error);
        }
    };

    const hasError = Object.keys(errors).length > 0;


    return (
        <>


            <div className="signmain" >

                <img className="signup-bg" src={signbg} alt="" />


                <div className="signsquare-box">
                    <div className="signcontainer">
                        <h1 className="signtxt-1">Sign-up</h1>

                        <div id="signbox1">
                            <input
                                {...register('first_name', {
                                    required: true,
                                    // validate: validateAlphabetsWithCapitalFirstLetter,
                                })}
                                className="signtxt-2" type="text" placeholder="first name" />
                            <input
                                {...register('last_name', {
                                    required: true,
                                    // validate: validateAlphabetsWithCapitalFirstLetter,
                                })}
                                className="signtxt-3" type="text" placeholder="last name" />
                            <input
                                {...register('email', {
                                    required: true,
                                    validate: validateEmail,
                                })}
                                className="signtxt-7" type="text" placeholder="Email-Id" />

                            <span><img className="sign-icon4" src={mailimg} alt="" /></span>

                            <input
                                {...register('contact', {
                                    required: true,
                                    validate: validateContactLength,
                                })}
                                className="signtxt-8" type="number" placeholder="Contact Number" />

                            <span><img className="sign-icon5" src={phnimg} alt="" /></span>

                            <input
                                {...register('user_name', {
                                    required: true,
                                })}
                                className="signtxt-4" type="text" placeholder="Create username" />

                            <span><img className="sign-icon1" src={userimg} alt="" /></span>

                            <input
                                {...register('password', {
                                    required: true,
                                    validate: validatePassword,
                                })}
                                className="signtxt-5" type="password" placeholder="Create password" />
                            {/* <input className="signtxt-6" type="password" placeholder="confirm password" /> */}
                            <span><img className="sign-icon2" src={lockimg} alt="" /></span>
                            {/* <span><img className="sign-icon3" src={lockimg} alt="" /></span> */}
                            <button onClick={handleSubmit(onSubmit)}
                                className="signtxt-9"  >Sign-In</button>
                        </div>
                        <h3 className="signtxt-10">Already Have An Account <Link to="/login">Login</Link></h3>
                    </div>

                    {/* input validations */}
                    {hasError && <p style={{ color: 'red', fontSize: '150%', marginTop: '3%' }}>Please fill in all fields.</p>}
                    {errors.first_name?.message && <span className='validate-1'> {errors.first_name?.message}</span>}
                    <br />
                    {errors.last_name?.message && <span className='validate-2'> {errors.last_name?.message}</span>}
                    <br />
                    {errors.email?.message && <span className='validate-3'> {errors.email?.message}</span>}
                    <br />
                    {errors.contact?.message && <span className='validate-4'> {errors.contact?.message}</span>}
                    <br />
                    {errors.password?.message && <span className='validate-5'> {errors.password?.message}</span>}
                </div>
            </div>
        </>
    )
};

export default SignIn
