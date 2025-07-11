import React from "react";
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import "./SearchBar.css"
import SearchResults from "./SearchResults";

const sampleData = [
    "Inception",
    "Interstellar",
    "The Dark Knight",
    "Oppenheimer",
    "Avatar",
    "Avengers: Endgame",
    "Spider-Man: No Way Home",
    "PVR Cinemas - Hyderabad",
    "INOX GVK One Mall",
    "Cinepolis - Kukatpally",
  ];

const SearchBar = () => {
    const [input, setInput] = useState("");
    const [results, setResults] = useState([]);

    const handleSearch = (query) => {
        const filtered = sampleData.filter((item) => {
            return query && item.toLowerCase().includes(query.toLowerCase())
        });

        setResults(filtered);
        //console.log(filtered)
    }

    const handleInputChange = (e) => {
        handleSearch(e.target.value);
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