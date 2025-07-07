import React from "react";
import "./Card.css";

const Card = ({image, role, name}) => {
    return (
        <>
            <div className="card-wrapper">
                <img className="cast-img" src={image} alt={name}/>
                <h4>{name}</h4>
                <p>{role}</p>
            </div>
        </>
    )
} 

export default Card