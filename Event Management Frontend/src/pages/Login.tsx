import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import logbg from './images/75ZLp3.webp'
import logicon from './images/user.png'
import pwicon from './images/padlock.png'
import { service } from '../utils/Service/service';
import { useDispatch } from 'react-redux';



const Login: React.FC = () => {

    const history = useNavigate();
    const dispatchData = useDispatch();
    const [username, setusername] = useState<string>("")
    const [password, setpassword] = useState<string>("")
    const [showMsg, setShowMsg] = useState<boolean>(false)


    const handleLogin = async () => {
        try {
            const response = await service.makeAPICall({
                methodName: service.Methods.GET,
                apiUrl: service.API_URL.user.login,
                query: `user_name=${username}`
            });
            const userInfo = response?.data?.data
            if (userInfo !== null && password === userInfo.password) {
                console.log('loged in')
                localStorage.setItem('user_id', userInfo.user_id);
                history('/home')
                window.location.reload();
            }
            else {
                setShowMsg(true)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>

            <img className="login-bg" src={logbg} alt="" />

            <div className="logsquare-box">
                <div className="logcontainer">
                    <h1 className="logtxt-1">Login</h1>
                    <h5 className="logtxt-2"> Enter Username and Password</h5>
                    <div id="logbox1">

                        <input value={username} onChange={(e) => setusername(e.target.value)} className="logtxt-3" id="ttx" type="text" placeholder="username" />
                        <span><img className="log-icon1" src={logicon} alt="" /></span>
                        <input value={password} onChange={(e) => setpassword(e.target.value)} className="logtxt-5" type="password" placeholder="password" />
                        <span><img className="log-icon2" src={pwicon} alt="" /></span>
                        <button className="logtxt-6"
                            onClick={handleLogin}
                            disabled={username.length === 0 || password.length === 0}>Log In</button>

                    </div>
                    <h3 className="logtxt-7">{showMsg && "Incorrect Username Or Password"}</h3>
                    <h3 className="logtxt-8">Don't Have An Account <Link to="/signin">Sign In</Link></h3>
                </div>
            </div>



        </>

    )
}



export default Login