import React from "react";
import "./Theatres.css"
import TheatreCard from "./TheatreCard";
import Header from "../About-components/About_Header";
import Footer from "../Footer";
import { IoIosSearch } from "react-icons/io";
import { FaMapLocationDot } from "react-icons/fa6";

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

const Search = () => {
    return <div className="search-wrapper">
        <div className="search-bar-container">
            <span><IoIosSearch size={25} /></span>
            <div className="search-input">
                <input type="text" placeholder="Search for movies and theaters" ></input>
            </div>
        </div>
    </div>
}

const Theatres = () => {
    return <>
        <Header />
        <div className="movie-container">
            <div className="h">
                <h1 className="theatre-heading">All Theatres</h1>
                <div className="search-div">
                    <Search />
                </div>
                <div className="location">
                    <FaMapLocationDot />
                    <p>Location</p>
                </div>
            </div>
            <div className="list">
                <TheatreCard />
                <TheatreCard />
                <TheatreCard />
                <TheatreCard />
            </div>
        </div>
        <Footer />
    </>
}

export default Theatres;