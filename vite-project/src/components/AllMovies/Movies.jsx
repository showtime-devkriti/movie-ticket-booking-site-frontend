import React, { useState, useEffect, useRef, useCallback } from "react";
import "./Movies.css"
import MoviesCard from "./MoviesCard";
import Header2 from "../About-components/About_Header";
import { IoIosSearch } from "react-icons/io";
import Footer from "../Footer";
import api from "../getData"
import GenreDropDown from "./Genre/GenreDropDown";
import LanguageDropDown from "./Language/LanguageDropDown";

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

const Search = ({ language, setMovies, setCurrentPage, setTotalPages, setIsLoading, setInput, debouncedQuery }) => {
    
    const [error, setError] = useState(null);
    

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
                const response = await api.getSearchResults(debouncedQuery, language, 1);
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

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    return <div className="search-wrapper">
        <div className="search-bar-container">
            <span><IoIosSearch size={25} /></span>
            <div className="search-input">
                <input type="text" placeholder="Search for movies and theaters" onClick={handleInputChange}></input>
            </div>
        </div>
    </div>
}

const Movies = () => {
    const divRef = useRef(null);
    const [width, setWidth] = useState(0);
    const [language, setLanguage] = useState('English');
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [input, setInput] = useState("");
    const debouncedQuery = useDebounce(input, 500);

    useEffect(() => {
        if (divRef.current) {
            setWidth(divRef.current.offsetWidth);
        }
    }, []);

    const handleLoadMore = useCallback(async () => {
        if (currentPage >= totalPages || isLoading) {
            return; // Don't load more if it's the last page or already loading
        }

        console.log(`🔄 Loading page ${currentPage + 1}...`);
        setIsLoading(true);
        setError(null);

        try {
            const response = await api.getSearchResults(debouncedQuery, language, currentPage + 1);
            // Append new results to the existing list
            setMovies(prevMovies => [...prevMovies, ...response.results]);
            setCurrentPage(prevPage => prevPage + 1);
        } catch (err) {
            setError('Failed to load more movies.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [currentPage, totalPages, debouncedQuery, language]);

    return <>
        <Header2 />
        <div className="movie-container">
            <div className="h">
                <h1 className="movies-heading">All Movies</h1>
                <div className="search-div">
                    <Search language={language} setInput={setInput} debouncedQuery={debouncedQuery} setMovies={setMovies} setCurrentPage={setCurrentPage} setTotalPages={setTotalPages} setIsLoading={setIsLoading}/>
                </div>
                <div className="filters">
                    <div className="language-filter" ref={divRef}>
                        <LanguageDropDown width={width} />
                    </div>
                    <div className="genre-filter" ref={divRef}>
                        <GenreDropDown width={width} />
                    </div>
                </div>
            </div>
            <div className="list">
                <MoviesCard />
            </div>
        </div>
        <Footer />
    </>
}

export default Movies;