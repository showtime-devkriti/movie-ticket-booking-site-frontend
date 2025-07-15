import React from "react";
import { useState, useEffect } from "react";
import './Location.css';
import { FaLocationDot } from "react-icons/fa6";
import LocationPopUp from "./LocationPopUp"

const Location = () => {
    const [popUpShow, setPopUp] = useState(false);
    const [location, setLocationState] = useState('Hyderabad');
    const [isFirstVisit, setIsFirstVisit] = useState(false);

    useEffect(() => {
        const alreadyTriggered = sessionStorage.getItem("alreadyTriggered");

        if (!alreadyTriggered) {
            setIsFirstVisit(true);
            sessionStorage.setItem("alreadyTriggered", "true");
            console.log("Triggered for the first time in this session!");
            setPopUp(true);
        }

    }, []);

    return <>
        <div className="url-location" onClick={() => { setPopUp(true) }}>
            <span><FaLocationDot size={30} /></span>
            <div className="details-location-text">
                <div className="city">{location}</div>
            </div>
        </div>
        <LocationPopUp popUpShow={popUpShow} setPopUp={setPopUp} setLocationState={setLocationState} isFirstVisit={isFirstVisit} />
    </>
}

export default Location;