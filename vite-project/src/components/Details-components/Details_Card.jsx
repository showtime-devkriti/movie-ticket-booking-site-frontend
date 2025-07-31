import React, {useState, useEffect} from "react";
import "./Details_Card.css";
import png from "/src/assets/user.png"

const DetailsCard = ({data}) => {
    return (
        <>
            <div className="card-wrapper">
                <img className={data.profile ? "cast-img" : "no-cast-img"} src={data.profile ? data.profile : png} />
                <h4>{data.name}</h4>
            </div>
        </>
    )
} 

//"https://imgs.search.brave.com/UOiHhDR4eYQAAuSTY3Xr7BX3U0SOkqbiPXz1803pLws/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMTkv/ODc5LzE4Ni9zbWFs/bC91c2VyLWljb24t/b24tdHJhbnNwYXJl/bnQtYmFja2dyb3Vu/ZC1mcmVlLXBuZy5w/bmc"

export default DetailsCard