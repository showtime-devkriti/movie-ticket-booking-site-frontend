import React, { useState, useEffect, useRef } from "react";
import "./Movies.css"
import MoviesCard from "./MoviesCard";
import Header2 from "../About-components/About_Header";
import { IoIosSearch } from "react-icons/io";
import Footer from "../Footer";
import api from "../getData"
import GenreDropDown from "./Genre/GenreDropDown";
import LanguageDropDown from "./Language/LanguageDropDown";

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
    const divRef = useRef(null);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        if (divRef.current) {
            setWidth(divRef.current.offsetWidth);
        }
    }, []);

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