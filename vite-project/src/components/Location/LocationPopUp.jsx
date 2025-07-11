import React from "react";
import { useState, useEffect } from "react";
import './LocationPopUp.css'
import { IoClose } from "react-icons/io5";

const LocationPopUp = ({ popUpShow, setPopUp }) => {
    return <>
        <div className={`pop-up-container ${popUpShow ? "" : "hidden"}`} >
            <div className="close-button" onClick={() => setPopUp(false)}>
                <IoClose size={26} />
            </div>
            <div className="location-div">
                <h2>Location</h2>
                <p>Choose your location to get the best experience.</p>
                <div className="location-input">
                    <input type="text" placeholder="Enter your location" required />
                    <button className="location-button">Set Location</button>
                </div>
                <div className="location-list">
                    <div>Hyderabad</div>
                    <div>Mumbai</div>
                    <div>Delhi</div>
                    <div>Bengulore</div>
                    <div>Chennai</div>
                    <div>Vishakapatnam</div>
                </div>
            </div>
            <div className="language-div">
                <h2>Language</h2>
                <div className="language-input">
                    <input type="text" placeholder="Enter your language" required />
                    <button className="language-button">Set Language</button>
                </div>
                <div className="language-list">
                    <div>Telugu</div>
                    <div>Hindi</div>
                    <div>English</div>
                </div>
            </div>
        </div>
    </>
}

export default LocationPopUp;