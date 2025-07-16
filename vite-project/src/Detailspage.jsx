import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import './Detailspage.css';
import Details_Banner from "./components/Details-components/Details_Banner";
import DetailsCard from "./components/Details-components/Details_Card";


const MovieCard = ({ genre, id, language, posterurl, rating, title }) => {
    return (
        <>
            <div className="moviecard">
                <Link to={`/movies?id=${id}`}>
                    <img src={posterurl}></img>
                    <div className="moviecard-info">
                        <div className="moviecard-title">{title}</div>
                        <div className="moviecard-details">
                            <div className="language">
                                {language?.map((item, index) => (
                                    <span key={index}>
                                        {item}{index !== language.length - 1 ? ', ' : ''}
                                    </span>
                                ))}
                            </div>
                            <div className="genre">
                                {genre?.slice(0, 3)?.map((item, index) => (
                                    <span key={index}>
                                        {item}{index !== genre?.slice(0, 2)?.length - 1 ? ', ' : ''}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </>
    );
};


const Detailspage = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const [data, setData] = useState(null); // Initialize with null or {}

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/movies/${id}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                });

                if (!res.ok) {
                    throw new Error(`Error: ${res.status} ${res.statusText}`);
                }

                const result = await res.json();
                setData(result);
                console.log("Fetched details:", result);
            } catch (err) {
                console.error("Failed to fetch details:", err);
            }
        };

        if (id) fetchData();
    }, [id]);

    return (
        <>
            {data && <Details_Banner data={data.movie} />}
            <div className="detailspage-details">
                <h1>Description</h1>
                <span>
                    {data?.description?.length > 0 ? data.description : "No description available."}
                </span>
                <h1>Cast</h1>
                <div className="cast">
                    {data?.cast?.length > 0 ? (
                        data.cast.map((item, index) => (
                            <DetailsCard key={index} name={item} />
                        ))
                    ) : (
                        <p>No cast available.</p>
                    )}
                </div>
                <h1>Crew</h1>
                <div className="crew">
                    {data?.crew?.length > 0 ? (
                        data.crew.map((item, index) => (
                            <DetailsCard key={index} name={item} />
                        ))
                    ) : (
                        <p>No crew available.</p>
                    )}
                </div>
                <div className="display-cards">
                    {data?.moviesYouAlsoLike?.map((item, index) => (
                        <MovieCard key={index} {...item} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Detailspage;
