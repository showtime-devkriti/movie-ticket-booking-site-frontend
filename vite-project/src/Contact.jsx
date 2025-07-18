import React from "react";
import './Contact.css';
import About_Header from "./components/About-components/About_Header";
import Footer from "./components/Footer";
import { FaPhone } from "react-icons/fa6";
import { MdMail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { MdAccessTimeFilled } from "react-icons/md";

const Contact = () => {
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
                            <input type="text" name="fullname" id="fullname"></input>
                        </div>
                        <div className="contact-number">
                            <label>Phone Number</label>
                            <input type="text" name="phonenumber" id="phonenumber"></input>
                        </div>
                        <div className="contact-mail">
                            <label>Email</label>
                            <input type="text" name="email" id="email"></input>
                        </div>
                        <div className="contact-query">
                            <label>How can we help?</label>
                            <textarea></textarea>
                        </div>
                        <div className="contact-submit">
                            <button>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Contact;