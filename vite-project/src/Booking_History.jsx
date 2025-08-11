import React, { useState, useEffect } from "react";
import "./Booking_History.css";
import { GoHistory } from "react-icons/go";
import { GoDotFill } from "react-icons/go";
import About_Header from "./components/About-components/About_Header";
import Footer from "./components/Footer";
import Cookies from "js-cookie"
import { data } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const BookingCard = ({ booking }) => {
    const navigate = useNavigate();

    const runtime = () => {
        let screenTime = parseInt(booking?.runtime);
        const hrs = Math.floor(screenTime / 60);
        const min = screenTime % 60;
        return `${hrs}hr ${min}min`;
    };

    const t = (t) => {
        console.log(booking)
        const time = t?.split("T")[1];
        console.log(time)
        const date = t?.split("T")[0];
        const hrs = time.split(":")[0];
        const min = time.split(":")[1];
        if (hrs <= 12) {
            return (`${hrs} : ${min} AM`)
        }
        else {
            return (`${hrs - 12}:${min} PM`)
        }
    }

    const toIST = (isoString) => {
        if (!isoString) {
            return "Invalid date provided";
        }

        const dateObj = new Date(isoString);

        if (isNaN(dateObj.getTime())) {
            return "Invalid date format";
        }

        const options = {
            timeZone: 'Asia/Kolkata', 
            hour: 'numeric',
            minute: 'numeric',
            hour12: true 
        };

        return dateObj.toLocaleString('en-US', options);
    };

    function formatDate(dateStr) {
        const date = new Date(dateStr);
        const day = date.getDate().toString().padStart(2, "0");
        const month = date.toLocaleString("en-US", { month: "short" });
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }

    const handleClick = () => {
        navigate("/cancel", { state: booking });
    };

    return (
        <div
            className="booking-details"
            onClick={handleClick}
            style={{ cursor: "pointer" }}
        >
            <img src={booking?.showtime?.poster} alt="poster" />
            <div className="booking-info">
                <h1>{booking?.movietitle}</h1>
                <div className="runtime">{runtime()}</div>
                <div className="price">
                    <h1>₹{booking?.totalprice}</h1>
                </div>
                <div className="show-details">
                    {booking?.theatre?.theatretitle} -{" "}
                    {booking?.theatre?.location}
                    <div className="show-time">
                        <div>{formatDate(booking?.starttime?.split("T")[0])}</div>
                        <GoDotFill />
                        <div>{t(booking?.starttime)}</div>
                    </div>
                </div>
                <div className="ticket-details">
                    <div>
                        <strong>Total Tickets:</strong> {booking?.seats?.length}
                    </div>
                    <div>
                        <strong>Seat Number:</strong>
                        {booking?.seats?.map((item, index) => (
                            <span key={index}>
                                {item}
                                {index !== booking?.seats?.length - 1 ? ", " : ""}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const Booking_History = () => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    useEffect(() => {
        const token = Cookies.get("token");

        const fetchBooking = async () => {
            const result = await fetch(
                "http://localhost:3000/api/user/yourbookings",
                {
                    method: "GET",
                    headers: {
                        accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            ).then((res) => res.json());
            setData(result.bookinghistory);
        };

        fetchBooking();
    }, []);

    return (
        <>
            <About_Header />
            <div className="booking-history">
                <div className="booking-title">
                    <h1>Booking History</h1>
                    <GoHistory size={35} />
                </div>
                <div className="prev-bookings">
                    {data
                        ? [...data].reverse().map((booking, index) => (
                              <BookingCard key={index} booking={booking} />
                          ))
                        : null}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Booking_History;
