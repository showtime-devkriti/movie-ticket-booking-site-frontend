// import React, {useState} from "react";
// import "./GenreDropDown.css"
// import { FaTheaterMasks } from "react-icons/fa";

// const Content = ({open}) => {
//     return <>
        
//     </>
// }

// const Button = ({ open, toggle }) => {
//     return <>
//         <div className={`drop-btn ${open ? "active" : ""}`} onClick={toggle}>
//             <FaTheaterMasks size={30} />
//             <div>Genre</div>
//         </div>
//     </>
// }


// const GenreDropDown = () => {
//     const [open, setOpen] = useState(false);

//     const toggle = () => {
//         setOpen(!open);
//     }

//     return <>
//         <Button open={open} toggle={toggle} />
//     </>
// }

// export default GenreDropDown;

import React, { useState, useRef, useEffect } from "react";
import "./GenreDropDown.css";
import { FaTheaterMasks } from "react-icons/fa";

const Content = ({ open, width }) => {
    return (
        <div className={`drop-down ${open ? "" : "hidden"}`} style={{width: `${width}px`}}>
            <input type="text"></input>
            <ul>
                <li>Action</li>
                <li>Comedy</li>
                <li>Drama</li>
                <li>Horror</li>
                <li>Romance</li>
            </ul>
        </div>
    );
};

const Button = ({ open, toggle }) => {
    return (
        <div className={`drop-btn ${open ? "active" : ""}`} onClick={toggle}>
            <FaTheaterMasks size={30} />
            <div>Genre</div>
        </div>
    );
};

const GenreDropDown = ({width}) => {
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
            <Button open={open} toggle={toggle} />
            <Content open={open} width={width}/>
        </div>
    );
};

export default GenreDropDown;