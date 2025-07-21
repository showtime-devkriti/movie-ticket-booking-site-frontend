import React, {useState, useEffect} from "react";
import "./Details_Card.css";

const DetailsCard = ({data}) => {
    return (
        <>
            <div className="card-wrapper">
                <img className="cast-img" src={data.profile ? data.profile : "https://imgs.search.brave.com/UOiHhDR4eYQAAuSTY3Xr7BX3U0SOkqbiPXz1803pLws/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMTkv/ODc5LzE4Ni9zbWFs/bC91c2VyLWljb24t/b24tdHJhbnNwYXJl/bnQtYmFja2dyb3Vu/ZC1mcmVlLXBuZy5w/bmc"} />
                <h4>{data.name}</h4>
            </div>
        </>
    )
} 

export default DetailsCard