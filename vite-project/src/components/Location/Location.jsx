import React from "react";
import { useState, useEffect } from "react";
import './Location.css';
import { FaLocationDot } from "react-icons/fa6";
import LocationPopUp from "./LocationPopUp"

const Location = ({setLocation}) => {
    const [popUpShow, setPopUp] = useState(false);
    const [location, setLocationState] = useState('Hyderabad');

    return <>
        <div className="url-location" onClick={() => {setPopUp(true)}}>
            <span><FaLocationDot size={30} /></span>
            <div className="details-location-text">
                <div className="city">{location}</div>
            </div>
        </div>
        <LocationPopUp popUpShow={popUpShow} setPopUp={setPopUp} setLocationState={setLocationState}/>
    </>
}

export default Location;