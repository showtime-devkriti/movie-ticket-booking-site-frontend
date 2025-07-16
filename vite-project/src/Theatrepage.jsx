import React from "react";
import './Theatrepage.css'
import Footer from "./components/Footer";
import Header2 from "./components/Header2"
import { FaLocationDot } from "react-icons/fa6";

const Theatrepage = () => {
    return (
        <>
            <Header2 />
            <div className="theatre-wrapper">
                <div className="theatre-data">
                    <div className="theatre-text">
                        <h1>AMB Cinemas: Gachibowli</h1>
                        <div className="theatre-location">
                            <FaLocationDot size={20} />
                            Sarath City Capital Mall, Forest Dept Colony, Kondapur, Gachibowli - Miyapur Road, White Field Road, Opposite Mahindra Showroom, Hyderabad, Telangana 500084, India
                        </div>
                    </div>
                </div>
                <div className="centre">
                    <div className="dates">
                        <div className="date-box">
                            <div className="month">
                                JUL
                            </div>
                            <div className="date">
                                16
                            </div>
                            <div className="day">
                                WED
                            </div>
                        </div>
                        <div className="date-box">
                            <div className="month">
                                JUL
                            </div>
                            <div className="date">
                                16
                            </div>
                            <div className="day">
                                WED
                            </div>
                        </div>
                        <div className="date-box">
                            <div className="month">
                                JUL
                            </div>
                            <div className="date">
                                16
                            </div>
                            <div className="day">
                                WED
                            </div>
                        </div>
                    </div>
                    <div className="shows">
                        <div className="show">
                            <div className="movie-details">
                                <h3>Superman (UA+13)</h3>
                                <h4>English, 2D</h4>
                            </div>
                            <div className="timings">
                                <div>
                                    05:25 PM
                                </div>
                                <div>
                                    05:25 PM
                                </div>
                                <div>
                                    05:25 PM
                                </div>
                            </div>
                        </div>
                        <div className="show">
                            <div className="movie-details">
                                <h3>Superman (UA+13)</h3>
                                <h4>English, 2D</h4>
                            </div>
                            <div className="timings">
                                <div>
                                    05:25 PM
                                </div>
                                <div>
                                    05:25 PM
                                </div>
                                <div>
                                    05:25 PM
                                </div>
                            </div>
                        </div>
                        <div className="show">
                            <div className="movie-details">
                                <h3>Superman (UA+13)</h3>
                                <h4>English, 2D</h4>
                            </div>
                            <div className="timings">
                                <div>
                                    05:25 PM
                                </div>
                                <div>
                                    05:25 PM
                                </div>
                                <div>
                                    05:25 PM
                                </div>
                            </div>
                        </div>
                        <div className="show">
                            <div className="movie-details">
                                <h3>Superman (UA+13)</h3>
                                <h4>English, 2D</h4>
                            </div>
                            <div className="timings">
                                <div>
                                    05:25 PM
                                </div>
                                <div>
                                    05:25 PM
                                </div>
                                <div>
                                    05:25 PM
                                </div>
                            </div>
                        </div>
                        <div className="show">
                            <div className="movie-details">
                                <h3>Superman (UA+13)</h3>
                                <h4>English, 2D</h4>
                            </div>
                            <div className="timings">
                                <div>
                                    05:25 PM
                                </div>
                                <div>
                                    05:25 PM
                                </div>
                                <div>
                                    05:25 PM
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Theatrepage