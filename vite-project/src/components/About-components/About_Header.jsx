import React from "react";
import './About_Header.css';
import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";

const About_Header = () => {
    return (
        <>
            <header className='about-header'>
                <div className="container">
                    <div className="logo-location">
                        <Link to="/"><div className="logo">
                            <svg width="300" height="60" viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg">
                                <g transform="translate(-65,80) rotate(-60 100 100) scale(1.4,1.4)" >
                                    <path d="M80,40 
             a10,10 0 0,1 10,-10 
             h100 
             a10,10 0 0,1 10,10 
             v20 
             a10,10 0 0,0 0,20 
             v20 
             a10,10 0 0,1 -10,10 
             h-100 
             a10,10 0 0,1 -10,-10 
             v-20 
             a10,10 0 0,0 0,-20 
             z"
                                        fill="#377884" />
                                </g>

                                <g transform="translate(43,65) scale(1.6,1.4)">
                                    <rect x="0" y="0" width="50" height="50" rx="6" fill="#111" />
                                    <polygon points="18,12 35,25 18,38" fill="#fff" />
                                    <g transform="rotate(-15 25 0)">
                                        <rect x="0" y="-20" width="50" height="14" fill="#111" />
                                        <rect x="4" y="-18" width="10" height="10" fill="#fff" />
                                        <rect x="20" y="-18" width="10" height="10" fill="#fff" />
                                        <rect x="36" y="-18" width="10" height="10" fill="#fff" />
                                    </g>
                                </g>

                                <text x="180" y="130" font-family="Sans" font-size="99" fill="#111" font-weight="bold">
                                    SHOWTIME
                                </text>
                            </svg>


                        </div></Link>
                        <div className="about-location">
                            <span><FaLocationDot size={40} /></span>
                            <div className="about-location-text">
                                <div className="city">Hyderabad</div>
                                <div className="state">Telangana</div>
                            </div>
                        </div>
                    </div>
                    <div className="search-container">
                        <span><IoIosSearch size={25} /></span>
                        <div className="search">
                            <input type="text" placeholder="Search for movies and theaters"></input>
                        </div>
                    </div>
                    <div className="user-menu">
                        <Link to="/about"><FaUser size={40} /></Link>
                        <Link to="/about"><IoMenu size={55} /></Link>
                    </div>
                </div>
            </header>
        </>
    );
};

export default About_Header;