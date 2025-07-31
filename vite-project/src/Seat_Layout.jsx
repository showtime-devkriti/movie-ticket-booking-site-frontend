import React, { useEffect, useRef, useCallback } from "react";
import "./Seat_Layout.css";
import Layout_Header from "./components/Layout-components/Layout_Header";
import { io } from "socket.io-client";
import { useSearchParams, Link } from "react-router-dom"
import { useState } from "react";
import Cookies from "js-cookie"
//const socket = io("http://localhost:3000/api/movies/seat");
const socket = io("http://localhost:3000", {
    withCredentials: true
});

import axios from 'axios';

const getStableUserId = () => {
    let userId = localStorage.getItem('userId');
    if (!userId) {
        userId = `user_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('userId', userId);
    }
    return userId;
};

// THE REFINED COMPONENT
function SeatMatrix({ seatLayout, showtimeid }) {
    const [seatMatrix, setSeatMatrix] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState(new Set());
    const [lockedSeats, setLockedSeats] = useState(new Map());
    const [userId] = useState(getStableUserId());
    const [isConnected, setIsConnected] = useState(socket.connected);

    // --- CRITICAL SECTION: SOCKET EVENT HANDLING ---
    useEffect(() => {
        // Guard clause: Don't do anything if we don't have the required ID
        if (!showtimeid || !userId) return;

        // Function to join the room
        const joinRoom = () => {
            console.log(`--- Joining room ${showtimeid} as user ${userId} with socket ${socket.id} ---`);
            socket.emit('join-showtime', { showtimeid });
            setIsConnected(true);
        }

        // --- Event Handlers ---
        const handleConnect = () => {
            console.log("Socket connected!");
            joinRoom();
        };

        const handleDisconnect = () => {
            console.log("Socket disconnected!");
            setIsConnected(false);
        };

        const handleSeatLocked = (data) => {
            console.log("EVENT [seat-locked] RECEIVED:", data);

            if (data.lockedBy === userId) {
                console.log("-> Lock is by current user. Ignoring for 'lockedSeats' state.");
                return;
            }

            setLockedSeats(prevLockedSeats => {
                console.log(`-> Updating lockedSeats: adding seat ${data.seatid}`);
                const newLockedSeats = new Map(prevLockedSeats);
                newLockedSeats.set(data.seatid, { lockedBy: data.lockedBy });
                return newLockedSeats;
            });
        };

        const handleSeatUnlocked = (data) => {
            console.log("EVENT [seat-unlocked] RECEIVED:", data);

            setLockedSeats(prevLockedSeats => {
                console.log(`-> Updating lockedSeats: removing seat ${data.seatid}`);
                const newLockedSeats = new Map(prevLockedSeats);
                newLockedSeats.delete(data.seatid);
                return newLockedSeats;
            });
        };

        if (socket.connected) {
            joinRoom();
        }

        socket.on('connect', handleConnect);
        socket.on('disconnect', handleDisconnect);

        socket.on('seat-locked', handleSeatLocked);
        socket.on('seat-unlocked', handleSeatUnlocked);

        return () => {
            console.log(`--- Cleaning up listeners for showtime ${showtimeid} ---`);
            socket.off('connect', handleConnect);
            socket.off('disconnect', handleDisconnect);
            socket.off('seat-locked', handleSeatLocked);
            socket.off('seat-unlocked', handleSeatUnlocked);
        };

    }, [showtimeid, userId]); 

    const selectSeat = useCallback((seat) => {
        if (seat.status === 'booked' || lockedSeats.has(seat.seatid)) {
            return;
        }

        const updatedSeats = new Set(selectedSeats);
        const isSelected = updatedSeats.has(seat.seatid);

        if (isSelected) {
            updatedSeats.delete(seat.seatid);
            socket.emit("unselect-seat", { showtimeid, seatid: seat.seatid, userId });
        } else {
            updatedSeats.add(seat.seatid);
            socket.emit("select-seat", { showtimeid, seatid: seat.seatid, userId });
        }
        setSelectedSeats(updatedSeats);
    }, [selectedSeats, lockedSeats, showtimeid, userId]);

    useEffect(() => {
        if (!seatLayout || seatLayout.length === 0) return;
        const sortedSeats=[...seatLayout].sort((a,b)=>{const rowA=a.row.toLowerCase().charCodeAt(0);const rowB=b.row.toLowerCase().charCodeAt(0);if(rowA===rowB)return a.column-b.column;return rowA-rowB;});const matrix=[];let currentRow=sortedSeats[0].row;let rowGroup=[];for(let seat of sortedSeats){if(seat.row===currentRow){rowGroup.push(seat);}else{matrix.push(rowGroup);rowGroup=[seat];currentRow=seat.row;}}matrix.push(rowGroup);setSeatMatrix(matrix);
    }, [seatLayout]);

    const getSeatClassName = (seat) => {
        if (seat.status === "booked") return "booked";
        if (selectedSeats.has(seat.seatid)) return "selected";
        if (lockedSeats.has(seat.seatid)) return "locked";
        return "available";
    };

    return (
        <div className="column">
            <h3>Connection Status: {isConnected ? 'Connected' : 'Disconnected'}</h3>
            {seatMatrix.map((row, rowIndex) => (
                <div className="row" key={rowIndex} style={{ marginBottom: '10px' }}>
                    {row[0]?.row}:{'  '}
                    {row.map((seat) => (
                        <span
                            className={getSeatClassName(seat)}
                            key={seat.seatid}
                            onClick={() => selectSeat(seat)}
                        >
                            {seat.seatid}
                        </span>
                    ))}
                </div>
            ))}
        </div>
    );
}

const Seat_Layout = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");

    const [selectedbyanother, setSelectedbyanother] = useState(false)
    const showtimeid = "688a619a1b744ad5f07665d1";
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        const token = Cookies.get("token")
        // const result = await fetch("http://localhost:5000/api/bookticket/688a619a1b744ad5f07665d1",
        //     {
        //         "method": "GET",
        //         headers: {
        //             accept: 'application/json',
        //             Authorization: `Bearer ${token}`
        //         }
        //     }
        // ).then((res) => res.json()).then(res => console.log(res))
        try {
            const response = await axios.get(
                "http://localhost:3000/api/bookticket/688a619a1b744ad5f07665d1",
                {
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log(response.data);
            setData(response.data)
            setLoading(false);
        } catch (error) {
            console.error('Error fetching ticket:', error);
        }
    }

    useEffect(() => {
        setLoading(true);
        fetchData()
    }, []);



    if (loading) return <div className="loader-container" >
        <div className="loader"></div>
    </div>

    return (
        <>
            <div className="layout-wrapper">
                <Layout_Header />
                <SeatMatrix seatLayout={data?.seatLayout} showtimeid={data.showtimeid} />
                <img className="screen" src="https://district.ticketnew.com/movies_assets/_next/static/media/screen-img-light.b7b18ffd.png"></img>
            </div>
        </>
    );
};

//

export default Seat_Layout;