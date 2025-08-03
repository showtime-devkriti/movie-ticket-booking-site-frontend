import React from "react";
import "./Book_Preview.css";
import About_Header from "./components/About-components/About_Header";
import { MdOutlineEventSeat } from "react-icons/md";

const Book_Preview = () => {
    return (
        <>
            <About_Header />
            <div className="book-preview-container">
                <div className="book-preview">
                    <div className="movie-preview">
                        <img src="https://image.tmdb.org/t/p/original/lUpMckVHaB55YJ3SMK0arwxKmCt.jpg"></img>
                        <div className="movie-preview-text">
                            <h1>M.S. Dhoni: The Untold Story</h1>
                            Maheshwari Digital 4K Cinema: Bannerghatta
                            Road (MAHESHWARI), Bengaluru, Bengaluru
                            <div className="preview-timings">
                                <div>1:00 PM</div>
                                <div>Sat, 23 Jul, 2016</div>
                            </div>
                            <h3>Quantity: 2</h3>
                            <div className="preview-tickets">
                                <MdOutlineEventSeat size={40} />
                                <div className="preview-seating">
                                    <h4>Diamond: Q1, Q2</h4>
                                    Screen 1
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