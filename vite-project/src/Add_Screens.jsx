import React, { useState, useEffect } from "react";
import "./Add_Screens.css";
import Sidebar from "./components/Admin-Sidebar/Sidebar";
import { FaEdit, FaSave } from "react-icons/fa";
import Cookies from "js-cookie"
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { IoMenu } from "react-icons/io5";

const SeatClass = ({ seatStructure, classes, setClasses }) => {
    const [className, setClass] = useState({
        class: "",
        rows: "",
        columns: ""
    })

    const classHandler = (e) => {
        const { name, value } = e.target;
        if ((name === "rows" || name === "columns") && !/^\d*$/.test(value)) return;
        setClass(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const add = () => {
        setClass({
            class: "",
            rows: "",
            columns: ""
        })
        setClasses(prev => ([...prev, className]))
    }

    return <>
        {seatStructure && <>
            <div className={`screen-info ${seatStructure?.length ? "" : "hidden"}`}>
                <table>
                    <thead>
                        <tr>
                            <th>Class</th>
                            <th>Rows</th>
                            <th>Columns</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {seatStructure?.map((element, i) => (
                            <tr key={i}>
                                <td>{element.class}</td>
                                <td><div> {element.rows} </div></td>
                                <td><div>{element.columns} </div></td>
                                <td><div>{element.rows * element.columns} </div></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>}

        {!seatStructure && <>
            <div className="add-class">
                <input type="text" name="class" value={className.class} placeholder="Class Name" onChange={classHandler}></input>
                <input type="text" name="rows" value={className.rows} placeholder="Rows" onChange={classHandler}></input>
                <input type="text" name="columns" value={className.columns} placeholder="Columns" onChange={classHandler}></input>
                <button onClick={add}>Add Class</button>
            </div>

            <div className={`screen-info ${classes?.length ? "" : "hidden"}`}>
                <table>
                    <thead>
                        <tr>
                            <th>Class</th>
                            <th>Rows</th>
                            <th>Columns</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classes?.map((element, i) => (
                            <tr key={i}>
                                <td>{element.class}</td>
                                <td><div> {element.rows} </div></td>
                                <td><div>{element.columns} </div></td>
                                <td><div>{element.rows * element.columns} </div></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>}
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
            {screen?.seatStructure?.length && <>
                {!isEdit && <button onClick={onEditToggle}>Show <MdVisibility /></button>}
                {isEdit && <button onClick={onEditToggle}>Close <MdVisibilityOff /></button>}
            </>}
            {!screen?.seatStructure?.length && <>
                {!isEdit && <button onClick={onEditToggle}>Edit <FaEdit /></button>}
                {isEdit && <button onClick={post}>Save <FaSave /></button>}
            </>}
        </div>
        <div className="my-screen-edit">
            {isEdit && <SeatClass seatStructure={screen?.seatStructure} classes={classes} setClasses={setClasses} />}
        </div>
    </>
}

const Add_Screens = () => {
    const [screen, setScreen] = useState(null);
    const [editingScreenId, setEditingScreenId] = useState(null);
    const [newScreen, setNewScreen] = useState({
        screenName: "",
    });
    const [name, setName] = useState("")

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

    const handler = (e) => {
        setName(e.target.value)
    };

    const addScreen = () => {
        if (screen.screenName === "") return
        setNewScreen({
            screenName: name,
        })
        setName("")
    }

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const [isSidebar, setIsSidebar] = useState();

    useEffect(() => {
        setIsSidebar(!isMobile);
    }, [isMobile]);

    return (
        <>
            <div className="add-screens-wrapper">
                <Sidebar isSidebar={isSidebar} setIsSidebar={setIsSidebar} />
                {isMobile ? (
                    <div className="admin-menu">
                        <button onClick={() => { setIsSidebar(!isSidebar) }}><IoMenu size={50} /></button>
                    </div>
                ) : <></>}
                <div className="add-screens">
                    <h1>My Screens</h1>
                    <div className="add-screen">
                        <input type="text" placeholder="Screen Name" value={name} onChange={handler}></input>
                        <button onClick={addScreen}>Add Screen</button>
                    </div>
                    <div className="my-screens">
                        {screen?.screens?.map(screen => (
                            <Screen key={screen._id} screen={screen} isEdit={editingScreenId === screen._id} onEditToggle={() => handleEditToggle(screen._id)} />
                        ))}
                        {newScreen.screenName != "" && <Screen key={"8561"} screen={newScreen} isEdit={editingScreenId === "8561"} onEditToggle={() => handleEditToggle("8561")} />}
                    </div>

                </div>
            </div>
        </>
    );
};

export default Add_Screens;