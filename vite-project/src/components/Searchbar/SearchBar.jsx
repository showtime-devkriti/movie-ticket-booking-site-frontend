import React from "react";
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import "./SearchBar.css"
import SearchResults from "./SearchResults";

const SearchBar = () => {
    const [input, setInput] = useState("");
    const [results, setResults] = useState([]);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    return <>
        <div className="search-wrapper">
            <div className="search-bar-container">
                <span><IoIosSearch size={25} /></span>
                <div className="search">
                    <input type="text" placeholder="Search for movies and theaters" value={input} onChange={handleInputChange}></input>
                </div>
            </div>
            <SearchResults results={results}/>
        </div>
    </>
}

export default SearchBar;