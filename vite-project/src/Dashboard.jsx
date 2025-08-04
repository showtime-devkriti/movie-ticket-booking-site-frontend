import React, { useState, useEffect } from "react";
import './Dashboard.css'
import Sidebar from "./components/Admin-Sidebar/Sidebar";
import { FaLocationDot } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [theatreData, setTheatreData] = useState(null);
    const [screenData, setScreenData] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        const admin = Cookies.get("admin")

        if(!admin) {
            navigate("/admin/login")
        }

        const fetchData = async function () {
            const result = await fetch("http://localhost:3000/api/admin/profile", {
                method: "GET",
                headers: {
                    "authorization": `Bearer ${admin}`,
                     "Content-Type": "application/json" },
                credentials: "include",
            }).then(res => res.json())
            setTheatreData(result?.admin)

            const getScreens = await fetch("http://localhost:3000/api/admin/getscreen", {
                method: "GET",
                headers: {
                    "authorization": `Bearer ${admin}`,
                     "Content-Type": "application/json" },
                credentials: "include",
            }).then(res => res.json())
            console.log(getScreens)
            setScreenData(getScreens)
        }

        fetchData()
    }, [])

    return (
        <>
            <div className="dashboard-wrapper">
                <div className="sidebar-wrapper">
                    <div className="sidebar">
                        <Sidebar />
                    </div>
                </div>
                <div className="dashboard">
                    <h1>{theatreData?.theatretitle} - {theatreData?.location}</h1>
                    <div className="theatre-location">
                        <FaLocationDot size={25} />
                        <p>{theatreData?.address}</p>
                    </div>
                    <h2>Screens</h2>
                    <div className="admin-screens">
                        {screenData?.screens?.map((screen, index) => (
                            <div  key={index}>{screen.screenName}</div>
                        ))}
                    </div>
                    <h2>Movies</h2>
                    <div className="admin-moviecards">
                        <div className="admin-moviecard">
                            <img src="https://image.tmdb.org/t/p/original/khNVygolU0TxLIDWff5tQlAhZ23.jpg"></img>
                            <div className="moviecard-info">
                                <div className="moviecard-title">KGF</div>
                                <div className="moviecard-details">
                                    <div className='vertical'>
                                        <div className="language">
                                            Telugu
                                        </div>
                                        <div className="genre">
                                            Action
                                        </div>
                                    </div>
                                    <div className="rating">
                                        <FaStar size={20} />
                                        9.8
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="admin-moviecard">
                            <img src="https://image.tmdb.org/t/p/original/khNVygolU0TxLIDWff5tQlAhZ23.jpg"></img>
                            <div className="moviecard-info">
                                <div className="moviecard-title">KGF</div>
                                <div className="moviecard-details">
                                    <div className='vertical'>
                                        <div className="language">
                                            Telugu
                                        </div>
                                        <div className="genre">
                                            Action
                                        </div>
                                    </div>
                                    <div className="rating">
                                        <FaStar size={20} />
                                        9.8
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="admin-moviecard">
                            <img src="https://image.tmdb.org/t/p/original/khNVygolU0TxLIDWff5tQlAhZ23.jpg"></img>
                            <div className="moviecard-info">
                                <div className="moviecard-title">KGF</div>
                                <div className="moviecard-details">
                                    <div className='vertical'>
                                        <div className="language">
                                            Telugu
                                        </div>
                                        <div className="genre">
                                            Action
                                        </div>
                                    </div>
                                    <div className="rating">
                                        <FaStar size={20} />
                                        9.8
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="admin-moviecard">
                            <img src="https://image.tmdb.org/t/p/original/khNVygolU0TxLIDWff5tQlAhZ23.jpg"></img>
                            <div className="moviecard-info">
                                <div className="moviecard-title">KGF</div>
                                <div className="moviecard-details">
                                    <div className='vertical'>
                                        <div className="language">
                                            Telugu
                                        </div>
                                        <div className="genre">
                                            Action
                                        </div>
                                    </div>
                                    <div className="rating">
                                        <FaStar size={20} />
                                        9.8
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="admin-moviecard">
                            <img src="https://image.tmdb.org/t/p/original/khNVygolU0TxLIDWff5tQlAhZ23.jpg"></img>
                            <div className="moviecard-info">
                                <div className="moviecard-title">KGF</div>
                                <div className="moviecard-details">
                                    <div className='vertical'>
                                        <div className="language">
                                            Telugu                                            
                                        </div>
                                        <div className="genre">
                                            Action
                                        </div>
                                    </div>
                                    <div className="rating">
                                        <FaStar size={20} />
                                        9.8
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;