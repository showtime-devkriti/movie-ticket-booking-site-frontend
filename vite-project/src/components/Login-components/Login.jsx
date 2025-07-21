import React, { useState, useEffect, useRef} from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"
import "./Login.css";

const Login = () => {
    const [searchParams] = useSearchParams();
    const mode = searchParams.get("mode");
    const [isLogin, setIsLogin] = useState(true);
    const [first, onFirst] = useState(true);
    const navigate = useNavigate();
    const loginRef = useRef(null);
    const registerRef = useRef(null);
    const parentRef = useRef(null);

    useEffect(() => {
        const token = Cookies.get("token");

        if(token){
            navigate("/home");
            return;
        }

        if(mode === "register") {
            if (parentRef.current && registerRef.current) {
                const height = registerRef.current.getBoundingClientRect().height;
                console.log(height)
                if(height === 642 || height === 644){
                    parentRef.current.style.height = `${height-100}px`;
                }
                else
                parentRef.current.style.height = `${height+100}px`;
            } else {
                console.warn("childRef is null");
            }
        }else {
            if (loginRef.current && parentRef.current) {
                const height = loginRef.current.clientHeight;
                parentRef.current.style.height = `${height}px`;
            } else {
                console.warn("childRef is null");
            }
        }
    }, [mode]);

    useEffect(() => {
        setIsLogin(mode !== "register");
    }, [mode]);

    const [loginData, setLoginData] = useState({
        check: "",
        password: "",
    });

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:3000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(loginData),
            });

            const result = await res.json();

            if (res.ok) {
                setLoginData({ check: "", password: "" });
                navigate("/home"); // Redirect to home or desired page
            } else {
                alert(`Error: ${result.msg || "Login failed"}`);
            }
        } catch (err) {
            console.error("Login failed:", err);
            alert("Something went wrong");
        }
    };

    // Register form data state
    const [registerData, setRegisterData] = useState({
        email: "",
        password: "",
        username: "",
        phonenumber: "",
        fullname: "",
    });

    // Handle register input changes
    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle register form submit
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();

        if (registerData.password !== registerData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const res = await fetch("http://localhost:3000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(registerData),
            });

            const result = await res.json();

            if (res.ok) {
                alert("Registration successful!");
                setIsLogin(true);
                setRegisterData({
                    email: "",
                    password: "",
                    confirmPassword: "",
                    username: "",
                    phonenumber: "",
                    fullname: "",
                    location: "",
                });
            } else {
                alert(`Error: ${result.msg || "Registration failed"}`);
            }
        } catch (err) {
            console.error("Registration failed:", err);
            alert("Something went wrong");
        }
    };

    return (
        <div className="login-container">
            <div ref={parentRef} className={`wrapper ${isLogin ? "" : "active"}`}>
                {/* Login Form */}

                <div ref={loginRef} className="login-form">
                    <form onSubmit={handleLoginSubmit}>
                        <h2>Login</h2>
                        <div className="input-field">
                            <input type="text" name="check" value={loginData.check} onChange={handleLoginChange} required />
                            <label>Username / Email / Phone</label>
                        </div>
                        <div className="input-field">
                            <input type="password" name="password" value={loginData.password} onChange={handleLoginChange} required />
                            <label>Password</label>
                        </div>
                        <div className="forget">
                            <label htmlFor="remember">
                                <input type="checkbox" id="remember" />
                                <p>Remember me</p>
                            </label>
                            <a href="#">Forgot password?</a>
                        </div>
                        <div className="submit">
                            <button type="submit">Log In</button>
                        </div>
                        <div className="register">
                            <p>
                                Don't have an account?{" "}
                                <Link className="switch" to="/login?mode=register" onClick={() => setIsLogin(false)}>
                                    Register
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>


                {/* Register Form */}

                <div ref={registerRef} className="register-form" autoComplete="off">
                    <form onSubmit={handleRegisterSubmit}>
                        <h2>Register</h2>

                        <div className="input-field">
                            <input type="text" name="fullname" value={registerData.fullname} onChange={handleRegisterChange} autoComplete="off" required />
                            <label>Full Name</label>
                        </div>

                        <div className="input-field">
                            <input type="text" name="username" value={registerData.username} onChange={handleRegisterChange} autoComplete="off" required />
                            <label>Username</label>
                        </div>

                        <div className="input-field">
                            <input type="email" name="email" value={registerData.email} onChange={handleRegisterChange} autoComplete="off" required />
                            <label>Email</label>
                        </div>

                        <div className="input-field">
                            <input type="tel" name="phonenumber" pattern="[0-9]{10}" value={registerData.phonenumber} autoComplete="off" onChange={handleRegisterChange} required />
                            <label>Phone Number</label>
                        </div>

                        <div className="input-field">
                            <input type="password" name="password" value={registerData.password} autoComplete="new-password" onChange={handleRegisterChange} required />
                            <label>Password</label>
                        </div>

                        <div className="input-field">
                            <input type="password" name="confirmPassword" value={registerData.confirmPassword} autoComplete="off" onChange={handleRegisterChange} required />
                            <label>Confirm Password</label>
                        </div>

                        <div className="forget">
                            <label htmlFor="terms">
                                <input type="checkbox" id="terms" required />
                                <p>I agree to the terms and conditions</p>
                            </label>
                        </div>

                        <div className="submit">
                            <button type="submit">Register</button>
                        </div>

                        <div className="login">
                            <p>
                                Already have an account?
                                <Link className="switch" to="/login?mode=login" onClick={() => setIsLogin(true)}>
                                    Login
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default Login;
