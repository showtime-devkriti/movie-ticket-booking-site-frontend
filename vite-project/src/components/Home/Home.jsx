import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"
import "./Home.css";
import Footer from "../Footer";
import Card from "../Card";
import Banner from "../Banner";
import Header2 from "../Header2"

const Home = () => {
    const [data, setData] = useState({ recommended: [] });
    const [error, setError] = useState(null);
    const navigate = useNavigate()

    

    useEffect(() => {
        const token = Cookies.get("token")
        
        if (!token) navigate("/")

        const fetchData = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/home", {
                    method: "GET",
                    headers: {
                        "authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                });

                if (!res.ok) {
                    throw new Error(`Error: ${res.status} ${res.statusText}`);
                }

                const result = await res.json();
                setData(result); // JSON is already parsed
                console.log("Fetched data:", result);
            } catch (err) {
                console.error("Failed to fetch data:", err);
                setError(err.message);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {

    })

    return (
        <>
            <Header2 />
            <Banner data={data.banners} />
            <div className="showing"><h1>Now Showing</h1></div>
            <div className="display-cards">
                {data.recommended && data.recommended.map((item, index) => (
                    <Card key={index} {...item} />
                ))}
            </div>
            <Footer />
        </>
    );
};

export default Home;
