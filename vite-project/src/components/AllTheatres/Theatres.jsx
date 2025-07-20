import React from "react";
import "./Theatres.css"
import TheatreCard from "./TheatreCard";
import Header2 from "../Header2";

const theatres = [
    {
        "id": "t1",
        "name": "PVR Cinemas",
        "location": "Hyderabad, Telangana",
        "screens": 5,
        "facilities": ["Dolby Atmos", "Recliner Seats", "3D", "Snacks Available"]
    },
    {
        "id": "t2",
        "name": "INOX",
        "location": "Mumbai, Maharashtra",
        "screens": 4,
        "facilities": ["IMAX", "Online Booking", "Wheelchair Accessible"]
    },
    {
        "id": "t3",
        "name": "Cinepolis",
        "location": "Bengaluru, Karnataka",
        "screens": 6,
        "facilities": ["VIP Lounge", "4DX", "Snacks Available"]
    },
    {
        "id": "t4",
        "name": "Asian Cinemas",
        "location": "Chennai, Tamil Nadu",
        "screens": 3,
        "facilities": ["2D", "Digital Projection", "Parking"]
    },
    {
        "id": "t5",
        "name": "Miraj Cinemas",
        "location": "Delhi",
        "screens": 2,
        "facilities": ["Budget Friendly", "Online Booking"]
    }
]

const Theatres = () => {
    return <>
        <Header2/>
    </>
}

export default Theatres;