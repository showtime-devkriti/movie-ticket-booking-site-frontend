import React from "react";
import './Dashboard.css'
import Sidebar from "./components/Admin-Sidebar/Sidebar";
import { FaLocationDot } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";

const Dashboard = () => {
    return (
        <>
            <div className="dashboard-wrapper">
                <div className="sidebar-wrapper">
                    <div className="sidebar">
                        <Sidebar />
                    </div>
                </div>
                <div className="dashboard">
                    <h1>AMB Cinemas: Gachibowli</h1>
                    <div className="theatre-location">
                        <FaLocationDot size={25} />
                        <p>Sarath City Capital Mall, Forest Dept Colony, Kondapur, Gachibowli - Miyapur Road, White Field Road, Opposite Mahindra Showroom, Hyderabad, Telangana 500084, India</p>
                    </div>
                    <h2>Screens</h2>
                    <div className="admin-screens">
                        <div>Screen 1</div>
                        <div>Screen 1</div>
                        <div>Screen 1</div>
                        <div>Screen 1</div>
                        <div>Screen 1</div>
                    </div>
                    <h2>Movies</h2>
                    <div className="moviecards">
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