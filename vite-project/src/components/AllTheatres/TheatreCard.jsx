import React, { useEffect, useState } from "react";
import "./TheatreCard.css";
import { GrLocationPin } from "react-icons/gr";

const TheatreCard = ({ theatretitle, location, address, _id }) => {
    const [shows, setShows] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:3000/api/theatres/${_id}/showtimes`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
            const result = await response.json()
            if(response.ok){
                console.log(result)
                setShows(result)
            }
        }

        fetchData()
    }, [])

    return <>
        <div className="th-wrapper">
            <div className="theatre-details">
                <div className="theatre-title">{theatretitle} : {location}</div>
                <div className="theatre-location">
                    <GrLocationPin />
                    <p>{address}</p>
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