import React from "react";
import './User.css';
import About_Header from "./components/About-components/About_Header";
import Footer from "./components/Footer";
import { TbLogout } from "react-icons/tb";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaPhone } from "react-icons/fa6";
import { MdMail } from "react-icons/md";

const User = () => {
    return (
        <>
            <div className="user-wrapper">
                <About_Header />
                <div className="user-container">
                    <div className="user">
                        <div className="user-image">
                            <img src="https://imgs.search.brave.com/oqdznxa-ezL2kfg59mC6RHSKr3ZMzIPpm5u-oT67MZE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMTkv/ODc5LzE5OC9zbWFs/bC91c2VyLWljb24t/b24tdHJhbnNwYXJl/bnQtYmFja2dyb3Vu/ZC1mcmVlLXBuZy5w/bmc"></img>
                            <h1>Manisharan73</h1>
                        </div>
                        <div className="user-info">
                            <div><strong>Full Name</strong></div>
                            <div className="box">Vancha Manisharan Reddy</div>
                            <div><strong>Username</strong></div>
                            <div className="box">Manisharan73</div>
                            <div><MdMail /><strong>Email</strong></div>
                            <div className="box">manisharanreddyvancha@gmail.com</div>
                            <div><FaPhone /><strong>Phone Number</strong></div>
                            <div className="box">7396762006</div>
                        </div>
                    </div>
                    <div className="user-btn">
                        <button>Edit Profile <FaEdit size={25} /></button>
                        <Link to="/booking-history"><button>My Bookings</button></Link>
                        <button>Logout <TbLogout size={25} /></button>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default User;