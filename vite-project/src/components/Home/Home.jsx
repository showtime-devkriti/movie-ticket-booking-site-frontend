import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import HomeHeader from "./HomeHeader";
import Footer from '../Footer';
import Card from '../Card';
import Banner from '../Banner';

const Home = () => {
    const [data, setData] = useState([]);
    
    

    async () => {
        const res = await fetch("http://localhost:3000/api/home", {
            credentials: "include",
          });
    }

    return <>
        <HomeHeader/>
        <Banner />
        <div className="showing"><h1>Now Showing</h1></div>
        <div className="display-cards">
            <Card /><Card /><Card /><Card />
            <Card /><Card /><Card /><Card />
        </div>
        <Footer />
    </>
}

export default Home;