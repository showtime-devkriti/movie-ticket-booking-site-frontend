import React, {useState, useEffect} from "react";
import "./Card.css";

const Card = ({name}) => {
    return (
        <>
            <div className="card-wrapper">
                <img className="cast-img" src="https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/vishnu-manchu-1047492-16-03-2021-01-47-03.jpg" alt={name}/>
                <h4>{name}</h4>
                <p></p>
            </div>
        </>
    )
} 

export default Card