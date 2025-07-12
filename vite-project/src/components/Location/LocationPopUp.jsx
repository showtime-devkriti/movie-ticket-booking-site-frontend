import React from "react";
import { useState, useEffect } from "react";
import './LocationPopUp.css'
import { IoClose } from "react-icons/io5";

const LocationPopUp = ({ popUpShow, setPopUp, setLocationState}) => {
    useEffect(() => {
        document.body.style.overflow = popUpShow ? 'hidden' : 'auto';
    }, [popUpShow]);

    const [location, setLocation] = useState('')
    const [language, setLanguage] = useState("")

    const onLocationClick = async (value) => {
        //console.log(location)
        setLocation(value)
        try{
            const res = await fetch("http://localhost:3000/api/user/location", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({location: value}),
            })

            const result = await res.json();

            if (res.ok) {
                alert("Location change successful!");
                setLocationState(value);
            } else {
                alert(`Error: ${result.msg || "Location change failed"}`);
            }
        }catch (err) {
            console.error("Location change failed:", err);
            alert("Something went wrong");
        }
    }

    const onLanguClick = async (value) => {
        setLanguage(value)
        try{
            const res = await fetch("http://localhost:3000/api/user/language", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({language: value}),
            })

            const result = await res.json();

            if (res.ok) {
                alert("Language change successful!");
                setPopUp(false);
            } else {
                alert(`Error: ${result.msg || "Language change failed"}`);
            }
        }catch (err) {
            console.error("Language change failed:", err);
            alert("Something went wrong");
        }
    }

    return <>
        <div className={`overlay ${popUpShow ? "" : "hidden"}`}></div>
        <div className={`pop-up-container ${popUpShow ? "" : "hidden"}`} >
            <div className="close-button" onClick={() => setPopUp(false)}>
                <IoClose size={26} />
            </div>
            <div className="location-div">
                <h2>Location</h2>
                <p>Choose your location to get the best experience.</p>
                <div className="location-input">
                    <input type="text" placeholder="Enter your location" value={location} onChange={(e) => setLocation(e.target.value)} required />
                    <button className="location-button" onClick={() => onLocationClick(location)}>Set Location</button>
                </div>
                <div className="location-list">
                    <div onClick={() => onLocationClick("Hyderabad")}>Hyderabad</div>
                    <div onClick={() => onLocationClick("Mumbai")}>Mumbai</div>
                    <div onClick={() => onLocationClick("Delhi")}>Delhi</div>
                    <div onClick={() => onLocationClick("Bangalore")}>Bangalore</div>
                    <div onClick={() => onLocationClick("Chennai")}>Chennai</div>
                    <div onClick={() => onLocationClick("Visakhapatnam")}>Visakhapatnam</div>
                </div>
            </div>
            <div className="language-div">
                <h2>Language</h2>
                <div className="language-input">
                    <input type="text" placeholder="Enter your language" value={language} onChange={(e) => setL(e.target.value)} required />
                    <button className="language-button" onClick={() => onLanguageClick(language)}>Set Language</button>
                </div>
                <div className="language-list">
                    <div onClick={() => onLanguClick("Telugu")}>Telugu</div>
                    <div onClick={() => onLanguClick("Hindi")}>Hindi</div>
                    <div onClick={() => onLanguClick("English")}>English</div>
                </div>
            </div>
        </div>
    </>
}

export default LocationPopUp;