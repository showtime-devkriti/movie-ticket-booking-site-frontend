import { forwardRef, useEffect, useRef, useState } from "react";
import "./LanguageDropDown.css"
import { IoLanguage } from "react-icons/io5";
import { TbBrandCohost } from "react-icons/tb";

const Content = forwardRef((props, ref) => {
    const {open, top, left} = props;

    return <>
        <div ref={ref} className={`drop-down ${open ? "" : "hidden"}`} style={{top : top ? `${top}px` : "20%", left: left ? `${left}px` : "20%"}}>

        </div>
    </>
})

const Button = forwardRef((props, ref) => {
    const {open, toggle} = props;

    return <>
        <div ref={ref} className={`drop-btn ${open ? "active" : ""}`} onClick={toggle}>
            <IoLanguage size={30} />
            <div>Language</div>
        </div>
    </>
})

const LanguageDropDown = () => {
    const [open, setOpen] = useState(false);
    const [dropDownTop, setDropDownTop] = useState(0);
    const [dropDownLeft, setDropDownLeft] = useState(0);
    const dropDownRef = useRef();
    const buttonRef = useRef();
    const contentRef = useRef();

    const toggle = () => {
        if(!open){
            const spaceTop = window.innerHeight - buttonRef.current.getBoundingClientRect().bottom;
            const cHeight = contentRef.current.clientHeight;
            const top = spaceTop > cHeight ? null : spaceTop - cHeight;
            setDropDownTop(top)

            const spaceLeft = window.innerWidth - buttonRef.current.getBoundingClientRect().right;
            const cLeft = contentRef.current.clientWidth;
            const left = spaceLeft > cLeft ? null : spaceLeft - cLeft;
            setDropDownLeft(left)
        }

        setOpen(!open);
    }

    useEffect(() => {
        const handler = (event) => {
            if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
                setOpen(false);
            }
        }

        document.addEventListener("click", handler)

        return () => {
            document.removeEventListener("click", handler)
        }
    }, [dropDownRef])

    return <>
        <div ref={dropDownRef}>
            <Button ref={buttonRef} open={open} toggle={toggle} />
            <Content ref={contentRef} open={open} top={dropDownTop} left={dropDownLeft}/>
        </div>
    </>
}

export default LanguageDropDown;