import React from "react";
import './Detailspage.css';
import Details_Banner from "./components/Details-components/Details_Banner";

const Detailspage = () => {
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
                <h1>Crew</h1>
            </div>
        </>
    );
};

export default Detailspage;