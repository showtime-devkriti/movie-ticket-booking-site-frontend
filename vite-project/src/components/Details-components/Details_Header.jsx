import React from "react";
import './Details_Header.css';
import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

const Details_Header = () => {
    return (
        <>
            <header>
                <div className="details-header-container">
                    <div className="details-logo-location">
                        <Link to="/"><div className="details-logo">
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
                        <div className="details-location">
                            <span><FaLocationDot size={40} /></span>
                            <div className="details-location-text">
                                <div className="city">Hyderabad</div>
                                <div className="state"><h4>Telangana</h4></div>
                            </div>
                        </div>
                    </div>
                    <div className="details-right">
                        <div className="details-search-container">
                            <span><IoIosSearch size={25} /></span>
                            <div className="details-search">
                                <input type="text" placeholder="Search for movies and theaters"></input>
                            </div>
                        </div>
                        <div className="user-menu">
                            <FaUser size={40} />
                            <GiHamburgerMenu size={40}/>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Details_Header;