import React from "react";
import './TC.css';
import About_Header from "./components/About-components/About_Header";
import Footer from "./components/Footer";
import { Link } from "react-router-dom";
import Cookies from "js-cookie"

const TC = () => {
    
    return (
        <>
            <About_Header />
            <div className="tc-wrapper">
                <div className="tc">
                    <h1>Terms and Conditions</h1>
                    <span>Welcome to Showtime. By using our website and services, you agree to the following terms and conditions. Please read them carefully before booking.</span>
                    <div className="points">
                        <h2>1. Ticket Booking</h2>
                        <span>When you book tickets through Showtime, you confirm that all information provided is accurate. Bookings are subject to seat availability and confirmation after successful payment.</span>
                        <h2>2. Payment and Pricing</h2>
                        <span>All ticket prices are displayed in INR and may include applicable taxes and convenience fees. Payments are processed securely through trusted third-party gateways. Showtime is not responsible for any issues arising from these gateways.</span>
                        <h2>3. Cancellations and Refunds</h2>
                        <span>Tickets can be cancelled within the allowed cancellation window shown at the time of booking. Refunds will be issued to the original payment method. Cancellation charges may apply based on the theater's policy.</span>
                        <h2>4. User Account</h2>
                        <span>You are responsible for maintaining the confidentiality of your login credentials. Any activity under your account will be considered authorized by you.</span>
                        <h2>5. Show Timings and Seat Availability</h2>
                        <span>Show timings and seat availability are managed by the respective theaters and may change without notice. Showtime does not guarantee real-time accuracy.</span>
                        <h2>6. Content and Use</h2>
                        <span>All content on the Showtime platform is owned by or licensed to us. You may not copy, share, or alter any content without written permission.</span>
                        <h2>7. Limitation of Liability</h2>
                        <span>Showtime is not responsible for indirect, incidental, or special damages arising from the use of our services. Our total liability is limited to the ticket amount paid.</span>
                        <h2>8. Changes to Terms</h2>
                        <span>We reserve the right to update or modify these terms at any time. Continued use of Showtime after changes means you accept the revised terms.</span>
                    </div>
                    <div className="contact">
                        <Link to="/contact"><button>Contact Us</button></Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default TC;