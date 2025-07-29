// context/DropdownContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
    const [data, setData] = useState(() => {
        const stored = localStorage.getItem("movie");
        return stored ? JSON.parse(stored) : [];
    })

    useEffect(() => {
        localStorage.setItem("movie", JSON.stringify(data));
    }, [data]);

    return (
        <MovieContext.Provider value={{ data, setData }}>
            {children}
        </MovieContext.Provider>
    );
};

export const useMovieContext = () => useContext(MovieContext);
