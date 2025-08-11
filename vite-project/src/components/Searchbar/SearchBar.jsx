import React from "react";
import { useState, useEffect, useCallback } from "react";
import { IoIosSearch } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import "./SearchBar.css"
import SearchResults from "./SearchResults";
import api from "../getData";
import Cookies from "js-cookie"

function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

const SearchBar = () => {
    const [input, setInput] = useState("");
    const [movies, setMovies] = useState([]);
    const [theatres, setTheatres] = useState([]);
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [language, setLanguage] = useState('English');
    const debouncedQuery = useDebounce(input, 500);

    useEffect(() => {
        if (!debouncedQuery) {
            setMovies([]);
            setTotalPages(0);
            return;
        }

        const fetchFirstPage = async () => {
            console.log(`NEW SEARCH for '${debouncedQuery}' in ${language}.`);
            setIsLoading(true);
            setError(null);
            setCurrentPage(1); // Reset to page 1 for a new search

            try {
                const response = await api.getAllMovies(debouncedQuery, language, 1);
                setMovies(response.results);
                console.log(response, language)
                setTotalPages(response.totalPages);
            } catch (err) {
                setError('Failed to fetch movies.');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFirstPage();
    }, [debouncedQuery, language]);

    const handleLoadMore = useCallback(async () => {
        if (currentPage >= totalPages || isLoading) {
            return; // Don't load more if it's the last page or already loading
        }

        console.log(`🔄 Loading page ${currentPage + 1}...`);
        setIsLoading(true);
        setError(null);

        try {
            const response = await api.getAllMovies(debouncedQuery, language, currentPage + 1);
            // Append new results to the existing list
            setMovies(prevMovies => [...prevMovies, ...response.results]);
            setCurrentPage(prevPage => prevPage + 1);
        } catch (err) {
            setError('Failed to load more movies.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [isLoading, currentPage, totalPages, debouncedQuery, language]);

    const theatreSearch = async (query) => {
        const token = Cookies.get("token")
        if (query) {
            //console.log(query, token)
            const res = await fetch(`http://localhost:3000/api/theatres/alltheatres?search=${query}`, {
                method: "GET",
                headers: {
                    "authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            if (res.ok) {
                const data = await res.json();
                //console.log(data);
                setTheatres(data);
            }
        } else {
            setTheatres([]);
        }
    }

    const handleInputChange = (e) => {
        const language = localStorage.getItem("language")
        setLanguage(language)
        if (location.pathname === "/home") {
            setInput(e.target.value);
            theatreSearch(e.target.value)
        } else if (location.pathname === "/movies" || location.pathname === "/") {
            setInput(e.target.value);
        }
    };

    return <>
        <div className="search-wrapper">
            <div className="search-bar-container">
                <span><IoIosSearch size={25} /></span>
                <div className="search">
                    <input type="text" placeholder="Search for movies and theaters" value={input} onChange={handleInputChange}></input>
                </div>
            </div>
            <SearchResults movies={movies} handleLoadMore={handleLoadMore} theatres={theatres} />
        </div>
    </>
}

export default SearchBar;