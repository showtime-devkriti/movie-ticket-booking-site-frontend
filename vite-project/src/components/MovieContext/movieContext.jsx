import React, { createContext, useContext, useState, useEffect } from "react";

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
    const [data, setData] = useState(() => {
        try {
            const stored = localStorage.getItem("movie");
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            console.error("Failed to parse localStorage movie data:", e);
            return [];
        }
    });

    const [theatreData, setTheatreData] = useState(() => {
        try {
            const stored = localStorage.getItem("theatre");
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            console.error("Failed to parse localStorage movie data:", e);
            return [];
        }
    });

    useEffect(() => {
        if (data) localStorage.setItem("movie", JSON.stringify(data));
        if (theatreData) localStorage.setItem("theatre", JSON.stringify(theatreData));
    }, [data, theatreData]);

    return (
        <MovieContext.Provider value={{ data, setData, theatreData, setTheatreData }}>
            {children}
        </MovieContext.Provider>
    );
};

export const useMovieContext = () => useContext(MovieContext);