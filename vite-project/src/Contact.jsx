import React, { useState } from "react";
import './Contact.css';
import About_Header from "./components/About-components/About_Header";
import Footer from "./components/Footer";
import { FaPhone } from "react-icons/fa6";
import { MdMail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { MdAccessTimeFilled } from "react-icons/md";
import Cookies from "js-cookie"

const Contact = () => {
    const [contactData, setContactData] = useState({
        fullname: "", 
        phonenumber: "",
        email: "", 
        description: ""
    })

    const handleContactChange = (e) => {
        const { name, value } = e.target;
        setContactData((prev) => ({ ...prev, [name]: value }));
    };

    const handleContact = async (e) => {
        e.preventDefault();
        const token = Cookies.get("token");

        const result = await fetch("http://localhost:3000/api/user/contactus", {
            method: "POST",
            headers: {
                "authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(contactData)
        });

        if(result.ok){
            console.log("successful")
        }
    }

    return (
        <>
            <About_Header />
            <div className="contact-wrapper">
                <div className="contact-left">
                    <h1>Contact Us</h1>
                    <div className="contact-info">
                        <div className="contacts">
                            <FaPhone size={20} />
                            <div className="numbers">
                                <div>+91 73967 62006</div>
                                <div>+91 79936 52006</div>
                                <div>+91 78939 33954</div>
                            </div>
                        </div>
                        <div className="mail">
                            <MdMail size={20} />
                            naanigs2245@gmail.com
                        </div>
                        <div className="address">
                            <FaLocationDot size={20} />
                            ABV IIITM, Gwalior, 474015
                        </div>
                        <div className="contact-timings">
                            <MdAccessTimeFilled size={20} />
                            10AM - 8PM
                        </div>
                    </div>
                </div>
                <div className="contact-right">
                    <form>
                        <div className="contact-name">
                            <label>Full Name</label>
                            <input type="text" name="fullname" value={contactData.fullname} id="fullname" onChange={handleContactChange}></input>
                        </div>
                        <div className="contact-number">
                            <label>Phone Number</label>
                            <input type="text" name="phonenumber" value={contactData.phonenumber} id="phonenumber" onChange={handleContactChange}></input>
                        </div>
                        <div className="contact-mail">
                            <label>Email</label>
                            <input type="text" name="email" value={contactData.email} id="email" onChange={handleContactChange}></input>
                        </div>
                        <div className="contact-query">
                            <label>How can we help?</label>
                            <textarea type="text" name="description" id="description" onChange={handleContactChange} value={contactData.description}></textarea>
                        </div>
                        <div className="contact-submit">
                            <button onClick={handleContact}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Contact;