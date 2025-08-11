import React, { useState } from "react";
import "./Cancel.css";
import { MdOutlineEventSeat } from "react-icons/md";
import About_Header from "./components/About-components/About_Header";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Cancel = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const booking = location.state;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    if (!booking) {
        navigate("/booking-history");
        return null;
    }

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const formatTime = (t) => {
        const dateObj = new Date(t);
        return dateObj.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    };

    const handleCancel = async () => {
        alert("Do you want to cancel?")
        setLoading(true);
        setError(null);

        try {
            const token = Cookies.get("token");
            if (!token) {
                throw new Error("Please log in to cancel your booking");
            }

            const response = await fetch(
                `http://localhost:3000/api/user/cancel-booking/${booking._id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Failed to cancel booking");

            navigate("/booking-history");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <About_Header />
            <div className="cancel-wrapper">
                <div className="cancel">
                    <div className="cancel-data">
                        <img
                            src={booking?.poster || "https://via.placeholder.com/250x350?text=No+Image"}
                            alt="poster"
                        />
                        <div className="cancel-movie-data">
                            <h1>{booking.movietitle}</h1>
                            <p>
                                {booking.theatre?.theatretitle}, {booking.theatre?.location}
                            </p>
                            <div className="preview-timings">
                                <div>{formatTime(booking.starttime)}</div>
                                <div>{formatDate(booking.starttime)}</div>
                            </div>
                            <h3>Quantity: {booking.seats?.length}</h3>
                            <div className="seat-info">
                                <MdOutlineEventSeat size={40} />
                                <span>Seat Number: {booking.seats?.join(", ")}</span>
                            </div>
                            <h1>Amount: ₹{booking.totalprice}</h1>
                        </div>
                    </div>
                    <div className="cancel-btn">
                        <button onClick={handleCancel} disabled={loading}>
                            {loading ? "Cancelling..." : "Cancel"}
                        </button>
                        {error && <p style={{ color: "red" }}>{error}</p>}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cancel;
