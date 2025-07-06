import React from "react"
import "./Register.css"
import { Link } from "react-router-dom";

const Register = () => {
    return (
        <>
            <div className="register-container">
                <div className="register-wrapper">
                    <form action="#">
                        <h2>Register Form</h2>
                        <div className="input-field">
                            <input type="text" required />
                            <label>Enter your full name</label>
                        </div>
                        <div className="input-field">
                            <input type="text" required />
                            <label>Enter your username</label>
                        </div>
                        <div className="input-field">
                            <input type="text" required />
                            <label>Enter your email</label>
                        </div>
                        <div className="input-field">
                            <input type="tel" pattern="[0-9]{10}" required />
                            <label>Enter your number</label>
                        </div>
                        <div className="input-field">
                            <input type="password" required />
                            <label>Enter your password</label>
                        </div>
                        <div className="input-field">
                            <input type="password" required />
                            <label>Confirm password</label>
                        </div>
                        <div className="forget">
                            <label for="remember">
                                <input type="checkbox" id="remember" />
                                <p>I agree to the terms and conditions</p>
                            </label>
                        </div>
                        <div className="submit"><button type="submit">Register</button></div>
                        <div className="register">
                            <p>Already have an account?<Link to="/login"> Login</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Register