import React from 'react';
import './Card.css';
import { Link } from 'react-router-dom';
import { FaStar } from "react-icons/fa";

const Card = ({ genre, id, language, posterurl, rating, title }) => {
    const limitedArray = genre.slice(0, 3);
    return (
        <>
            <div className="moviecard">
                <Link to={`/movies?id=${id}`}>
                    <img src={posterurl}></img>
                    <div className="moviecard-info">
                        <div className="moviecard-title">{title}</div>
                        <div className="moviecard-details">
                            <div className='vertical'>
                                <div className="language">
                                    {language?.map((item, index) => (
                                        <span key={index}>
                                            {item}{index !== language.length - 1 ? ', ' : ''}
                                        </span>
                                    ))}
                                </div>
                                <div className="genre">
                                    {genre?.slice(0, 3)?.map((item, index) => (
                                        <span key={index}>
                                            {item}{index !== genre?.slice(0, 3)?.length - 1 ? ', ' : ''}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="rating">
                                <FaStar size={20} />
                                {rating.toFixed(1)}
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </>
    );
};

export default Card;