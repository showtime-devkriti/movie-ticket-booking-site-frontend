import React from "react";
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import "./SearchBar.css"
import SearchResults from "./SearchResults";
import  getSearchResults  from "../getData";

const SearchBar = () => {
    const [input, setInput] = useState("");
    const [movies, setMovies] = useState([]);
    const location = useLocation();

    const handleSearch = async (query) => {
        const language = localStorage.getItem("language")
        if (location.pathname === "/home" ) {
            if (query) {
                // const res = await fetch(`http://localhost:3000/api/search?query=${query}`, {
                //     method: "GET",
                //     headers: {
                //         "Content-Type": "application/json"
                //     },
                //     credentials: "include"
                // });
                // if (res.ok) {
                //     const data = await res.json();
                //     console.log(data);
                //     setResults(data);
                // }
                getSearchResults(query, language);
            }else {
                setMovies([]);
            }

        } else if (location.pathname === "/movies") {
            if (query) {
                const res = await fetch(`http://localhost:3000/api/movies/allmovies?search=${query}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include"
                });
                if (res.ok) {
                    const data = await res.json();
                    console.log(data);
                    //setResults(data);
                }
            }else {
                //setResults([]);
            }
        }else if (location.pathname === "/theatre") {
            if (query) {
                const res = await fetch(`http://localhost:3000/api/theatres/alltheatres?search=${query}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include"
                });
                if (res.ok) {
                    const data = await res.json();
                    console.log(data);
                    //setResults(data);
                }
            }else {
                //setResults([]);
            }
        }
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
            <SearchResults movies={movies} />
        </div>
    </>
}

export default SearchBar;