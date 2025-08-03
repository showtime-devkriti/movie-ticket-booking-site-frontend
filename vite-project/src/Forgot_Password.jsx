import React, { useState } from "react";
import "./Forgot_Password.css";
import Login_Header from "./components/Login-components/Login_Header";

const Forgot_Password = () => {
    const [isOTP, setIsOTP] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);

    const handleOTPClick = () => {
        setIsOTP(true)
    }

    const handleSubmit = () => {
        setIsSubmit(true);
    }

    return (
        <>
            <Login_Header />
            <div className="forgot-form-container">
                <div className="wrapper">
                    <div className="forgot-form">
                        <form>
                            <h2>Forgot Password</h2>
                            {!isSubmit ? (!isOTP ? (
                                <>
                                    <div className="input-field">
                                        <input type="text" name="check" required />
                                        <label>Username / Email / Phone</label>
                                    </div>
                                    <div className="submit">
                                        <button type="submit" onClick={handleOTPClick}>
                                            Get Otp
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="input-field">
                                        <input type="text" name="check" required />
                                        <label>Username / Email / Phone</label>
                                    </div>
                                    <div className="input-field">
                                        <input type="text" name="otp" required />
                                        <label>Enter OTP</label>
                                    </div>
                                    <div className="submit">
                                        <button type="submit" onClick={handleSubmit}>
                                            Submit
                                        </button>
                                    </div>
                                </>
                            )) :
                                <>
                                    <div className="input-field">
                                        <input type="password" name="newPassword" required />
                                        <label>New Password</label>
                                    </div>
                                    <div className="input-field">
                                        <input type="password" name="confirmPassword" required />
                                        <label>Confirm Password</label>
                                    </div>
                                    <div className="submit">
                                        <button type="submit" onClick={handleSubmit}>
                                            Reset
                                        </button>
                                    </div>
                                </>}
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Forgot_Password;