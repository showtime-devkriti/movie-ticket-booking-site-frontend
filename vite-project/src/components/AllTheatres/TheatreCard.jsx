import React from "react";
import "./TheatreCard.css";
import { GrLocationPin } from "react-icons/gr";

const TheatreCard = () => {
    return <>
        <div className="th-wrapper">
            <div className="theatre-details">
                <div className="theatre-title">AMB Cinemas : Gachibowli</div>
                <div className="theatre-location">
                    <GrLocationPin />
                    <p>Sarath City Capital Mall, Forest Dept Colony, Kondapur, Gachibowli - Miyapur Road, White Field Road, Opposite Mahindra Showroom, Hyderabad, Telangana 500084, India</p>
                </div>
            </div>
            <div className="show-heading">Shows</div>
            <div className="show-list">
                <div className="th-show">
                    <div className="movie-title">Superman (UA+13)</div>
                    <div className="movie-details">English, 2D</div>
                </div>
                <div className="th-show">
                    <div className="movie-title">Superman (UA+13)</div>
                    <div className="movie-details">English, 2D</div>
                </div>
            </div>
        </div>
    </>
}

export default TheatreCard;