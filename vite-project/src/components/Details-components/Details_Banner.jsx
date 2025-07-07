import React from "react";
import './Details_Banner.css';

const Details_Banner = () => {
    return (
        <>
            <div className="details-banner-container">
                <div className="details-banner-front">
                    <img src="https://assetscdn1.paytm.com/images/cinema/poster_0013_Kannapa4-4bcb5160-50f9-11f0-9951-6bd98bb9c412.jpg"></img>
                    <div className="front-info">
                        <h1>Kannappa</h1>
                        <div className="btn">
                            <button>Watch trailer</button>
                            <button>Book tickets</button>
                        </div>
                    </div>
                </div>
                <div className="back-container">
                    <div className="details-banner-back">
                    </div>
                </div>
            </div>
        </>
    );
};

export default Details_Banner;