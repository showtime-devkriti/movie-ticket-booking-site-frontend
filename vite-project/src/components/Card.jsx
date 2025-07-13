import React from 'react';
import './Card.css';
import { Link } from 'react-router-dom';

const Card = ({id, posterurl, title}) => {
    return (
        <>
            <div className="moviecard">
                <Link to={`/details?id=${id}`}>
                    <img src={posterurl}></img>
                    <div className="moviecard-info">
                        <div className="moviecard-title">{title}</div>
                        <div className="moviecard-details">Action | Telugu</div>
                    </div>
                </Link>
            </div>
        </>
    );
};

export default Card;