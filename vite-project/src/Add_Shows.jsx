import React from "react";
import "./Add_Shows.css";
import Sidebar from "./components/Admin-Sidebar/Sidebar";

const Add_Shows = () => {
    return (
        <>
            <div className="add-shows-wrapper">
                <div className="sidebar-wrapper">
                    <div className="sidebar">
                        <Sidebar />
                    </div>
                </div>
                <div className="add-shows">
                    <h1>My Shows</h1>
                    <input type="text" placeholder="Movie ID"></input>
                    <div className="my-shows">
                        <div className="my-show">
                            <p>Screen 1</p>
                            <button>Select</button>
                        </div>
                        <div className="my-show">
                            <p>Screen 1</p>
                            <button>Select</button>
                        </div>
                        <div className="my-show">
                            <p>Screen 1</p>
                            <button>Select</button>
                        </div>
                    </div>
                    <button>Add Show</button>
                    <div className="screen-info">
                        <table>
                            <tr>
                                <th>Class</th>
                                <th>Price</th>
                            </tr>
                            <tr>
                                <td>Gold</td>
                                <td><input type="text" placeholder="Price"></input></td>
                            </tr>
                            <tr>
                                <td>Gold</td>
                                <td><input type="text" placeholder="Price"></input></td>
                            </tr>
                            <tr>
                                <td>Gold</td>
                                <td><input type="text" placeholder="Price"></input></td>
                            </tr>
                            <tr>
                                <td>Gold</td>
                                <td><input type="text" placeholder="Price"></input></td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Add_Shows;