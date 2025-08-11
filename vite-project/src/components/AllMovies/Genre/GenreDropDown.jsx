import React, { useState, useRef, useEffect } from "react";
import "./GenreDropDown.css";
import { FaTheaterMasks } from "react-icons/fa";

const Content = ({ open, width, toggle, setGenre }) => {

    const handler = (e) => {
        const value = e.target.getAttribute("value");
        console.log(value)
        setGenre(value)
        toggle()
    }

    return (
        <div className={`drop-down ${open ? "" : "hidden"}`} style={{width: `${width}px`}}>
            <input type="text"></input>
            <ul>
                <li value="Action" onClick={handler}>Action</li>
                <li value="Comedy" onClick={handler}>Comedy</li>
                <li value="Drama" onClick={handler}>Drama</li>
                <li value="Horror" onClick={handler}>Horror</li>
                <li value="Romance" onClick={handler}>Romance</li>
            </ul>
        </div>
    );
};

const Button = ({ open, toggle, genre }) => {
    return (
        <div className={`drop-btn ${open ? "active" : ""}`} onClick={toggle}>
            <FaTheaterMasks size={30} />
            {open && <div>Genre</div>}
            {genre ? !open && <div>{genre}</div> : !open && <div>Genre</div>}
        </div>
    );
};

const GenreDropDown = ({width, setGenre, genre}) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef();

    const toggle = () => {
        setOpen(!open);
    };

    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("click", handler);
        return () => document.removeEventListener("click", handler);
    }, []);

    return (
        <div className="dropdown-wrapper" ref={dropdownRef}>
            <Button open={open} toggle={toggle} genre={genre}/>
            <Content open={open} width={width} toggle={toggle} setGenre={setGenre}/>
        </div>
    );
};

export default GenreDropDown;