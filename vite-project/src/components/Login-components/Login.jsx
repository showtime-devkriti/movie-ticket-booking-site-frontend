import React from "react"
import "./Login.css"

const Login = () => {
    const [isLogin, setIsLogin] = React.useState(true);

    return (
        <div className="login-container">
            <div className={`wrapper ${isLogin ? "" : "active"}`}>
                {isLogin && (
                    <div className="login-form">
                        <form action="#">
                            <h2>Login Form</h2>
                            <div className="input-field">
                                <input type="text" required />
                                <label>Enter your email / number / username</label>
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
                                <p>Don't have an account? <a className="switch" href="#" onClick={() => setIsLogin(false)}>Register</a></p>
                            </div>
                        </form>
                    </div>
                )}

                {!isLogin && (
                    <div className="register-form">
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
                            <div className="login">
                                <p>Already have an account?<a className="switch" href="#" onClick={() => setIsLogin(true)}> Login</a></p>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};


export default Login