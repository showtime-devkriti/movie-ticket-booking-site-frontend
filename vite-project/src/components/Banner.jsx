import React, { useState } from 'react';
import './Banner.css';
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const Banner = ({ data }) => {
    //const images = ["https://assets-in.bmscdn.com/iedb/movies/images/mobile/listing/xxlarge/kannappa-et00377025-1750744616.jpg", "https://assets-in.bmscdn.com/iedb/movies/images/mobile/listing/xxlarge/f1-the-movie-et00403839-1750674185.jpg"];
    const images = data && data.map(item => item.backdropurl);
    const [curr, setIndex] = useState(0);
    const navigate = useNavigate();

    const handlePrev = () => {
        setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

    };

    const handleNext = () => {
        setIndex((next) => (next === images.length - 1 ? 0 : next + 1));

    };

    const explore = () => {
        const id = data[curr].id
        if (id) navigate(`/details?id=${id}`)
    }

    return (
        <>
            <div className="banner-container">
                <div className="image">
                    <div
                        className="slider-track"
                        style={{ transform: `translateX(-${curr * 100}%)` }}
                    >
                        {images && images.map((image, index) => (
                            <div
                                key={index}
                                className="slide"
                                style={{ backgroundImage: `url(${image})` }}
                            />
                        ))}
                    </div>
                </div>

                <div className="banner-icons">
                    <MdKeyboardArrowLeft size={100} onClick={handlePrev} />
                    <MdKeyboardArrowRight size={100} onClick={handleNext} />
                </div>
                <div className="button" onClick={explore}>
                    <button>Explore</button>
                </div>
            </div>
        </>
    );
};

export default Banner;