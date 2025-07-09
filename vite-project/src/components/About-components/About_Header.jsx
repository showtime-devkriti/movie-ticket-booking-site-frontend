import { React, useState, useEffect } from "react";
import './About_Header.css';
import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";

const About_Header = () => {
    const [isLarge, setIsLarge] = useState(window.innerWidth >= 1375);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 750);

    useEffect(() => {
        const handleResize = () => {
            setIsLarge(window.innerWidth >= 1375);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 750);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            {!isMobile ? (

                isLarge ? (
                    <header className='about-header' >
                        <div className="container">
                            <div className="logo-location">
                                <div className="logo"><Link to="/">
                                    <svg width="250" height="60" viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg">
                                        <g transform="translate(-225,80) rotate(-60 100 100) scale(1.4,1.4)" >
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

                                        <g transform="translate(-115,65) scale(1.6,1.4)">
                                            <rect x="0" y="0" width="50" height="50" rx="6" fill="#111" />
                                            <polygon points="18,12 35,25 18,38" fill="#fff" />
                                            <g transform="rotate(-15 25 0)">
                                                <rect x="0" y="-20" width="50" height="14" fill="#111" />
                                                <rect x="4" y="-18" width="10" height="10" fill="#fff" />
                                                <rect x="20" y="-18" width="10" height="10" fill="#fff" />
                                                <rect x="36" y="-18" width="10" height="10" fill="#fff" />
                                            </g>
                                        </g>

                                        <text x="180" y="130" font-family="Sans" font-size="99" fill="#111" transform="translate(-150,0)" font-weight="bold">
                                            SHOWTIME
                                        </text>
                                    </svg>
                                </Link></div>
                                <div className="about-location">
                                    <span><FaLocationDot size={30} /></span>
                                    <div className="about-location-text">
                                        <div className="city">Hyderabad</div>
                                        <div className="state">Telangana</div>
                                    </div>
                                </div>
                            </div>
                            <div className="search-wrapper">
                                <div className="search-container">
                                    <span><IoIosSearch size={25} /></span>
                                    <div className="search">
                                        <input type="text" placeholder="Search for movies and theaters"></input>
                                    </div>
                                </div>
                            </div>
                            <div className="menu">
                                <Link to="/about"><IoMenu size={55} /></Link>
                            </div>
                        </div>
                    </header >
                ) : (
                    <header className='about-header'>
                        <div className="container">
                            <Link to="/"><div className="logo">
                                <svg width="250" height="60" viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg">
                                    <g transform="translate(-225,80) rotate(-60 100 100) scale(1.4,1.4)" >
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

                                    <g transform="translate(-115,65) scale(1.6,1.4)">
                                        <rect x="0" y="0" width="50" height="50" rx="6" fill="#111" />
                                        <polygon points="18,12 35,25 18,38" fill="#fff" />
                                        <g transform="rotate(-15 25 0)">
                                            <rect x="0" y="-20" width="50" height="14" fill="#111" />
                                            <rect x="4" y="-18" width="10" height="10" fill="#fff" />
                                            <rect x="20" y="-18" width="10" height="10" fill="#fff" />
                                            <rect x="36" y="-18" width="10" height="10" fill="#fff" />
                                        </g>
                                    </g>

                                    <text x="180" y="130" font-family="Sans" font-size="99" fill="#111" transform="translate(-150,0)" font-weight="bold">
                                        SHOWTIME
                                    </text>
                                </svg>
                            </div></Link>
                            <div className="about-location">
                                <span><FaLocationDot size={30} /></span>
                                <div className="about-location-text">
                                    <div className="city">Hyderabad</div>
                                    <div className="state">Telangana</div>
                                </div>
                            </div>
                            <div className="menu">
                                <Link to="/about"><IoMenu size={55} /></Link>
                            </div>
                        </div>
                        <div className="search-wrapper">
                            <div className="search-container">
                                <span><IoIosSearch size={25} /></span>
                                <div className="search">
                                    <input type="text" placeholder="Search for movies and theaters"></input>
                                </div>
                            </div>
                        </div>
                    </header>
                )
            ) : (
                <header className='about-header'>
                    <div className="container">
                        <Link to="/"><div className="logo">
                            <svg width="250" height="60" viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg">
                                <g transform="translate(-225,80) rotate(-60 100 100) scale(1.4,1.4)" >
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

                                <g transform="translate(-115,65) scale(1.6,1.4)">
                                    <rect x="0" y="0" width="50" height="50" rx="6" fill="#111" />
                                    <polygon points="18,12 35,25 18,38" fill="#fff" />
                                    <g transform="rotate(-15 25 0)">
                                        <rect x="0" y="-20" width="50" height="14" fill="#111" />
                                        <rect x="4" y="-18" width="10" height="10" fill="#fff" />
                                        <rect x="20" y="-18" width="10" height="10" fill="#fff" />
                                        <rect x="36" y="-18" width="10" height="10" fill="#fff" />
                                    </g>
                                </g>

                                <text x="180" y="130" font-family="Sans" font-size="99" fill="#111" transform="translate(-150,0)" font-weight="bold">
                                    SHOWTIME
                                </text>
                            </svg>
                        </div></Link>
                        <div className="menu">
                            <Link to="/about"><IoMenu size={55} /></Link>
                        </div>
                    </div>
                    <div className="search-wrapper">
                        <div className="search-container">
                            <span><IoIosSearch size={25} /></span>
                            <div className="search">
                                <input type="text" placeholder="Search for movies and theaters"></input>
                            </div>
                        </div>
                    </div>
                </header>
            )}
        </>
    );
};

export default About_Header;