import React, { useEffect, useState } from "react";
import "./Book_Preview.css";
import About_Header from "./components/About-components/About_Header";
import { MdOutlineEventSeat } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { useMovieContext } from "./components/MovieContext/movieContext";
import Cookies from "js-cookie"

const Book_Preview = () => {
    const location = useLocation()
    const { selectedSeats, cost, screenData, theatreData } = location.state || {}
    const [groupedSeats, setGroupedSeats] = useState([])
    const { data } = useMovieContext();
    const [finalCost, setFinalCost] = useState(null)
    const offercoupon = "regular";
    const navigate = useNavigate()

    const paymentHandler = async (e) => {
        e.preventDefault();
        const token = Cookies.get("token")
        const seats = selectedSeats.map((seat) => (seat.seatid))
        const showtimeid = screenData?.showtimeid

        try {
            const res = await fetch(`http://localhost:3000/api/bookticket/create-order/${screenData?.showtimeid}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    seats,
                    offercoupon,
                }),
            });

            const orderRes = await res.json();
            console.log("Create Order Response:", orderRes);

            if (!orderRes.order || !orderRes.order.id) {
                return alert("Failed to create Razorpay order");
            }

            const options = {
                key: "rzp_test_iOSQhNR2QraH5n",
                amount: finalCost,
                currency: "INR",
                description: "Movie Ticket",
                // image: reactimg,
                order_id: orderRes.order.id,
                prefill: {
                    email: "manisharanreddyvancha@gmail.com",
                    contact: "7396762096",
                },
                config: {
                    display: {
                        blocks: {
                            banks: {
                                name: "Methods With Offers",
                                instruments: [
                                    {
                                        method: "wallet",
                                        wallets: ["olamoney"],
                                    },
                                    {
                                        method: "wallet",
                                        wallets: ["freecharge"],
                                    },
                                ],
                            },
                        },
                        sequence: ["block.banks"],
                        preferences: {
                            show_default_blocks: true,
                        },
                    },
                },
                handler: async function (response) {
                    console.log("Razorpay Response:", response);

                    const body = {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                        showtimeid,
                        seats,

                        total: orderRes.total, // assuming backend sends `total`
                    };

                    const validateRes = await fetch("http://localhost:3000/api/payment/validate", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify(body),
                    });

                    const jsonRes = await validateRes.json();
                    console.log("Validation Response:", jsonRes);
                    alert(jsonRes.msg || "Booking Confirmed!");
                },
                modal: {
                    ondismiss: function () {
                        if (window.confirm("Are you sure, you want to close the form?")) {
                            console.log("Checkout form closed by the user");
                        } else {
                            console.log("Please complete the payment.");
                        }
                    },
                },
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.open();
        } catch (error) {
            console.error("Payment error:", error);
            if (error instanceof SyntaxError) {
                alert("Response was not JSON. Backend might have returned an HTML error page.");
            } else {
                alert("Payment failed: " + error.message);
            }
        }
    };

    const t = (t) => {
        const time = t?.split("T")[1]
        const date = t?.split("T")[0]
        const hrs = time.split(":")[0]
        const min = time.split(":")[1]
        if (hrs <= 12) {
            return (`${hrs} : ${min} AM`)
        }
        else {
            return (`${hrs - 12}:${min} PM`)
        }
    }

    const date = (t) => {
        const date = t?.split("T")[0]
        const temp = date?.split("-")

        return `${temp[2]}-${temp[1]}-${temp[0]}`
    }

    const final = () => {
        const fee = cost * 0.1
        const booking_fee = fee * 0.15
        const sgst = fee * 0.2
        const cgst = fee * 0.2

        //setFinalCost(cost + fee + booking_fee + sgst + cgst)
        return cost + fee + booking_fee + sgst + cgst
    }

    useEffect(() => {
        const fee = cost * 0.1
        const booking_fee = fee * 0.15
        const sgst = fee * 0.2
        const cgst = fee * 0.2

        setFinalCost(cost + fee + booking_fee + sgst + cgst)

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
    }, [selectedSeats, cost])

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
                        <img src={data?.poster_url}></img>
                        <div className="movie-preview-text">
                            <h1>{data?.title}</h1>
                            {theatreData?.address}
                            <div className="preview-timings">
                                <div>{t(screenData?.showtime?.starttime)}</div>
                                <div>{date(screenData?.showtime?.starttime)}</div>
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
                                <p>{selectedSeats?.length} Tickets</p>
                            </div>
                            <div className="top-right">
                                <h2>₹{cost}</h2>
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
                        <h2>₹{final().toFixed(2)}</h2>
                    </div>
                </div>
                <div className="pay">
                    <button onClick={paymentHandler}>Pay</button>
                </div>
            </div>
        </>
    );
};

export default Book_Preview;