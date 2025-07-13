import React, { useState, useEffect } from "react";
import './Details_Banner.css';
import { FaPlay } from "react-icons/fa";

const Details_Banner = ({ data }) => {
    return (
        <>
            <div className="details-banner-container">
                <div className="details-banner-front">
                    <img src={data?.posterurl}></img>
                    <div className="front-info">
                        <h1>{data?.title}</h1>

                        <div className="btn">
                            <button>Watch trailer <FaPlay size={20} /></button>
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