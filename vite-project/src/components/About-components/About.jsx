import React from "react";
import './About.css';
import { BiSolidMoviePlay } from "react-icons/bi";
import { MdAccessTimeFilled } from "react-icons/md";
import { FaTicketAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import rahulImg from "../../assets/rahul.jpg";
import maniImg from "../../assets/manisharan.jpg"
import yashImg from "../../assets/yashwanth.jpg";
import { IoLogoGithub } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";

const About = () => {
    return (
        <>
            <div className="aboutwrapper">
                <div className="aboutcircle">
                    <h1>About Us</h1>
                    <h2>Discover Showtime</h2>
                    <div className="circletext">
                        Where your movie journey begins with
                        <br></br>
                        ease, excitement,and unforgettable
                        <br></br>
                        moments. From the latest blockbusters to
                        <br></br>
                        timeless classics, we bring you seamless
                        <br></br>
                        booking, personalized experiences, and
                        <br></br>
                        the thrill of cinema—all in one place.
                    </div>
                </div >
                <div className="abouttext">
                    <h1>
                        Welcome to Showtime<br />
                        <span className="subtitle">Your Movie Booking Made Easy</span>
                    </h1>
                    <p>Showtime is your go-to platform for quick, reliable, and easy movie ticket booking.<br></br>
                        Discover a wide variety of movies, check real-time showtimes updated constantly,<br></br>
                        pick your preferred seats with ease, and pay securely — all seamlessly available<br></br>
                        in one convenient place.</p>
                    <h1>Why Showtime?</h1>
                    <ul>
                        <li><BiSolidMoviePlay size={30} />Wide range of movies</li>
                        <li><MdAccessTimeFilled size={30} />Live showtimes & seat availability</li>
                        <li><FaTicketAlt size={30} />Easy booking, secure payments</li>
                        <li><FaUser size={30} />Personalized recommendations</li>
                    </ul>
                    <p>Plan ahead or book last-minute — Showtime makes it simple.
                        Experience the ease.<br></br>Enjoy the show.</p>
                </div>
            </div>
            <div className="aboutcards">
                <div className="manisharan aboutcard">
                    <img src={maniImg}></img>
                    <h1>Vancha Manisharan Reddy</h1>
                    <div className="card-info">
                        Handled everything users see and interact with.
                        Using React, HTML, CSS, and JavaScript, he built clean, responsive pages and made sure the app looked good on all devices. He turned design ideas into real UI, added smooth interactions, and focused on making the app easy to use and fast. From layout to buttons, all the visual magic came from here!
                    </div>
                    <div className="socialmedia">
                        <a href="https://github.com/Manisharan73" target="_blank"><IoLogoGithub size={40} /></a>
                        <a href="https://www.linkedin.com/in/vancha-mani-sharan-reddy-37294a312/?lipi=urn%3Ali%3Apage%3Ad_flagship3_feed%3BtBUVJuQ0Rom%2B4xwMYANKNA%3D%3D" target="_blank"><FaLinkedin size={38} /></a>
                    </div >
                </div >
                <div className="rahul aboutcard">
                    <img src={rahulImg}></img>
                    <h1>Rahul Gajula</h1>
                    <div className="card-info">
                        Took care of all the behind-the-scenes stuff. Built the server, handled the database, and made sure everything worked smoothly in the background. He set up routes and APIs using Node.js and Express, managed data with MongoDB, and most importantly—integrated Razorpay to handle payments securely. So whenever someone made a transaction, it was his code making it happen!
                    </div>
                    <div className="socialmedia">
                        <a href="https://github.com/Rahul2245" target="_blank"><IoLogoGithub size={40} /></a>
                        <a href="https://www.linkedin.com/in/rahul-gajula-14b53a326/overlay/about-this-profile/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BX2Y2vVE7SO6WwyuOQj2VWQ%3D%3D" target="_blank"><FaLinkedin size={38} /></a>
                    </div>
                </div >
                <div className="yashwanth aboutcard">
                    <img src={yashImg}></img>
                    <h1>Pendem Yashwanth Kumar</h1>
                    <div className="card-info">
                        Worked on both the front and back sides of the project. Helped build UI components with React and also wrote backend code using Node.js and MongoDB. He connected everything together—making sure the data flowed smoothly between the front-end and back-end. Also helped with testing, fixing bugs, and deploying the final app. Basically, helped glue all the parts of the project into one working system.
                    </div>
                    <div className="socialmedia">
                        <a href="https://github.com/yashwanth-9-42" target="_blank"><IoLogoGithub size={40} /></a>
                        <a href="https://www.linkedin.com/in/yashwanth-pendem-77ba04330/overlay/about-this-profile/" target="_blank"><FaLinkedin size={38} /></a>
                    </div >
                </div >
            </div >
        </>
    );
};

export default About;