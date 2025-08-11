import { forwardRef, useEffect, useRef, useState } from "react";
import "./LocationDropDown.css";
import { FaMapLocationDot } from "react-icons/fa6";

const Content = forwardRef((props, ref) => {
    const { open, width, setLocation, toggle } = props;

    const handler = (e) => {
        const value = e.target.getAttribute("value");
        console.log(value)
        setLocation(value)
        toggle()
    }

    return (
        <div ref={ref} className={`drop-down ${open ? "" : "hidden"}`} style={{ width: `${width}px` }}>
            <input type="text"></input>
            <ul>
                <li value="Hyderabad" onClick={handler}>Hyderabad</li>
                <li value="Mumbai" onClick={handler}>Mumbai</li>
                <li value="Delhi" onClick={handler}>Delhi</li>
                <li value="Bangalore" onClick={handler}>Bangalore</li>
                <li value="Chennai" onClick={handler}>Chennai</li>
                <li value="Visakhapatnam" onClick={handler}>Visakhapatnam</li>
            </ul>
        </div>
    );
});

const Button = forwardRef((props, ref) => {
    const { open, toggle, location } = props;

    return (
        <div ref={ref} className={`drop-btn ${open ? "active" : ""}`} onClick={toggle}>
            <FaMapLocationDot />
            {open && <div>Location</div>}
            {location ? !open && <div>{location}</div> : !open && <div>Location</div>}
        </div>
    );
});

const LocationDropDown = ({ width, setLocation, location }) => {
    const [open, setOpen] = useState(false);
    const dropDownRef = useRef();

    const toggle = () => {
        setOpen(!open);
    };

    useEffect(() => {
        const handler = (event) => {
            if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("click", handler);
        return () => {
            document.removeEventListener("click", handler);
        };
    }, []);

    return (
        <div ref={dropDownRef} className="dropdown-wrapper">
            <Button open={open} toggle={toggle} location={location} />
            <Content open={open} toggle={toggle} width={width} setLocation={setLocation} />
        </div>
    );
};

export default LocationDropDown;