import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchResults.css";

const MovieResult = ({ id, title, posterurl }) => {
    const navigate = useNavigate();

    const onResultClick = () => {
        //navigate(`/movies?id=${id}`);
    }

    return <div className="result-item" onClick={() => onResultClick(title)}>
        <div className="pos" style={{ backgroundImage: `url(${posterurl})` }}></div>
        <p className="title">{title}</p>
    </div>
}

const TheatreResult = ({ _id, location, theatretitle }) => {
    const navigate = useNavigate();

    const onResultClick = () => {
        navigate(`/theatre?id=${_id}`);
    }

    return <div className="theatre-result" onClick={() => onResultClick(theatretitle)}>
        <div className="pos" style={{ backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRElPSPvGXZfVX9nOpPaV6TYfJmzhbx_2jmaQ&s)` }}></div>
        <div className="details">
            <p className="title">{theatretitle}</p>
            <p className="location">{location}</p>
        </div>
    </div>
}

const SearchResults = ({ movies }) => {
    const movieResultsRef = useRef(null);
    const theatreResultsRef = useRef(null);

    useEffect(() => {
        //console.log(movies)
        if (movieResultsRef.current) {
            movieResultsRef.current.scrollTop = 0;
        }
        if (theatreResultsRef.current) {
            theatreResultsRef.current.scrollTop = 0;
        }
    }, [movies]);

    return (
        <>
            <div className="result-container">
                <div className={`movie ${movies?.length ? "" : "hidden"}`}>Movies</div>
                <div ref={movieResultsRef} className={`results-list movies ${movies?.length ? "" : "hidden"}`}>
                    {movies?.map((result, index) => {
                        return <MovieResult key={index} {...result} />
                    })}
                </div>
                {/* <div className={`Theatre ${results?.theatres?.length ? "" : "hidden"}`}>Theatres</div>
                <div ref={theatreResultsRef} className={`results-list theatres ${results?.theatres?.length ? "" : "hidden"}`}>
                    {results?.theatres?.map((result, index) => {
                        return <TheatreResult key={index} {...result} />
                    })}
                </div> */}
            </div>
        </>
    );
}

export default SearchResults;