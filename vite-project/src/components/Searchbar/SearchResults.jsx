import React from "react";
import { useState } from "react";
import "./SearchResults.css";

const SearchResults = ({results}) => {

    const onResultClick = (result) => {
        alert(`You clicked on: ${result}`)
    }

    return (
        <>
            <div className={`results-list ${results.length === 0 ? 'hidden' : ''}`}>
                {results.map((result, index) => {
                    return <div className="result-item" key={index} onClick={() => onResultClick(result)}>{result}</div>
                })}
                {/* <div className="result-item">A</div>
                <div className="result-item">B</div>
                <div className="result-item">C</div> */}
            </div>
        </>
    );
}

export default SearchResults;