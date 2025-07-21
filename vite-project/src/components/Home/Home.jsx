import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie"
import "./Home.css";
import Footer from "../Footer";
import Card from "../Card";
import Banner from "../Banner";
import Header2 from "../Header2";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import api from "../getData"

const GenreCard = ({ id, language, posterurl, rating, title }) => {
    return (
        <>
            <div className="moviecard">
                <Link to={`/movies?id=${id}`}>
                    <img src={posterurl}></img>
                    <div className="moviecard-info">
                        <div className="moviecard-title">{title}</div>
                        <div className="moviecard-details">
                            <div className='vertical'>
                                <div className="language">
                                    {language?.map((item, index) => (
                                        <span key={index}>
                                            {item}{index !== language.length - 1 ? ', ' : ''}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="rating">
                                <FaStar size={20} />
                                {rating.toFixed(1)}
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </>
    );
};

const Home = () => {
    const [data, setData] = useState({ recommended: [] });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const scrollRef = useRef([null, null, null, null, null]);
    const [atStart, setAtStart] = useState([true, true, true, true, true]);
    const [atEnd, setAtEnd] = useState([false, false, false, false, false]);

    const checkScrollPosition = (el, index) => {
        if (!el) return;

        const isAtStart = el.scrollLeft <= 1;
        const isAtEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth;

        setAtStart((prev) => {
            const updated = [...prev];
            updated[index] = isAtStart;
            return updated;
        });

        setAtEnd((prev) => {
            const updated = [...prev];
            updated[index] = isAtEnd;
            return updated;
        });
    };

    useEffect(() => {
        const elements = scrollRef.current;
        const handlers = [];

        if(loading) return;

        elements.forEach((el, index) => {
            if (!el) return;

            const handler = () => checkScrollPosition(el, index);
            handlers[index] = handler;

            el.addEventListener("scroll", handler);
        });

        return () => {
            elements.forEach((el, index) => {
                if (!el) return;
                el.removeEventListener("scroll", handlers[index]);
            });
        };
    }, [loading]);

    const handleScrollLeft = (index) => {
        const el = scrollRef.current[index];
        if (el) {
            el.scrollLeft -= el.clientWidth;
        }
    };

    const handleScrollRight = (index) => {
        const el = scrollRef.current[index];
        if (el) {
            el.scrollLeft += el.clientWidth;
        }
    };

    const SetScrollStart = (index) => {
        const el = scrollRef.current[index];
        if (el) {
            el.scrollLeft = 0;
        }
    };

    useEffect(() => {
        const elements = scrollRef.current;
        const token = Cookies.get("token")

        if (!token) navigate("/")

        const fetchData = async () => {
            try {
                // const res = await fetch("http://localhost:3000/api/home", {
                //     method: "GET",
                //     headers: {
                //         "authorization": `Bearer ${token}`,
                //         "Content-Type": "application/json"
                //     },
                //     credentials: "include",
                // });
                // if (!res.ok) {
                //     throw new Error(`Error: ${res.status} ${res.statusText}`);
                // }
                // const result = await res.json();

                api.getHome();
                //setData(result); 
                //console.log("Fetched data:", result);
                
                elements.forEach((el, index) => {
                    if (!el) return;
                    checkScrollPosition(el, index);
                    SetScrollStart(index);
                });

            } catch (err) {
                console.error("Failed to fetch data:", err);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Header2 />
            <Banner data={data.banners} />
            <div className="showing"><h1>Now Showing</h1></div>
            <div className="display-cards">
                <div className={`scroll-left ${!atStart[0] ? "" : "hidden"}`} >
                    <MdKeyboardArrowLeft size={100} onClick={() => handleScrollLeft(0)} />
                </div>
                {loading && <div ref={(el) => (scrollRef.current[0] = el)} className="scroll-div">
                    {data.recommended && data.recommended.map((item, index) => (
                        <Card key={index} {...item} />
                    ))}
                </div>}
                <div className={`scroll-right ${!atEnd[0] ? "" : "hidden"}`} >
                    <MdKeyboardArrowRight size={100} onClick={() => handleScrollRight(0)} />
                </div>
            </div>

            <div className="showing"><h1>Comedy</h1></div>
            <div className="display-cards">
                <div className={`scroll-left ${!atStart[1] ? "" : "hidden"}`} >
                    <MdKeyboardArrowLeft size={100} onClick={() => handleScrollLeft(1)} />
                </div>
                {loading && <div ref={(el) => (scrollRef.current[1] = el)} className="scroll-div">
                    {data.comedy && data.comedy.map((item, index) => (
                        <GenreCard key={index} {...item} />
                    ))}
                </div>}
                <div className={`scroll-right ${!atEnd[1] ? "" : "hidden"}`} >
                    <MdKeyboardArrowRight size={100} onClick={() => handleScrollRight(1)} />
                </div>
            </div>

            <div className="showing"><h1>Crime</h1></div>
            <div className="display-cards">
                <div className={`scroll-left ${!atStart[2] ? "" : "hidden"}`} >
                    <MdKeyboardArrowLeft size={100} onClick={() => handleScrollLeft(2)} />
                </div>
                {loading && <div ref={(el) => (scrollRef.current[2] = el)} className="scroll-div">
                    {data.crime && data.crime.map((item, index) => (
                        <GenreCard key={index} {...item} />
                    ))}
                </div>}
                <div className={`scroll-right ${!atEnd[2] ? "" : "hidden"}`} >
                    <MdKeyboardArrowRight size={100} onClick={() => handleScrollRight(2)} />
                </div>
            </div>

            <div className="showing"><h1>Action And Adventure</h1></div>
            <div className="display-cards">
                <div className={`scroll-left ${!atStart[3] ? "" : "hidden"}`} >
                    <MdKeyboardArrowLeft size={100} onClick={() => handleScrollLeft(3)} />
                </div>
                {loading && <div ref={(el) => (scrollRef.current[3] = el)} className="scroll-div">
                    {data.actionAndAdventure && data.actionAndAdventure.map((item, index) => (
                        <GenreCard key={index} {...item} />
                    ))}
                </div>}
                <div className={`scroll-right ${!atEnd[3] ? "" : "hidden"}`} >
                    <MdKeyboardArrowRight size={100} onClick={() => handleScrollRight(3)} />
                </div>
            </div>

            <div className="showing"><h1>Romance</h1></div>
            <div className="display-cards">
                <div className={`scroll-left ${!atStart[4] ? "" : "hidden"}`} >
                    <MdKeyboardArrowLeft size={100} onClick={() => handleScrollLeft(4)} />
                </div>
                {loading && <div ref={(el) => (scrollRef.current[4] = el)} className="scroll-div">
                    {data.romance && data.romance.map((item, index) => (
                        <GenreCard key={index} {...item} />
                    ))}
                </div>}
                <div className={`scroll-right ${!atEnd[4] ? "" : "hidden"}`} >
                    <MdKeyboardArrowRight size={100} onClick={() => handleScrollRight(4)} />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Home;
