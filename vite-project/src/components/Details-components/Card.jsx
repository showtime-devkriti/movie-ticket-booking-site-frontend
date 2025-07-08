import React from "react";
import "./Card.css";

const Card = ({cast}) => {
    return (
        <>
            <div className="card-wrapper">
                <img className="cast-img" src={cast.image} alt={cast.name}/>
                <h4>{cast.name}</h4>
                <p>{cast.role}</p>
            </div>
        </>
    )
} 

export default Card