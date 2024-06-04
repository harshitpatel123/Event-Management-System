import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './css/style.css'
import logoimg from './images/logo-removebg-preview (1).png'
import dropdown from './images/application.png'
import profile from './images/profile-img.png'
import { addData } from "../redux/features/commonData/commonData";



export default function Navbar() {
    const history = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user_id');
        history('/login')
        window.location.reload();
    };


    const handleUserView = () => {
        const id = localStorage.getItem('user_id');
        history(`/user/${id}`)
    };

    const handleScrollToAboutUs = () => {
        const aboutUsSection = document.getElementById('aboutUsSection');
        if (aboutUsSection) {
          aboutUsSection.scrollIntoView({ behavior: 'smooth' });
        }
      };

    return (

        <>

            <div className="navbar-left" >

                <Link className="nav-part1" to="/home" style={{marginLeft:'2%'}}>Home</Link>
                <Link className="nav-part2" to="/planner">Event Planners</Link>
                <Link className="nav-part3" to="/event">My Event</Link>
                <Link className="nav-part4" to="/home" onClick={handleScrollToAboutUs}>About Us</Link>

                <img className="logo" src={logoimg} />
                <div className="dropmenu-1">

                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src={dropdown} alt="" />
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><Link className="dropdown-item1" to="/event/add">Create Your Own Event</Link></li>
                                <li><Link className="dropdown-item1" to="/planner/add">Register Your Business</Link></li>

                            </ul>
                        </li>
                    </ul>
                </div>

                <div className="dropmenu-2">

                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src={profile} alt="" />
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item1" onClick={handleUserView}>View Your Profile</a></li>
                                <li><a className="dropdown-item1" onClick={handleLogout}>Log out</a></li>

                            </ul>
                        </li>
                    </ul>
                </div>
            </div>



        </>
    )
}
