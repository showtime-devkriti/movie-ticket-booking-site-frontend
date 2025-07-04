import React from 'react';
import './Card.css';

const Card = () => {
    return (
        <>
            <div className="card">
                <img src="https://assetscdn1.paytm.com/images/cinema/poster_0013_Kannapa4-4bcb5160-50f9-11f0-9951-6bd98bb9c412.jpg"></img>
                <div className="card-info">
                    <div className="card-title">Kannappa</div>
                    <div className="card-details">Action | Telugu</div>
                </div>
            </div>
        </>
    );
};

export default Card;