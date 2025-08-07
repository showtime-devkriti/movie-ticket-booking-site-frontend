import React, { useState, useEffect } from "react";
import './Details_Banner.css';
import { FaPlay } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom"

const Details_Banner = ({ data, isOnScreen }) => {
    const convert = () => {
        let screenTime = parseInt(data?.runtime);
        const hrs = Math.floor(screenTime / 60);
        const min = screenTime % 60
        return `${hrs}hr ${min}min`
    }
    
    const [isSmall, setIsSmall] = useState(window.innerWidth <= 800);

    useEffect(() => {


        const handleResize = () => {
            setIsSmall(window.innerWidth <= 800);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            <div className="details-banner-container">
                <div className="details-banner-front">
                    <img src={data?.poster_url}></img>
                    <div className="front-info">
                        <h1>{data?.title}</h1>
                        <div className="format">
                            {data?.format?.map((item, index) => (
                                <span key={index}>
                                    {item}{index !== data.format.length - 1 ? ', ' : ''}
                                </span>
                            ))}
                        </div>
                        <div className="horizontal">
                            <div className="language">
                                {data?.languages?.map((item, index) => (
                                    <span key={index}>
                                        {item}{index !== data.languages.length - 1 ? ', ' : ''}
                                    </span>
                                ))}
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
                        </div>
                        <div className="rating">
                            <FaStar size={20} />
                            {data?.rating.toFixed(1)}/10
                        </div>
                        {data?.trailer_url[0] ?
                            (<div className="btn">
                                <a href={data?.trailer_url[0]} target="_blank"><button>Watch trailer <FaPlay size={20} /></button></a>
                                {isOnScreen && <Link to={`/book-tickets?id=${data?.imdb_id}`}><button>Book tickets</button></Link>}
                            </div>) :
                            (<div className="btn">
                                {isOnScreen && <Link to={`/book-tickets?id=${data?.imdb_id}`}><button>Book tickets</button></Link>}
                            </div>)}
                    </div>
                </div>
                <div className="back-container">
                    <div className="details-banner-back" style={{
                        backgroundImage: `url(${data?.backdrop_url})`,
                    }}>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Details_Banner;