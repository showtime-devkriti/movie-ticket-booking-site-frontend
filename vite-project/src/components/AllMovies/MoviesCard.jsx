import React from "react";
import "./MoviesCard.css";

const MoviesCard = ({id, title, rating, poster, duration, genre}) => {
    return <>
        <div className="card-container">
            <div className="movie-logo" style={{backgroundImage: `url(${poster})`}}/>
            <div className="details">
                <div className="title">{title}</div>
                <div className="language">Telugu</div>
                <div className="genre">{genre}</div>
                <div className="rating">{rating}/10</div>
            </div>
        </div>
    </>
}

export default MoviesCard;