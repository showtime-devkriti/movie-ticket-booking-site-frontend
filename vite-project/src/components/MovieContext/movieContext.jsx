// context/DropdownContext.js
import React, { createContext, useContext, useState } from "react";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
    const [data, setData] = useState(null)

    return (
        <MovieContext.Provider value={{ data, setData }}>
            {children}
        </MovieContext.Provider>
    );
};

export const useMovieContext = () => useContext(MovieContext);
