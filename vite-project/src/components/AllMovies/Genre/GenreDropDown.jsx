import React, {useState} from "react";
import "./GenreDropDown.css"
import { FaTheaterMasks } from "react-icons/fa";

const Content = ({open}) => {
    return <>
        
    </>
}

const Button = ({ open, toggle }) => {
    return <>
        <div className={`drop-btn ${open ? "active" : ""}`} onClick={toggle}>
            <FaTheaterMasks size={30} />
            <div>Genre</div>
        </div>
    </>
}


const GenreDropDown = () => {
    const [open, setOpen] = useState(false);

    const toggle = () => {
        setOpen(!open);
    }

    return <>
        <Button open={open} toggle={toggle} />
    </>
}

export default GenreDropDown;