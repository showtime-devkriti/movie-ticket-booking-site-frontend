import { forwardRef, useEffect, useRef, useState } from "react";
import "./LanguageDropDown.css";
import { IoLanguage } from "react-icons/io5";

const Content = forwardRef((props, ref) => {
    const { open, width, toggle, setLanguage } = props;

    const handler = (e) => {
        const value = e.target.getAttribute("value");
        console.log(value)
        setLanguage(value)
        toggle()
    }

    return (
        <div ref={ref} className={`drop-down ${open ? "" : "hidden"}`} style={{width: `${width}px`}}>
            <input type="text"></input>
            <ul>
                <li value="Telugu" onClick={handler}>Telugu</li>
                <li value="Hindi" onClick={handler}>Hindi</li>
                <li value="English" onClick={handler}>English</li>
            </ul>
        </div>
    );
});

const Button = forwardRef((props, ref) => {
    const { open, toggle, language } = props;

    return (
        <div ref={ref} className={`drop-btn ${open ? "active" : ""}`} onClick={toggle}>
            <IoLanguage size={30} />
            {open && <div>Language</div>}
            {language ? !open && <div>{language}</div> : !open && <div>Language</div>}
        </div>
    );
});

const LanguageDropDown = ({width, setLanguage, language}) => {
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
            <Button open={open} toggle={toggle} language={language}/>
            <Content open={open} width={width} toggle={toggle} setLanguage={setLanguage}/>
        </div>
    );
};

export default LanguageDropDown;