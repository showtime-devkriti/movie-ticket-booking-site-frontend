import { React, useState, useEffect } from "react";
import './About_Header.css';
import { Link, useNavigate } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { TbLogout } from "react-icons/tb";
import Cookies from "js-cookie"

const About_Header = () => {
    const [isLarge, setIsLarge] = useState(window.innerWidth >= 1375);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 750);
    const [isMenu, setIsMenu] = useState(false);
    const navigate = useNavigate()

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

    const handleClick = () => {
        setIsMenu(!isMenu);
    };

    const handleLogout = () => {
        Cookies.remove("token");
        navigate("/");
    };

    return (
        <>
            {!isMobile ? (

                isLarge ? (
                    <header className='about-header' >
                        <div className="container">
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
                                            fill="#2479db" />
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

                                    <text x="180" y="130" fontFamily="Sans" fontSize="99" fill="#111" transform="translate(-150,0)" fontWeight="bold">
                                        SHOWTIME
                                    </text>
                                </svg>
                            </Link></div>
                            <div className="menu">
                                <IoMenu size={55} onClick={handleClick} />
                            </div>
                        </div>
                        <div className={isMenu ? ("sidebar open") : ("sidebar")}>
                            <IoMdClose size={55} onClick={handleClick} />
                            <div className="sidebar-text">
                                <Link to="/"><h1>Home</h1></Link>
                                <Link to="/about"><h1>About us</h1></Link>
                                <Link to="/FAQ"><h1>FAQs</h1></Link>
                                <Link to="/contact"><h1>Contact Us</h1></Link>
                                <div className="logout" onClick={handleLogout}>
                                    <h1>Logout</h1>
                                    <TbLogout size={35} />
                                </div>
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

                                    <text x="180" y="130" fontFamily="Sans" fontSize="99" fill="#111" transform="translate(-150,0)" fontWeight="bold">
                                        SHOWTIME
                                    </text>
                                </svg>
                            </div></Link>
                            <div className="menu">
                                <IoMenu size={55} onClick={handleClick} />
                            </div>
                        </div>
                        <div className={isMenu ? ("sidebar open") : ("sidebar")}>
                            <IoMdClose size={55} onClick={handleClick} />
                            <div className="sidebar-text">
                                <Link to="/"><h1>Home</h1></Link>
                                <Link to="/about"><h1>About us</h1></Link>
                                <Link to="/FAQ"><h1>FAQs</h1></Link>
                                <Link to="/contact"><h1>Contact Us</h1></Link>
                                <div className="logout" onClick={handleLogout}>
                                    <h1>Logout</h1>
                                    <TbLogout size={35} />
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

                                <text x="180" y="130" fontFamily="Sans" fontSize="99" fill="#111" transform="translate(-150,0)" fontWeight="bold">
                                    SHOWTIME
                                </text>
                            </svg>
                        </div></Link>
                        <div className="menu">
                            <IoMenu size={55} onClick={handleClick} />
                        </div>
                    </div>
                    <div className={isMenu ? ("sidebar open") : ("sidebar")}>
                        <IoMdClose size={55} onClick={handleClick} />
                        <div className="sidebar-text">
                            <Link to="/"><h1>Home</h1></Link>
                            <Link to="/about"><h1>About us</h1></Link>
                            <Link to="/FAQ"><h1>FAQs</h1></Link>
                            <Link to="/contact"><h1>Contact Us</h1></Link>
                            <div className="logout" onClick={handleLogout}>
                                <h1>Logout</h1>
                                <TbLogout size={35} />
                            </div>
                        </div>
                    </div>
                </header>
            )}
        </>
    );
};

export default About_Header;