import React, { useState, useEffect, useRef, useCallback } from "react";
import "./Movies.css";
import MoviesCard from "./MoviesCard";
import Header2 from "../About-components/About_Header";
import { IoIosSearch } from "react-icons/io";
import Footer from "../Footer";
import api from "../getData";
import GenreDropDown from "./Genre/GenreDropDown";
import LanguageDropDown from "./Language/LanguageDropDown";

// The useDebounce hook is fine as is, no changes needed.
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

// 1. SIMPLIFY THE SEARCH COMPONENT
// It only needs to manage its own input and report changes.
const Search = ({ query, onQueryChange }) => {
    return (
        <div className="search-wrapper">
            <div className="search-bar-container">
                <span><IoIosSearch size={25} /></span>
                <div className="search-input">
                    {/* CORRECTED: Use onChange and make it a controlled component */}
                    <input
                        type="text"
                        placeholder="Search for movies..."
                        value={query}
                        onChange={(e) => onQueryChange(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};

const Movies = () => {
    const divRef = useRef(null);
    const [width, setWidth] = useState(0);
    const [movies, setMovies] = useState([]);
    const [input, setInput] = useState("");
    const [language, setLanguage] = useState('English');
    const [genre, setGenre] = useState(''); 
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const debouncedQuery = useDebounce(input, 500);

    useEffect(() => {
        if (divRef.current) {
            setWidth(divRef.current.offsetWidth);
        }
    }, []);

    
    useEffect(() => {
        const fetchMovies = async () => {
            console.log(`🚀 New Fetch Triggered | Query: "${debouncedQuery}", Lang: ${language}, Genre: ${genre}`);
            setIsLoading(true);
            setError(null);
            setCurrentPage(1); 

            try {
                const response = await api.getallmovies(debouncedQuery, language, genre, 1);
                setMovies(response.results);
                setTotalPages(response.totalPages);
            } catch (err) {
                setError('Failed to fetch movies.');
                console.error(err);
                setMovies([]); 
                setTotalPages(0);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMovies();
    }, [debouncedQuery, language, genre]);

    const handleLoadMore = useCallback(async () => {
        if (currentPage >= totalPages || isLoading) {
            return; 
        }

        console.log(`🔄 Loading page ${currentPage + 1}...`);
        setIsLoading(true);
        setError(null);

        try {
            const response = await api.getallmovies(debouncedQuery, language, genre, currentPage + 1);
            setMovies(prevMovies => [...prevMovies, ...response.results]);
            setCurrentPage(prevPage => prevPage + 1);
        } catch (err) {
            setError('Failed to load more movies.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [currentPage, totalPages, debouncedQuery, language, genre, isLoading]);

    useEffect(() => {console.log(movies)}, [movies])

    return (
        <>
            <Header2 />
            <div className="movie-container">
                <div className="h">
                    <h1 className="movies-heading">All Movies</h1>
                    <div className="search-div">
                        <Search query={input} onQueryChange={setInput} />
                    </div>
                    <div className="filters">
                        <div className="language-filter" ref={divRef}>
                            <LanguageDropDown width={width} setLanguage={setLanguage} language={language} />
                        </div>
                        <div className="genre-filter">
                            <GenreDropDown width={width} setGenre={setGenre} genre={genre} />
                        </div>
                    </div>
                </div>

                <div className="list">
                    {movies?.map((movie, i) => (<MoviesCard key={i} {...movie} />))}
                </div>

                {isLoading && <p>Loading...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {!isLoading && currentPage < totalPages && (
                    <button onClick={handleLoadMore} className="load-more-btn">
                        Load More
                    </button>
                )}
            </div>
            <Footer />
        </>
    );
};

export default Movies;