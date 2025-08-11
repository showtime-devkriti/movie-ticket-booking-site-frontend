import React, { useState, useEffect, useRef } from "react";
import "./Theatres.css"
import TheatreCard from "./TheatreCard";
import Header from "../About-components/About_Header";
import Footer from "../Footer";
import { IoIosSearch } from "react-icons/io";
import { FaMapLocationDot } from "react-icons/fa6";
import LocationDropDown from "./Location/LocationDropDown";
import Cookies from "js-cookie"

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

const Search = ({ theatreSearch }) => {
    const [input, setInput] = useState("")

    const handler = (e) => {
        const value = e.target.value;
        setInput(value)
        theatreSearch(value)
    }

    return <div className="search-wrapper">
        <div className="search-bar-container">
            <span><IoIosSearch size={25} /></span>
            <div className="search-input">
                <input type="text" placeholder="Search for movies and theaters" value={input} onChange={handler} ></input>
            </div>
        </div>
    </div>
}

const Theatres = () => {
    const divRef = useRef(null);
    const [width, setWidth] = useState(0)
    const [location, setLocation] = useState("Hyderabad")
    const [theatres, setTheatres] = useState(null)

    useEffect(() => {
        if (divRef.current) {
            setWidth(divRef.current.offsetWidth);
        }

        theatreSearch("")
    }, []);

    useEffect(() => {
        console.log(theatres)
    }, [theatres])

    const theatreSearch = async (query) => {
        const token = Cookies.get("token")

        if (!token) {
            navigate("/")
        }

        console.log(query)
        const res = await fetch(`http://localhost:3000/api/theatres/alltheatres?search=${query}&location=${location}`, {
            method: "GET",
            headers: {
                "authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            credentials: "include"
        });
        if (res.ok) {
            const data = await res.json();
            //console.log(data);
            setTheatres(data);
        }
    }

    return <>
        <Header />
        <div className="movie-container">
            <div className="h">
                <h1 className="theatre-heading">All Theatres</h1>
                <div className="search-div">
                    <Search theatreSearch={theatreSearch} />
                </div>
                <div className="language-filter" ref={divRef}>
                    <LocationDropDown width={width} setLocation={setLocation} location={location} />
                </div>
            </div>
            <div className="list">
                {theatres?.map((theatre, i) => (
                    <TheatreCard key={i} {...theatre} />
                ))}
            </div>
        </div>
        <Footer />
    </>
}

export default Theatres;