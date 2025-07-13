import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import './Detailspage.css';
import Details_Banner from "./components/Details-components/Details_Banner";
import Card from "./components/Details-components/Card";

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
                setData(result.movie);
                console.log("Fetched details:", result.movie);
            } catch (err) {
                console.error("Failed to fetch details:", err);
            }
        };

        if (id) fetchData();
    }, [id]);

    return (
        <>
            {data && <Details_Banner data={data} />}
            <div className="detailspage-details">
                <h1>Overview</h1>
                <span>
                    {data?.description?.length > 0 ? data.description : "No description available."}
                </span>
                <h1>Cast</h1>
                <div className="cast">
                    {data?.cast?.length > 0 ? (
                        data.cast.map((item, index) => (
                            <Card key={index} name={item} />
                        ))
                    ) : (
                        <p>No cast available.</p>
                    )}
                </div>
                <h1>Crew</h1>
                <div className="crew">
                    {data?.crew?.length > 0 ? (
                        data.crew.map((item, index) => (
                            <Card key={index} name={item} />
                        ))
                    ) : (
                        <p>No crew available.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Detailspage;
