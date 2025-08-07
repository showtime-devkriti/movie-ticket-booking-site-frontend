import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./Admin_Login.css";

const Admin_Login = () => {
    const [searchParams] = useSearchParams();
    const mode = searchParams.get("mode");
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();
    const loginRef = useRef(null);
    const registerRef = useRef(null);
    const parentRef = useRef(null);
    const [isTheatre, setIsTheatre] = useState(false);

    useEffect(() => {
        const admin = Cookies.get("admin");

        if (admin) {
            navigate("/admin");
            return;
        }

        if (mode === "register") {
            if (parentRef.current && registerRef.current) {
                const height = registerRef.current.getBoundingClientRect().height;
                if (height === 642 || height === 644) {
                    parentRef.current.style.height = `${height - 100}px`;
                } else {
                    parentRef.current.style.height = `${height + 200}px`;
                }
            } else {
                console.warn("childRef is null");
            }
        } else {
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
            const res = await fetch("http://localhost:3000/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(loginData),
            });

            const result = await res.json();

            if (res.ok) {
                setLoginData({ check: "", password: "" });
                navigate("/admin");
            } else {
                alert(`Error: ${result.msg || "Login failed"}`);
            }
        } catch (err) {
            console.error("Login failed:", err);
            alert("Something went wrong");
        }
    };

    const [registerData, setRegisterData] = useState({
        email1: "",
        email2: "",
        password: "",
        adminusername: "",
        phone1: "",
        phone2: "",

    });

    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterData((prev) => ({ ...prev, [name]: value }));
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();

        if (registerData.password !== registerData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const res = await fetch("http://localhost:3000/api/admin/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(registerData),
            });

            const result = await res.json();

            if (res.ok) {
                alert("Registration successful!");
                setIsLogin(true);
                setRegisterData({
                    email1: "",
                    email2: "",
                    password: "",
                    adminusername: "",
                    phone1: "",
                    phone2: "",
                });

                setIsTheatre(true);
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
            <div ref={parentRef} className={`wrapper ${isLogin ? "" : "active"} ${isTheatre ? "theatre" : ""}`}>

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
                                <Link className="switch" to="/admin/login?mode=register" onClick={() => setIsLogin(false)}>
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
                            <input type="text" name="adminusername" value={registerData.adminusername} onChange={handleRegisterChange} autoComplete="off" required />
                            <label>AdminUsername</label>
                        </div>

                        <div className="input-field">
                            <input type="email" name="email1" value={registerData.email1} onChange={handleRegisterChange} autoComplete="off" required />
                            <label>Email 1</label>
                        </div>

                        <div className="input-field">
                            <input type="email" name="email2" value={registerData.email2} onChange={handleRegisterChange} autoComplete="off" required />
                            <label>Email 2</label>
                        </div>

                        <div className="input-field">
                            <input type="tel" name="phone1" pattern="[0-9]{10}" value={registerData.phone1} autoComplete="off" onChange={handleRegisterChange} required />
                            <label>Phone Number 1</label>
                        </div>

                        <div className="input-field">
                            <input type="tel" name="phone2" pattern="[0-9]{10}" value={registerData.phone2} autoComplete="off" onChange={handleRegisterChange} required />
                            <label>Phone Number 2</label>
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
                                <Link className="switch" to="/admin/login?mode=login" onClick={() => setIsLogin(true)}>
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

export default Admin_Login;