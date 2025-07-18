import React from "react";
import About_Header from "./components/About-components/About_Header";
import Footer from "./components/Footer";
import "./PP.css"
import { Link } from "react-router-dom";

const PP = () => {
    return (
        <>
            <About_Header />
            <div className="pp-wrapper">
                <div className="pp">
                    <h1>Privacy Policy</h1>
                    <div className="points">
                        <h2>1. Information We Collect</h2>
                        <span>When you use Showtime, we collect personal details like your name, email, phone number, and payment info to process bookings. We also collect device and usage data such as IP address and browser type to help improve our website and services. Cookies are used to remember your preferences and analyze user activity.</span>
                    </div>
                    <div className="points">
                        <h2>2. How We Use Your Information</h2>
                        <span>Your data helps us complete your bookings, send confirmations, and provide customer support. We also use it to enhance your experience on Showtime. If you opt in, we may send you promotional emails or updates about movies and offers. You can opt out at any time.</span>
                    </div>
                    <div className="points">
                        <h2>3. Sharing of Information</h2>
                        <span>We never sell your personal data. We only share it with trusted third-party services like payment processors and analytics platforms when required for service delivery. In certain cases, we may disclose data to comply with legal obligations or protect our rights.</span>
                    </div>
                    <div className="points">
                        <h2>4. Data Security</h2>
                        <span>We take appropriate security measures to protect your data, including encryption and secure servers. While we strive to keep your information safe, no online system is entirely immune to risks. We encourage you to use strong passwords and secure your account.</span>
                    </div>
                    <div className="points">
                        <h2>5. Your Rights</h2>
                        <span>You have the right to access, modify, or delete your personal information. You may also unsubscribe from marketing emails at any time. Just contact us, and we’ll handle your request promptly.</span>
                    </div>
                    <div className="points">
                        <h2>6. Changes to This Policy</h2>
                        <span>We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements. Major changes may be communicated to you directly via email or on our website. We recommend reviewing this policy periodically to stay informed about how we handle your personal data. By continuing to use Showtime after any updates, you agree to the revised policy.</span>
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

export default PP;