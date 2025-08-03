import React, { useState, useEffect } from "react";
import "./Add_Shows.css";
import Sidebar from "./components/Admin-Sidebar/Sidebar";
import { TbSelect } from "react-icons/tb";
import { GiConfirmed } from "react-icons/gi";
import Cookies from "js-cookie"
import { FaSearch } from "react-icons/fa";
import api from "./components/getData"

const SeatClass = ({ seatStructure, classes, setClasses }) => {
    const [className, setClass] = useState({
        class: "",
        rows: "",
        columns: ""
    })

    const PriceHandler = (e) => {
        const { name, value } = e.target;
        if ((name === "rows" || name === "columns") && !/^\d*$/.test(value)) return;
        setClass(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return <>
        <div className={`screen-info ${seatStructure?.length ? "" : "hidden"}`}>
            <table>
                <thead>
                    <tr>
                        <th>Class</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {seatStructure?.map((element, i) => (
                        <tr key={i}>
                            <td>{element.class}</td>
                            <td><input type="text" placeholder="Price" /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
}

const Screen = ({ screen, isEdit, onEditToggle }) => {
    const [classes, setClasses] = useState([])

    const post = async () => {
        const seatLayout = classes.map(item => ({
            class: item.class,
            rows: parseInt(item.rows),
            columns: parseInt(item.columns)
        }))
        const admin = Cookies.get("admin")
        const res = await fetch("http://localhost:3000/api/admin/screenpost", {
            method: "POST",
            headers: {
                "authorization": `Bearer ${admin}`,
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                screenName: screen.screenName,
                seatlayout: seatLayout
            }),
        })
        console.log(res)
        if (res.ok) window.location.reload()
        console.log(seatLayout)
    }

    return <>
        <div className="my-screen">
            <p>{screen?.screenName}</p>
            {!isEdit && <button onClick={onEditToggle}>Select <TbSelect /></button>}
            {isEdit && <button onClick={onEditToggle}>Confirm <GiConfirmed /></button>}
        </div>
        <div className="my-screen-edit">
            {isEdit && <SeatClass seatStructure={screen?.seatStructure} classes={classes} setClasses={setClasses} />}
        </div>
    </>
}


const Add_Shows = () => {
    const [screen, setScreen] = useState(null);
    const [editingScreenId, setEditingScreenId] = useState(null);
    const [movieId, setMovieId] = useState("")

    const handleEditToggle = (id) => {
        setEditingScreenId(prevId => (prevId === id ? null : id));
    };

    useEffect(() => {
        const admin = Cookies.get("admin")

        const fetchData = async () => {
            const getScreens = await fetch("http://localhost:3000/api/admin/getscreen", {
                method: "GET",
                headers: {
                    "authorization": `Bearer ${admin}`,
                    "Content-Type": "application/json"
                },
                credentials: "include",
            }).then(res => res.json())
            console.log(getScreens)
            setScreen(getScreens)
        }

        fetchData()
    }, [])

    const idHandler = (e) => {
        setMovieId(e.target.value)
    }

    const search = async() => {
        console.log( await api.getMovie(movieId))
    }

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
                    <div className="movie-search">
                        <input type="text" value={movieId} placeholder="Movie ID" onChange={idHandler}></input>
                        <button onClick={search}>Search<FaSearch/></button>
                    </div>
                    <div className="my-screens">
                        {screen?.screens?.map(screen => (
                            <Screen key={screen._id} screen={screen} isEdit={editingScreenId === screen._id} onEditToggle={() => handleEditToggle(screen._id)} />
                        ))}
                    </div>
                    
                </div>
            </div>
        </>
    );
};

export default Add_Shows;