import React, { useEffect, useState, useContext } from "react";
import "./Booktickets.css";
import Header2 from "./components/Header2";
import { useMovieContext } from "./components/MovieContext/movieContext";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import Cookies from "js-cookie"

const Show = ({ show }) => {
    const add = (address) => {
        return address.split("-")
    }

    const t = (t) => {
        return t.split("T")[1]
    }

    return <div className="show">
        <div className="theatre-details">
            <h3>{add(show.address)[0]}</h3>
            <h4>{add(show.address)[1]}</h4>
            <div className="lang-format">
            <h4>{show.language}</h4>
            <h4>{show.format}</h4>
            </div>
            <h4>{show.location}</h4>
        </div>
        <div className="screen">
            {show.screenName}
        </div>
        <div className="timings">
            {show?.timings?.map((time, index) => (
                <div key={index}>{t(time)}</div>
            ))}
        </div>
    </div>
}

const Booktickets = () => {
    const { data, setData } = useMovieContext();
    const [shows, setShows] = useState(null);

    const convert = () => {
        let screenTime = parseInt(data?.runtime);
        const hrs = Math.floor(screenTime / 60);
        const min = screenTime % 60
        return `${hrs}hr ${min}min`
    }

    useEffect(() => {
        const token = Cookies.get("token")
        const fetchData = async () => {
            const res = await fetch("http://localhost:3000/api/movies/tt1375666/showtimes?date=2025-07-30",
                {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
            ).then(res => res.json())
            setShows(res)
        }

        fetchData()
    }, [])

    useEffect(() => {
        console.log(shows)
    }, [shows])

    useEffect(() => {
        console.log(data)
    }, [data])

    return (
        <>
            <Header2 />
            <div className="book-tickets-container">
                <div className="book-movie-container">
                <div className="book-movie" style={{
                        backgroundImage: `url(${data?.backdrop_url})`,
                    }}>
                    <img src={data?.poster_url}></img>
                    <div className="book-movie-info">
                        <h1>{data?.title}</h1>
                        <div className="language">
                            Telugu
                        </div>
                        <div className="genre">
                            {data?.genres?.map((item, index) => (
                                <span key={index}>
                                    {item}{index !== data.genres.length - 1 ? ', ' : ''}
                                </span>
                            ))}
                        </div>
                        <div className="runtime">
                            {convert()}
                        </div>
                        <div className="rating">
                            <FaStar size={20} />
                            {data?.rating.toFixed(1)}/10
                        </div>
                        <span>
                            {data?.description?.length > 0 ? data.description : "No description available."}
                        </span>
                    </div>
                </div>
                </div>
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
                    {shows?.map((show, index) => (
                        <Show key={index} show={show} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Booktickets;