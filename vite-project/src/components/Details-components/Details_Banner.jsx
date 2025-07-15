import React, { useState, useEffect } from "react";
import './Details_Banner.css';
import { FaPlay } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

const Details_Banner = ({ data }) => {
    const convert = () => {
        let screenTime = parseInt(data?.runtime);
        const hrs = Math.floor(screenTime/60);
        const min = screenTime%60
        return `${hrs}hr ${min}min`
    }

    return (
        <>
            <div className="details-banner-container">
                <div className="details-banner-front">
                    <img src={data?.posterurl}></img>
                    <div className="front-info">
                        <h1>{data?.title}</h1>
                        <div className="format">
                            {data?.format?.map((item,index) => (
                                <span key={index}>
                                    {item}{index !== data.format.length-1 ? ', ' : ''}
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
                                {data?.genre?.map((item, index) => (
                                    <span key={index}>
                                        {item}{index !== data.genre.length - 1 ? ', ' : ''}
                                    </span>
                                ))}
                            </div>
                            <div className="runtime">
                                {convert()}
                            </div>
                        </div>
                        <div className="rating">
                            <FaStar size={20}/>
                            {data?.rating.toFixed(1)}/10
                        </div>
                        <div className="btn">
                            <a href={data?.trailerurl} target="_blank"><button>Watch trailer <FaPlay size={20} /></button></a>
                            <button>Book tickets</button>
                        </div>
                    </div>
                </div>
                <div className="back-container">
                    <div className="details-banner-back" style={{
                        backgroundImage: `url(${data?.backdropurl})`,
                    }}>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Details_Banner;