import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import { IoLogoGithub } from "react-icons/io";
import { FaPhone } from "react-icons/fa6";
import { MdMail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

const Footer = () => {
    return (
        <>
            <footer>
                <div className="footer-top">
                    <div className="showtime">
                        <h3>Showtime</h3>
                        <div className="showtime-links">
                            <Link to="/about">About Us</Link>
                            <Link to="/privacypolicy">Privacy Policy</Link>
                            <Link to="/termsandconditions">Terms And Conditions</Link>
                        </div>
                    </div>
                    <div className="get-help">
                        <h3>Get Help</h3>
                        <div className="get-help-links">
                            <Link to="/FAQ">FAQs</Link>
                            <Link to="/contact">Contact Us</Link>
                            <div className="get-help-links">
                            </div>
                        </div>
                    </div>
                    <div className="follow-us">
                        <h3>Follow Us</h3>
                        <div className="repo">
                            <a href="https://github.com/showtime-devkriti/movie-ticket-booking-site-frontend.git" target='_blank'><IoLogoGithub size={40} /></a>
                            <a href="https://github.com/showtime-devkriti/movie-ticketing-site-backend" target='_blank'><IoLogoGithub size={40} /></a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p className='footer-rights'><span>&copy;</span> <span>2025 Showtime.</span> <span>All rights reserved.</span></p>
                    <p className='footer-mail'><MdMail /><span>Email:</span> <span>naanigs2245@gmail.com</span></p>
                    <p className='footer-numbers'><FaPhone /><span>Phone:</span> <span>+91 73967 62006</span> <span>+91 79936 52006</span> <span>+91 78939 33954</span></p>
                    <p><FaLocationDot />Location: Gwalior, India</p>
                </div>
            </footer>
        </>
    );
};

export default Footer;