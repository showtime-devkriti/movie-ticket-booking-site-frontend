import React from "react";
import './Detailspage.css';
import Details_Banner from "./components/Details-components/Details_Banner";
import Card from "./components/Details-components/Card";

const Detailspage = () => {
    const cast = {
        image: "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/vishnu-manchu-1047492-16-03-2021-01-47-03.jpg",
        role: "Kannappa",
        name: "Vishnu Manchu"
    }

    return (
        <>
            <Details_Banner />
            <div className="detailspage-details">
                <h1>Overview</h1>
                <span>
                    Kannappa follows Thinnadu, a tribal hunter raised without faith, who discovers a Shiva Lingam in the forest.
                    Guided by instinct, he begins worshipping with raw devotion, eventually offering his own eyes in a supreme act of love and sacrifice.
                    This transforms him into Kannappa, one of Lord Shiva’s greatest devotees.
                </span>
                <h1>Cast</h1>
                <div className="cast">
                    <Card cast={cast} />
                    <Card cast={cast} />
                    <Card cast={cast} />
                    <Card cast={cast} />
                </div>
            </div>
        </>
    );
};

export default Detailspage;