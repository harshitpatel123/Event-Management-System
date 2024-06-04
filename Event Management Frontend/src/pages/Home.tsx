import React from 'react'
import Navbar from './Navbar'
import { Link, useNavigate } from 'react-router-dom'
import AboutUs from './AboutUs'
import './css/style.css'
import Footer from './Footer'
import homebg from './images/homebg.jpg'
import wedding1 from './images/wedding1.jpg'
import wedding2 from './images/wedding2.jpg'
import wedding3 from './images/wedding3.jpg'
import djnight1 from './images/djnight-1.jpg'
import djnight2 from './images/djnight-2.jpg'
import djnight3 from './images/djnight-3.jpg'
import birthday from './images/birthday-img.webp'
import dec from './images/31st dec.webp'
import holi from './images/holi-img.png'

interface FunctionProps {
  onLogout: Function
}

const Home: React.FC = () => {
  const navigate = useNavigate()

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="home-main">
        <div className="d-flex">
          <div className="row">
            <div className="col-sm-12">
              <img className="homg-bg" src={homebg} alt="" />
              <span className="hometxt-1">Be A Guest At </span>
              <span className="hometxt-2">Your Event</span>
            </div>
          </div>
        </div>

        <h2 className="hometxt-3">Plan Events</h2>

        <div className="part-1">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-3">

                <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
                  <div className="carousel-inner">

                    <div className="carousel-item active">
                      <img className="slide-img1 d-block w-100" src={wedding1} alt="..." />
                    </div>
                    <div className="carousel-item">
                      <img className="slide-img1 d-block w-100" src={wedding2} alt="..." />
                    </div>
                    <div className="carousel-item">
                      <img className="slide-img2 d-block w-100" src={wedding3} alt="..." />
                    </div>

                  </div>
                </div>
              </div>
              <div className="col-sm-9">

                <h2 className="head-wedding">Wedding Event</h2>
                <h5 className="desc-wedding">Explore a captivating gallery of unforgettable wedding moments meticulously curated from my extensive portfolio of past events. Each photograph is a testament to my expertise in orchestrating timeless celebrations filled with love, joy, and exquisite detail.  Let them inspire your own journey towards a day that reflects your unique love story, as I stand ready to craft another unforgettable masterpiece tailored just for you.</h5>

              </div>
            </div>
          </div>
        </div>

        <hr />

        <div className="part-2">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-9">
                <h1 className="head-dj">Dj-Night And Concert Event </h1>
                <h5 className="desc-dj">Dive into a visual symphony of pulsating beats and electrifying performances captured from my extensive portfolio of DJ nights and concert events. Each photo is a testament to the euphoric energy, seamless coordination, and unforgettable experiences that define my productions. From dynamic stage spectacles to crowds enraptured by the music, these images showcase the magic of live entertainment at its finest. Join me on a journey through these snapshots, where every frame tells a story of unity, excitement, and pure musical bliss. Let these moments inspire your next unforgettable event, where I'll bring your vision to life with passion and expertise.</h5>

              </div>

              <div className="col-sm-3">

                <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
                  <div className="carousel-inner">

                    <div className="carousel-item active">
                      <img className="slide-img d-block w-100" src={djnight1} alt="..." />
                    </div>
                    <div className="carousel-item">
                      <img className="slide-img d-block w-100" src={djnight2} alt="..." />
                    </div>
                    <div className="carousel-item">
                      <img className="slide-img d-block w-100" src={djnight3} alt="..." />
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        <hr />

        <div className="part-3">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-3">

                <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
                  <div className="carousel-inner">

                    <div className="carousel-item active">
                      <img src={birthday} className=" d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                      <img src={dec} className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                      <img src={holi} className="d-block w-100" alt="..." />
                    </div>

                  </div>
                </div>
              </div>
              <div className="col-sm-9">

                <h1 className="head-party">Festival And Party Event</h1>
                <h5 className="desc-party">Dive into a vibrant tapestry of celebration and joy captured from my extensive array of party and festival events. Each photo encapsulates the essence of euphoria, community, and pure revelry that define my gatherings. From lively floors pulsating with energy to colorful spectacles igniting the night sky, these images narrate tales of unforgettable moments shared with friends old and new. Join me on a visual journey through these snapshots, where every frame resonates with the spirit of festivity and togetherness. Let these glimpses inspire your next unforgettable occasion, as I stand ready to craft an experience that surpasses all expectations with passion and flair.</h5>

              </div>
            </div>
          </div>
        </div>

        {/* <hr /> */}
      </div>


      <div id="aboutUsSection">
        <AboutUs />
      </div>
      <div>
        <Footer />
      </div>



      {/* <div>
        <Navbar />
        <button onClick={HandleLogout} className="btn btn-outline-danger" style={{ float: 'right', margin: "20px" }}>
          LOG OUT
        </button>
        <center>
          <div className='m-5'>
            <br /><br />
            <h1>Welcome To CRUD App </h1><br /><br /><br />
            <h2>In the product page you can see the data of users and perform CRUD operations on it</h2>

            <br /><br /><br /><br />
            <h1>Go To Product Page</h1>
          </div>
          <Link to='/product'>
            <button className='btn btn-success btn-lg'>GO</button>
          </Link>
          <AboutUs />
        </center>
        <Footer />
      </div> */}
    </>
  )
}


export default Home 