import React, { useEffect, useState, useContext } from "react";
import "./Booktickets.css";
import Header2 from "./components/Header2";
import { useMovieContext } from "./components/MovieContext/movieContext";
import axios from "axios";
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
    const [shows, setShows] = useState(null)

    useEffect(() => {
        const token = Cookies.get("token")
        //console.log(data)
        const fetchData = async () => {
            const res = await fetch("http://localhost:3000/api/movies/tt1375666/showtimes?date=2025-07-28",
                {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
            ).then(res => res.json())
            setShows(res)
            //console.log(res)
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
                <div className="book-movie">
                    <img src="https://imgs.search.brave.com/DSBfSKhb2zVFAokqodsgiCcGzkyQLG_7m9n4a5k1zAc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvZW4vdGh1bWIv/MC8wMC9TcGlkZXIt/TWFuX05vX1dheV9I/b21lX3Bvc3Rlci5q/cGcvMjUwcHgtU3Bp/ZGVyLU1hbl9Ob19X/YXlfSG9tZV9wb3N0/ZXIuanBn"></img>
                    <div className="book-movie-info">
                        <h1>Spider-Man: No Way Home</h1>
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