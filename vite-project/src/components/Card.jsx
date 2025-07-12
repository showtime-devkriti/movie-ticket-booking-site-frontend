import React from 'react';
import './Card.css';
import { Link } from 'react-router-dom';

const Card = ({image, title, details}) => {
    return (
        <>
            <div className="moviecard">
                <Link to="/details">
                    <img src="https://assetscdn1.paytm.com/images/cinema/poster_0013_Kannapa4-4bcb5160-50f9-11f0-9951-6bd98bb9c412.jpg"></img>
                    <div className="moviecard-info">
                        <div className="moviecard-title">Kannappa</div>
                        <div className="moviecard-details">Action | Telugu</div>
                    </div>
                </Link>
            </div>
        </>
    );
};

export default Card;