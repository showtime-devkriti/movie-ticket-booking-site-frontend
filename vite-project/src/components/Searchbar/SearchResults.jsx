import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchResults.css";

const ResultDiv = ({ _id, title, posterurl }) => {
    const navigate = useNavigate();

    const onResultClick = () => {
        navigate(`/movies?id=${_id}`);
    }

    return <div className="result-item" onClick={() => onResultClick(title)}>
        
        <div className="pos" style={{ backgroundImage: `url(${posterurl})`}}></div>
        <p className="title">{title}</p>
    </div>
}

const SearchResults = ({ results }) => {
    return (
        <>
            <div className={`results-list ${results?.movies?.length ? "" : "hidden"}`}>
                {results?.movies?.map((result, index) => {
                    return <ResultDiv key={index} {...result} />
                })}
            </div>
        </>
    );
}

export default SearchResults;