import React, {useState, useEffect} from "react";
import "./Movies.css"
import MoviesCard from "./MoviesCard";
import Header2 from "../About-components/About_Header";
import { IoIosSearch } from "react-icons/io";
import Footer from "../Footer";
import api from "../getData"
import { IoLanguage } from "react-icons/io5";
import { FaTheaterMasks } from "react-icons/fa";

const data = [
    {
        "id": 1,
        "title": "Inception",
        "genre": "Sci-Fi",
        "releaseDate": "2010-07-16",
        "rating": 8.8,
        "poster": "https://image.tmdb.org/t/p/w500/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg",
        "cast": ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"],
        "director": "Christopher Nolan",
        "duration": "148 min"
    },
    {
        "id": 2,
        "title": "The Dark Knight",
        "genre": "Action",
        "releaseDate": "2008-07-18",
        "rating": 9.0,
        "poster": "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        "cast": ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
        "director": "Christopher Nolan",
        "duration": "152 min"
    },
    {
        "id": 3,
        "title": "Interstellar",
        "genre": "Adventure",
        "releaseDate": "2014-11-07",
        "rating": 8.6,
        "poster": "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        "cast": ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
        "director": "Christopher Nolan",
        "duration": "169 min"
    },
    {
        "id": 4,
        "title": "Avengers: Endgame",
        "genre": "Superhero",
        "releaseDate": "2019-04-26",
        "rating": 8.4,
        "poster": "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
        "cast": ["Robert Downey Jr.", "Chris Evans", "Scarlett Johansson"],
        "director": "Anthony Russo, Joe Russo",
        "duration": "181 min"
    }
]


const Search = () => {
    return <div className="search-wrapper">
        <div className="search-bar-container">
            <span><IoIosSearch size={25} /></span>
            <div className="search-input">
                <input type="text" placeholder="Search for movies and theaters" ></input>
            </div>
        </div>
    </div>
}

const Movies = () => {
    useEffect(() => {
        api.getallmovies()
    }, [])

    return <>
        <Header2 />
        <div className="movie-container">
            <div className="h">
                <h1 className="movies-heading">All Movies</h1>
                <div className="search-div">
                    <Search />
                </div>
                <div className="filters">
                    <div className="language-filter">
                        <IoLanguage size={30}/>
                        <div>Language</div>
                    </div>
                    <div className="genre-filter">
                        <FaTheaterMasks size={30}/>
                        <div>Genre</div>
                    </div>
                </div>
            </div>
            <div className="list">
                {data?.map((movie, index) => (
                    <MoviesCard key={index} {...movie}/>
                ))}
            </div>
        </div>
        <Footer />
    </>
}

export default Movies;