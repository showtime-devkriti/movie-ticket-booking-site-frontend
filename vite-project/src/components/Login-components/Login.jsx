import React from "react"
import "./Login.css"
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div className="wrapper">
            <form action="#">
                <h2>Login Form</h2>
                <div className="input-field">
                    <input type="text" required />
                    <label>Enter your email</label>
                </div>
                <div className="input-field">
                    <input type="password" required />
                    <label>Enter your password</label>
                </div>
                <div className="forget">
                    <label for="remember">
                        <input type="checkbox" id="remember" />
                        <p>Remember me</p>
                    </label>
                    <a href="#">Forgot password?</a>
                </div>
                <div className="submit"><button type="submit">Log In</button></div>
                <div className="register">
                    <p>Don't have an account? <Link to="/register"> Register</Link></p>
                </div>
            </form>
        </div>
    );
};

export default Login