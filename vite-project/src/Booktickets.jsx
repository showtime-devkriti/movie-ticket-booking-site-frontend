import React, { useEffect, useState, useContext, useCallback } from "react";
import { useSearchParams, Link } from "react-router-dom"
import "./Booktickets.css";
import { useMovieContext } from "./components/MovieContext/movieContext";
import About_Header from "./components/About-components/About_Header";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import Cookies from "js-cookie";

const Screen = ({ screen }) => {
    const t = (t) => {
        const time = t?.split("T")[1]
        const date = t?.split("T")[0]
        const hrs = time.split(":")[0]
        const min = time.split(":")[1]
        if (hrs <= 12) {
            return (`${hrs} : ${min}`)
        }
        else {
            return (`${hrs - 12}:${min}`)
        }
    }

    return <>
        <div className="screen">
            {screen.screenName}
            <div className="timings">
                {screen?.timings?.map((time, index) => (
                    <Link className="link" to={`/seat-layout?id=${time.showid}`} key={index}>{t(time.starttime)}</Link>
                ))}
            </div>
        </div>
    </>
}

const Theatre = ({ show }) => {
    const add = (address) => {
        return address.split("-")
    }


    return <div className="theatre">
        <div className="theatre-details">
            <h3>{add(show.address)[0]}</h3>
            <h4>{add(show.address)[1]}</h4>
            <div className="lang-format">
                <h4>{show.language}</h4>
                <h4>{show.format}</h4>
            </div>
            <h4>{show.location}</h4>
        </div>
        <div className="screens">
            {show?.screens?.map((screen, index) => (
                <Screen key={index} screen={screen} />
            ))}
        </div>
    </div>
}

const Day = ({ date }) => {
    const [split, setSplit] = useState(null)
    useEffect(() => {
        if (date) {
            const [year, month, dat] = date.split("-")
            setSplit({
                year: year,
                month: month,
                date: dat
            })
        }
    }, [date])

    const [year, month, dat] = date?.split("-") || []
    return (
        <>
            <div className="month">{month}</div>
            <div className="date">{dat}</div>
            <div className="day">WED</div>
        </>
    )
}

const Booktickets = () => {
    const { data, setData, theatreData, setTheatreData } = useMovieContext();
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const [dates, setDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState("")

    const convert = () => {
        let screenTime = parseInt(data?.runtime);
        const hrs = Math.floor(screenTime / 60);
        const min = screenTime % 60
        return `${hrs}hr ${min}min`
    }

    const dateSelectHandler = (e) => {
        const date = e.currentTarget.value; 
        //console.log(date)
        setSelectedDate(date);
    }

    const fetchData = useCallback(async (dateToFetch) => {
        if (!dateToFetch || !id) return;
        
        try {
            const token = Cookies.get("token");
            const response = await fetch(`http://localhost:3000/api/movies/${id}/showtimes?date=${dateToFetch}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const resData = await response.json();
            setTheatreData(resData);
            console.log(resData)
        } catch (error) {
            console.error("Failed to fetch showtimes:", error);
            setTheatreData([]); // Clear data on error
        }
    }, [id, setTheatreData]);

    useEffect(() => {
        const newDates = []
        for (let i = 0; i < 5; i++) {
            const currentDate = new Date();
            currentDate.setDate(currentDate.getDate() + i);
            const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
            newDates.push(formattedDate)
        }
        setDates(newDates);
    }, []);

    useEffect(() => {
        if (dates?.length > 0 && !selectedDate) {
            setSelectedDate(dates[0]); // Set the first date as selected
        }
    }, [dates, selectedDate]);

    useEffect(() => {
        //console.log(selectedDate)
        fetchData(selectedDate)
    }, [selectedDate])

    useEffect(() => {
        console.log(theatreData)
    }, [theatreData])

    return (
        <>
            <About_Header />
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
                        </div>
                    </div>
                </div>
                <div className="h-centre">
                    <div className="dates">
                        {dates?.map((date, i) => (
                            <button
                                className={`date-box ${date === selectedDate ? "active" : ""}`} // Add active class
                                onClick={dateSelectHandler}
                                key={i}
                                value={date}
                            >
                                <Day date={date} />
                            </button>
                        ))}
                    </div>
                    <div className="theatres">
                        {theatreData?.map((show, index) => (
                            <Theatre key={index} show={show} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Booktickets;