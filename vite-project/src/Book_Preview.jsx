import React, { useEffect, useState } from "react";
import "./Book_Preview.css";
import About_Header from "./components/About-components/About_Header";
import { MdOutlineEventSeat } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { useMovieContext } from "./components/MovieContext/movieContext";

const Book_Preview = () => {
    const location = useLocation()
    const { selectedSeats, cost, screenData, theatreData } = location.state || {}
    const [groupedSeats, setGroupedSeats] = useState([])
    const { data } = useMovieContext();

    const t = (t) => {
        const time = t?.split("T")[1]
        const date = t?.split("T")[0]
        const hrs = time.split(":")[0]
        const min = time.split(":")[1]
        if (hrs <= 12) {
            return (`${hrs} : ${min}`)
        }
        else {
            return (`${hrs - 12}:${min}`)
        }
    }

    useEffect(() => {
        const groupedArray = Object.values(
            selectedSeats.reduce((acc, seat) => {
                if (!acc[seat.class]) {
                    acc[seat.class] = {
                        class: seat.class,
                        seats: []
                    };
                }
                acc[seat.class].seats.push(seat);
                return acc;
            }, {})
        );
        console.log(groupedArray)
        setGroupedSeats(groupedArray);
    }, [selectedSeats])

    useEffect(() => {
        console.log({
            seats: selectedSeats,
            cost: cost,
            screenData: screenData,
            data: data,
            theatreData: theatreData
        })
    }, [selectedSeats, cost, screenData, data, theatreData])

    return (
        <>
            <About_Header />
            <div className="book-preview-container">
                <div className="book-preview">
                    <div className="movie-preview">
                        <img src="https://image.tmdb.org/t/p/original/lUpMckVHaB55YJ3SMK0arwxKmCt.jpg"></img>
                        <div className="movie-preview-text">
                            <h1>{data?.title}</h1>
                            {theatreData?.address}
                            <div className="preview-timings">
                                <div>1:00 PM</div>
                                <div>Sat, 23 Jul, 2016</div>
                            </div>
                            <h3>Quantity: {selectedSeats?.length}</h3>
                            <div className="preview-tickets">
                                <MdOutlineEventSeat size={40} />
                                <div className="preview-seating">
                                    {groupedSeats?.map((name, i) => (
                                        <h4 key={i}>{name.class}: {name.seats?.map((seat, i) => (
                                            <span key={i}>
                                                {seat.seatid}{i !== name.seats.length - 1 ? ', ' : ''}
                                            </span>
                                        ))}</h4>
                                    ))}
                                    {screenData?.screenName}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="book-preview-data">
                        <div className="preview-top">
                            <div className="top-left">
                                <h2>Ticket Price</h2>
                                <p>2 Tickets</p>
                            </div>
                            <div className="top-right">
                                <h2>₹500</h2>
                            </div>

                        </div>
                        <div className="preview-bottom">
                            <div className="bottom-left">
                                <h2>Internet Handling Fees</h2>
                                <p>Booking Fees</p>
                                <p>CGST</p>
                                <p>SGST</p>
                            </div>
                            <div className="bottom-right">
                                <h2>10%</h2>
                                <p>15%</p>
                                <p>20%</p>
                                <p>25%</p>
                            </div>
                        </div>
                    </div>
                    <div className="total">
                        <h2>Amount to be paid</h2>
                        <h2>₹1000</h2>
                    </div>
                </div>
                <div className="pay">
                    <button>Pay</button>
                </div>
            </div>
        </>
    );
};

export default Book_Preview;