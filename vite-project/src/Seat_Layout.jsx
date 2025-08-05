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

function SeatMatrix({ seatLayout, showtimeid, setTotalSeats, setCost, pricing }) {
    const [seatMatrix, setSeatMatrix] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState(new Set());
    const [lockedSeats, setLockedSeats] = useState(new Map());
    const [userId] = useState(getStableUserId());
    const [isConnected, setIsConnected] = useState(socket.connected);


    useEffect(() => {
        if (!showtimeid || !userId) return;

        const joinRoom = () => {
            console.log(`--- Joining room ${showtimeid} as user ${userId} with socket ${socket.id} ---`);
            socket.emit('join-showtime', { showtimeid });
            setIsConnected(true);
        }

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

    useEffect(() => {
        setTotalSeats(selectedSeats.size);

        const totalCost = Array.from(selectedSeats).reduce((acc, seatid) => {
            const seat = seatLayout.find(s => s.seatid === seatid);
            return seat ? acc + seat.price : acc;
        }, 0);

        setCost(totalCost);
    }, [selectedSeats, seatLayout]);

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
        if (!seatLayout || seatLayout.length === 0)
            return;

        const sortedSeats = [...seatLayout].sort((a, b) => {
            const rowA = a.row.toLowerCase().charCodeAt(0);
            const rowB = b.row.toLowerCase().charCodeAt(0);
            if (rowA === rowB) return a.column - b.column;
            return rowA - rowB;
        });

        const matrix = [];
        let currentRow = sortedSeats[0].row;
        let rowGroup = [];

        for (let seat of sortedSeats) {
            if (seat.row === currentRow) {
                rowGroup.push(seat);
            }
            else {
                matrix.push(rowGroup);
                rowGroup = [seat];
                currentRow = seat.row;
            }
        }

        matrix.push(rowGroup);
        setSeatMatrix(matrix);
    }, [seatLayout]);

    const getSeatClassName = (seat) => {
        if (seat.status === "booked") return "Booked";
        if (selectedSeats.has(seat.seatid)) return "Selected";
        if (lockedSeats.has(seat.seatid)) return "Locked";
        return "Available";
    };

    return (
        <div className="column">
            {/* <h3>Connection Status: {isConnected ? 'Connected' : 'Disconnected'}</h3> */}
            {seatMatrix.map((row, rowIndex) => (
                <div className="row" key={rowIndex} style={{ marginBottom: '10px' }}>
                    {row[0]?.row}:{'  '}
                    {row.map((seat) => (
                        <span
                            className={`${getSeatClassName(seat)} tooltip`}
                            key={seat.seatid}
                            onClick={() => selectSeat(seat)}
                        >
                            {seat.seatid}
                            <span className="tooltiptext">{getSeatClassName(seat)}</span>
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
    const [totalSeats, setTotalSeats] = useState(null)
    const [cost, setCost] = useState(null)
    //const showtimeid = "688a619a1b744ad5f07665d1";
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        if(!id) return
        const token = Cookies.get("token")
        try {
            const response = await axios.get(
                `http://localhost:3000/api/bookticket/${id}`,
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

    const bookHandler = () => {

    }

    if (loading) return <div className="loader-container" >
        <div className="loader"></div>
    </div>

    return (
        <>
            <div className="layout-wrapper">
                <Layout_Header />
                <SeatMatrix seatLayout={data?.seatLayout} showtimeid={data.showtimeid} setTotalSeats={setTotalSeats} setCost={setCost} pricing={data?.pricing} />
                <div className="district-screen">
                    <img className="screen" src="https://district.ticketnew.com/movies_assets/_next/static/media/screen-img-light.b7b18ffd.png"></img>
                </div>
                <div className="bottom-bar-container">
                    <div className="bottom-bar">
                        <h2>Total Seats: {data?.seatLayout?.length}</h2>
                        <h2>Seats Selected: {totalSeats} </h2>
                        <h2>Total Price: {cost}</h2>
                        <button onClick={bookHandler}>Book Tickets</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Seat_Layout;