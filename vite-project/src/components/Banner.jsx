import React, { useState } from 'react';
import './Banner.css';
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

const Banner = () => {
    const images = ["https://assets-in.bmscdn.com/iedb/movies/images/mobile/listing/xxlarge/kannappa-et00377025-1750744616.jpg", "https://assets-in.bmscdn.com/iedb/movies/images/mobile/listing/xxlarge/f1-the-movie-et00403839-1750674185.jpg"];

    const [index, setIndex] = useState(0);

    const handlePrev = () => {
        setIndex((prev) => (prev === 0 ? images.length-1 : prev-1));
        console.log(index);
    };

    const handleNext = () => {
        setIndex((next) => (next === images.length-1 ? 0 : next+1));
        console.log(index);
    };

    return (
        <>
            <div className="banner-container">
                <div className="image">
                    <img src={images[index]} alt="img" />
                </div>
                <div className="banner-icons">
                    <MdKeyboardArrowLeft size={100} onClick={handlePrev} />
                    <MdKeyboardArrowRight size={100} onClick={handleNext} />
                </div>
                <div className="button">
                    <button>Explore</button>
                </div>
            </div>
        </>
    );
};

export default Banner;