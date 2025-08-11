import React, { useState, useEffect } from "react";
import Login_Header from "./components/Login-components/Login_Header";
import { useLocation, useNavigate } from "react-router-dom";

const Verify = () => {
    const [otp, setOtp] = useState("")
    const [loading, setLoading] = useState(false);
    const [check, setCheck] = useState("")
    const location = useLocation()
    const navigate = useNavigate()
    const {email, phonenumber, username, password, fullname} = location.state || ""

    const selectHandler = (e) => {
        setMethod(e.target.value)
    }

    const handleOTPClick = async () => {
        setLoading(true)
        const res = await fetch(`http://localhost:3000/api/auth/verifyOTP`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                email: email,
                phonenumber: phonenumber,
                password: password,
                username: username,
                fullname: fullname, 
                otp: otp
            }),
        })
        console.log(res)
        if (res.ok) {
            navigate("/login?mode=login")
            setLoading(false)
        } else {
            setLoading(false)
        }
    }

    const OtpHandler = (e) => {
        setOtp(e.target.value)
    }

    return <>
        {loading && <div className="loader-container" >
            <div className="loader"></div>
        </div>}
        <Login_Header />
        <div className="forgot-form-container">
            <div className="wrapper">
                <div className="verify-form">
                    <form>
                        <h2>Verify</h2>

                        <>
                            <div className="input-field">
                                <input type="text" name="otp" required value={otp} onChange={OtpHandler} />
                                <label>Enter OTP</label>
                            </div>
                            <div className="submit">
                                <button type="button" onClick={handleOTPClick}>
                                    Get Otp
                                </button>
                            </div>
                        </>

                    </form>
                </div>
            </div>
        </div>
    </>
}

export default Verify;