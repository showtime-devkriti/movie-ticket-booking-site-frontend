import React from "react";
import "./MoviesCard.css";
import { FaStar } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const MoviesCard = ({genre, id, poster_url, rating, title}) => {
    const navigate = useNavigate()

    const handler = () => {
        navigate(`/movies?id=${id}`)
    }

    return <>
        <div className="all-moviecard" onClick={handler}>
            <img src={poster_url}></img>
            <div className="moviecard-info">
                <div className="moviecard-title">{title}</div>
                <div className="moviecard-details">
                    <div className='vertical'>
                        <div className="language">
                            Telugu
                        </div>
                        <div className="genre">
                            Action
                        </div>
                    </div>
                    <div className="rating">
                        <FaStar size={20} />
                        {rating.toFixed(1)}
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default MoviesCard;