import React, { useEffect, useRef } from "react";
import "./Seat_Layout.css";
import Layout_Header from "./components/Layout-components/Layout_Header";
import { io } from "socket.io-client";
const socket = io("http://localhost:3000/api/movies/seat");

const Seat_Layout = () => {
    useEffect(() => {
        socket.on("admin-reply", (msg) => {
            console.log("Reply from admin WS:", msg);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const send = () => {
        socket.emit("admin-message", "Hello from Admin Panel");
        console.log("Reply from admin WS:");
    };

    return (
        <>
            <div className="layout-wrapper">
                <Layout_Header />
                <div className="layout">
                    <div className="column" >
                        <div className="row">
                            <h2>A</h2>
                            <button onClick={send}>1</button>
                            <button>1</button>
                            <button>1</button>
                            <button>1</button>
                            <button>1</button>
                            <button>1</button>
                            <button>1</button>
                            <button>1</button>
                            <button>1</button>
                            <button>1</button>
                        </div>
                        <div className="row">
                            <h2>A</h2>
                            <button>1</button>
                            <button>1</button>
                            <button>1</button>
                            <button>1</button>
                            <button>1</button>
                            <button>1</button>
                            <button>1</button>
                            <button>1</button>
                            <button>1</button>
                            <button>1</button>
                        </div>
                        <div className="row">
                            <h2>A</h2>
                            <button>1</button>
                            <button>1</button>
                            <button>1</button>
                            <button>1</button>
                            <button>1</button>
                            <button>1</button>
                            <button>1</button>
                            <button>1</button>
                            <button>1</button>
                            <button>1</button>
                        </div>
                        <div className="row">
                            <h2>A</h2>
                            <button>1</button>
                            <button>1</button>
                            <button>1</button>
                            <button>1</button>
                            <button>1</button>
                            <button>1</button>
                            <button>1</button>
                            <button>1</button>
                            <button>1</button>
                            <button>1</button>
                        </div>
                        <div className="row">
                            <h2>A</h2>
                            <button>1</button>
                            <button>1</button>
                            <button>1</button>
                            <button>1</button>
                            <button>1</button>
                            <button>1</button>
                            <button>1</button>
                            <button>1</button>
                            <button>1</button>
                            <button>1</button>
                        </div>
                        <div className="row">
                            <h2>A</h2>
                            <button>1</button>
                            <button>1</button>
                            <button>1</button>
                            <button>1</button>
                            <button>1</button>
                            <button>1</button>
                            <button>1</button>
                            <button>1</button>
                            <button>1</button>
                            <button>1</button>
                        </div>
                        <div className="row">
                            <h2>A</h2>
                            <button>1</button>
                            <button>1</button>
                            <button>1</button>
                            <button>1</button>
                            <button>1</button>
                            <button>1</button>
                            <button>1</button>
                            <button>1</button>
                            <button>1</button>
                            <button>1</button>
                        </div>
                        <div className="row">
                            <h2>A</h2>
                            <button>1</button>
                            <button>1</button>
                            <button>1</button>
                            <button>1</button>
                            <button>1</button>
                            <button>1</button>
                            <button>1</button>
                            <button>1</button>
                            <button>1</button>
                            <button>1</button>
                        </div>
                    </div>
                    <img src="https://district.ticketnew.com/movies_assets/_next/static/media/screen-img-light.b7b18ffd.png"></img>
                </div>
            </div>
        </>
    );
};

export default Seat_Layout;