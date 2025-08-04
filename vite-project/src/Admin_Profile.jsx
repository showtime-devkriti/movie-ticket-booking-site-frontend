import React from "react";
import "./Admin_Profile.css";
import Sidebar from "./components/Admin-Sidebar/Sidebar";
import { FaPhone } from "react-icons/fa6";
import { MdMail } from "react-icons/md";

const Admin_Profile = () => {
    return (
        <>
            <div className="admin-wrapper">
                <div className="sidebar-wrapper">
                    <Sidebar />
                </div>
                <div className="admin">
                    <img src="data:image/png;base64,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" />
                    <div className="admin-info-right">
                        <div><strong>Full Name</strong></div>
                        <div className="box">Vancha Manisharan Reddy</div>
                        <div><strong>Username</strong></div>
                        <div className="box">Manisharan73</div>
                        <div className="mail"><MdMail /><strong>Email 1</strong></div>
                        <div className="box">manisharanreddyvancha@gmail.com</div>
                        <div className="mail"><MdMail /><strong>Email 2</strong></div>
                        <div className="box">manisharanreddyvancha@gmail.com</div>
                        <div className="phone"><FaPhone /><strong>Phone Number 1</strong></div>
                        <div className="box">7396762006</div>
                        <div className="phone"><FaPhone /><strong>Phone Number 2</strong></div>
                        <div className="box">7396762006</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Admin_Profile;