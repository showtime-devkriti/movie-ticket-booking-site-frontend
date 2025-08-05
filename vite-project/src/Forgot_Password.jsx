import React, { useEffect, useState } from "react";
import "./Forgot_Password.css";
import Login_Header from "./components/Login-components/Login_Header";
import { useNavigate } from "react-router-dom";

const Forgot_Password = () => {
    const [isOTP, setIsOTP] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [check, setCheck] = useState("")
    const [otp, setOtp] = useState("")
    const [method, setMethod] = useState(null)
    const [password, setPassword] = useState({
        password: "",
        confirm: ""
    })
    const navigate = useNavigate()

    const checkHandler = (e) => {
        setCheck(e.target.value)
    }

    const OtpHandler = (e) => {
        setOtp(e.target.value)
    }

    const passHandler = (e) => {
        const { name, value } = e.target;
        setPassword(prev => ({
            ...prev,
            [name]: value
        }));

        if(password.password === password.confirm){
            console.log("password not matching")
        }
    }


    const selectHandler = (e) => {
        setMethod(e.target.value)
    }

    const handleOTPClick = async () => {
        setLoading(true)
        if (method === "email") {
            const res = await fetch(`http://localhost:3000/api/auth/forgotpassword`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    method: method,
                    email: check,
                    phonenumber: ""
                }),
            })
            console.log(res)
            if (res.ok) {
                setIsOTP(true)
                setLoading(false)
            } else {
                setLoading(false)
            }

        } else if (method === "sms") {
            setLoading(true)
            const res = await fetch(`http://localhost:3000/api/auth/forgotpassword`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    method: method,
                    email: "",
                    phonenumber: `+91 ${check}`
                }),
            })
            console.log(res)
            if (res.ok) {
                setLoading(false)
                setIsOTP(true)
            } else {
                setLoading(false)
            }
        }
    }

    const handleSubmit = async () => {
        setLoading(true)
        const res = await fetch(`http://localhost:3000/api/auth/verifytoken`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                token: otp,
            }),
        })
        if (res.ok) {
            setLoading(false)
            setIsSubmit(true)
        } else {
            setLoading(false)
        }
    }

    const handleReset = async () => {
        setLoading(true)
        const res = await fetch(`http://localhost:3000/api/auth/resetpassword`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                token: otp,
                newPassword: password.password,
            }),
        })
        if (res.ok) {
            setLoading(false)
            setIsSubmit(true)
            navigate("/home")
        } else {
            setLoading(false)
        }
    }

    return (
        <>
            {loading && <div className="loader-container" >
                <div className="loader"></div>
            </div>}
            <Login_Header />
            <div className="forgot-form-container">
                <div className="wrapper">
                    <div className="forgot-form">
                        <form>
                            <h2>Forgot Password</h2>
                            {!isSubmit ? (!isOTP ? (
                                <>
                                    <div className="select">
                                        <label>Method</label>
                                        <select name="method" className="method" onChange={selectHandler}>
                                            <option value="select">Select</option>
                                            <option value="email">Email</option>
                                            <option value="sms">Phone number</option>
                                        </select>
                                    </div>
                                    {method === "email" && <div className="input-field">
                                        <input type="text" name="check" required value={check} onChange={checkHandler} />
                                        <label>Email</label>
                                    </div>}
                                    {method === "sms" && <div className="input-field">
                                        <input type="text" name="check" required value={check} onChange={checkHandler} />
                                        <label>Phone``</label>
                                    </div>}
                                    <div className="submit">
                                        <button type="button" onClick={handleOTPClick}>
                                            Get Otp
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {method === "email" && <div className="input-field">
                                        <input type="text" name="check" required value={check} onChange={checkHandler} />
                                        <label>Email</label>
                                    </div>}
                                    {method === "sms" && <div className="input-field">
                                        <input type="text" name="check" required value={check} onChange={checkHandler} />
                                        <label>Phone``</label>
                                    </div>}
                                    <div className="input-field">
                                        <input type="text" name="otp" required value={otp} onChange={OtpHandler} />
                                        <label>Enter OTP</label>
                                    </div>
                                    <div className="submit">
                                        <button type="button" onClick={handleSubmit}>
                                            Submit
                                        </button>
                                    </div>
                                </>
                            )) :
                                <>
                                    <div className="input-field">
                                        <input type="password" name="password" required autoComplete="new-password" value={password.password} onChange={passHandler}/>
                                        <label>New Password</label>
                                    </div>
                                    <div className="input-field">
                                        <input type="password" name="confirm" required autoComplete="new-password" value={password.confirm} onChange={passHandler}/>
                                        <label>Confirm Password</label>
                                    </div>
                                    <div className="submit">
                                        <button type="button" onClick={handleReset}>
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