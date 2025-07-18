import React from "react";
import About_Header from "./components/About-components/About_Header";
import Footer from "./components/Footer";
import './FAQ.css'
import { Link } from "react-router-dom";

const FAQ = () => {
    return (
        <>
            <About_Header />
            <div className="FAQ-wrapper">
                <div className="FAQ">
                    <h1>Frequently Asked Quetions(FAQs)</h1>
                    <div className="question">
                        <h2>Q: How do I book tickets on Showtime?</h2>
                        <span>A: First, register or log in to your Showtime account. Then select a movie, choose a showtime, pick your seats, and complete the payment. Your e-ticket will be sent to you instantly.</span>
                    </div>
                    <div className="question">
                        <h2>Q: Can I choose my own seats?</h2>
                        <span>A: Yes, you can select your preferred seats from the available options during booking.</span>
                    </div>
                    <div className="question">
                        <h2>Q: Do I need to register to book tickets?</h2>
                        <span>A: Yes, registration is mandatory to book tickets on Showtime. It helps us keep your bookings, preferences, and payments secure.</span>
                    </div>
                    <div className="question">
                        <h2>Q: Can I cancel or change my ticket after booking?</h2>
                        <span>A: Ticket cancellations are possible, but changes are not supported. Please review all details carefully before confirming your booking.</span>
                    </div>
                    <div className="question">
                        <h2>Q: What happens if a show is canceled by the theatre?</h2>
                        <span>A: In case of a cancellation, your ticket will be refunded automatically to the original payment method.</span>
                    </div>
                    <div className="question">
                        <h2>Q: What payment methods do you accept?</h2>
                        <span>A: Showtime accepts UPI, credit/debit cards, net banking, wallets, and Razorpay.</span>
                    </div>
                    <div className="question">
                        <h2>Q: Is it safe to pay on Showtime?</h2>
                        <span>A: Absolutely. We use secure, encrypted payment gateways to ensure your transactions are safe.</span>
                    </div>
                    <div className="question">
                        <h2>Q: Where will I get my booked tickets?</h2>
                        <span>A: Once booked, your e-ticket will be emailed and can also be found in your Showtime account under "My Bookings".</span>
                    </div>
                    <div className="question">
                        <h2>Q: Do I need to print my ticket?</h2>
                        <span>A: No. Showing the QR code or e-ticket on your phone is sufficient at most theatres.</span>
                    </div>
                    <div className="question">
                        <h2>Q: Can I book tickets for someone else using my account?</h2>
                        <span>A: Yes. Just enter their details while booking. Ensure the person carries a valid ID for verification at the theatre.</span>
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

export default FAQ;