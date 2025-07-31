import React from "react";
import "./Add_Screens.css";
import Sidebar from "./components/Admin-Sidebar/Sidebar";
import { FaEdit } from "react-icons/fa";

const Add_Screens = () => {
    return (
        <>
            <div className="add-screens-wrapper">
                <div className="sidebar-wrapper">
                    <div className="sidebar">
                        <Sidebar />
                    </div>
                </div>
                <div className="add-screens">
                    <h1>My Screens</h1>
                    <div className="add-screen">
                        <input type="text" placeholder="Screen Name"></input>
                        <button>Add Screen</button>
                    </div>
                    <div className="my-screens">
                        <div className="my-screen">
                            <p>Screen 1</p>
                            <button>Edit <FaEdit /></button>
                        </div>
                        <div className="my-screen">
                            <p>Screen 1</p>
                            <button>Edit <FaEdit /></button>
                        </div>
                        <div className="my-screen">
                            <p>Screen 1</p>
                            <button>Edit <FaEdit /></button>
                        </div>
                    </div>
                    <div className="add-class">
                        <input type="text" placeholder="Class Name"></input>
                        <input type="text" placeholder="Rows"></input>
                        <input type="text" placeholder="Columns"></input>
                    </div>
                    <button>Add Class</button>
                    <div className="screen-info">
                        <table>
                            <tr>
                                <th>Class</th>
                                <th>Rows</th>
                                <th>Columns</th>
                            </tr>
                            <tr>
                                <td>Gold</td>
                                <td>5</td>
                                <td>10</td>
                            </tr>
                            <tr>
                                <td>Gold</td>
                                <td>5</td>
                                <td>10</td>
                            </tr>
                            <tr>
                                <td>Gold</td>
                                <td>5</td>
                                <td>10</td>
                            </tr>
                            <tr>
                                <td>Gold</td>
                                <td>5</td>
                                <td>10</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Add_Screens;