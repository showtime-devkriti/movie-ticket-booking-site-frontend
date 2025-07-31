import React, { useState, useEffect } from "react";
import './User.css';
import About_Header from "./components/About-components/About_Header";
import Footer from "./components/Footer";
import { TbLogout } from "react-icons/tb";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaPhone } from "react-icons/fa6";
import { MdMail } from "react-icons/md";
import Cookies from "js-cookie"

const EditUser = () => {
    return <>
        <div className="user-info">
            <div><strong>Full Name</strong></div>
            <div className="box">
                {isEditing ? (
                    <input
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleChange}
                    />
                ) : (
                    data?.fullname
                )}
            </div>

            <div><strong>Username</strong></div>
            <div className="box">
                {isEditing ? (
                    <input
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                ) : (
                    data?.username
                )}
            </div>

            <div><MdMail /><strong>Email</strong></div>
            <div className="box">
                {isEditing ? (
                    <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                ) : (
                    data?.email
                )}
            </div>

            <div><FaPhone /><strong>Phone Number</strong></div>
            <div className="box">
                {isEditing ? (
                    <input
                        name="phonenumber"
                        value={formData.phonenumber}
                        onChange={handleChange}
                    />
                ) : (
                    data?.phonenumber
                )}
            </div>
        </div>
    </>
}


const User = () => {
    const [data, setData] = useState(null)
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ ...data });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        setData(formData);
        setIsEditing(false);

    };

    const handleCancel = () => {
        setFormData(data);
        setIsEditing(false);
    };

    useEffect(() => {
        const token = Cookies.get("token")

        const fetchBooking = async () => {
            const result = await fetch("http://localhost:3000/api/user/myprofile",
                {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
            ).then(res => res.json())

            setData(result.user)
            console.log(result)
        }

        fetchBooking()
    }, [])

    return (
        <>
            <div className="user-wrapper">
                <About_Header />
                <div className="user-container">
                    <div className="user">
                        <div className="user-image">
                            <img src="https://imgs.search.brave.com/oqdznxa-ezL2kfg59mC6RHSKr3ZMzIPpm5u-oT67MZE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMTkv/ODc5LzE5OC9zbWFs/bC91c2VyLWljb24t/b24tdHJhbnNwYXJl/bnQtYmFja2dyb3Vu/ZC1mcmVlLXBuZy5w/bmc"></img>
                            <h1>{data?.username}</h1>
                        </div>
                        {/* <div className="user-info">
                            <div><strong>Full Name</strong></div>
                            <div className="box">{data?.fullname}</div>
                            <div><strong>Username</strong></div>
                            <div className="box">{data?.username}</div>
                            <div><MdMail /><strong>Email</strong></div>
                            <div className="box">manisharanreddyvancha@gmail.com</div>
                            <div><FaPhone /><strong>Phone Number</strong></div>
                            <div className="box">{data?.phonenumber}</div>
                        </div> */}

                        <div className="user-info">
                            <div><strong>Full Name</strong></div>
                            <div className="box">
                                {isEditing ? (
                                    <input
                                        name="fullname"
                                        value={formData.fullname}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    data?.fullname
                                )}
                            </div>

                            <div><strong>Username</strong></div>
                            <div className="box">
                                {isEditing ? (
                                    <input
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    data?.username
                                )}
                            </div>

                            <div><MdMail /><strong>Email</strong></div>
                            <div className="box">
                                {isEditing ? (
                                    <input
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    data?.email
                                )}
                            </div>

                            <div><FaPhone /><strong>Phone Number</strong></div>
                            <div className="box">
                                {isEditing ? (
                                    <input
                                        name="phonenumber"
                                        value={formData.phonenumber}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    data?.phonenumber
                                )}
                            </div>
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