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
import getHome from "./getRecommened"

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
                                {/* <div className="language">
                                    {language?.map((item, index) => (
                                        <span key={index}>
                                            {item}{index !== language.length - 1 ? ', ' : ''}
                                        </span>
                                    ))}
                                </div> */}
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


const Carousel = ({ title, movies, index }) => {
    const scrollRef = useRef(null);
    const [atStart, setAtStart] = useState(true);
    const [atEnd, setAtEnd] = useState(false);
    const navigate = useNavigate()

    const checkScrollPosition = () => {
        const el = scrollRef.current;
        if (!el) return;

        setAtStart(el.scrollLeft <= 1);
        setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth);
    };

    const handleScroll = (direction) => {
        const el = scrollRef.current;
        if (el) {
            const scrollAmount = el.clientWidth;
            el.scrollLeft += direction === 'left' ? -scrollAmount : scrollAmount;
        }
    };

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        el.addEventListener("scroll", checkScrollPosition);
        checkScrollPosition();

        return () => {
            el.removeEventListener("scroll", checkScrollPosition);
        };
    }, [movies]);

    const moreHandler = () => {
        navigate("/movies/all")
    }

    return (
        <div className="carousel-container">
            <div className="showing"><h1>{title}</h1></div>
            <div className="display-cards">
                <div className={`scroll-left ${!atStart ? "" : "hidden"}`} onClick={() => handleScroll('left')}>
                    <MdKeyboardArrowLeft size={50} />
                </div>
                <div ref={scrollRef} className="scroll-div">
                    {movies?.map((item, i) => (
                        <GenreCard key={i} {...item} />
                    ))}
                    <div className="more" onClick={moreHandler}>
                        More movies
                    </div>
                </div>
                <div className={`scroll-right ${!atEnd ? "" : "hidden"}`} onClick={() => handleScroll('right')}>
                    <MdKeyboardArrowRight size={50} />
                </div>
            </div>
        </div>
    );
};


const Home = () => {
    const [data, setData] = useState({
        recommended: [],
        comedy: [],
        crime: [],
        actionAndAdventure: [],
        romance: []
    });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const location = localStorage.getItem("location")
    const language = localStorage.getItem("language")

    const fetchData = async () => {
        setLoading(true);
        try {
            const lang = localStorage.getItem("language");
            const result = await getHome(lang);
            sessionStorage.setItem("home", JSON.stringify(result))
            setData(result);
            console.log("Fetched data:", result);
        } catch (err) {
            console.error("Failed to fetch data:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = Cookies.get("token");

        if (!token) {
            navigate("/");
            return;
        }

        const res = sessionStorage.getItem("home")
        let parsed
        try {
            parsed = res ? JSON.parse(res) : [];
        } catch (e) {
            console.error("Failed to parse localStorage movie data:", e);
        }
        console.log(parsed)
        if (parsed == []) {
            fetchData();
        } else {
            setData(parsed);
            setLoading(false)
        }

    }, [navigate]);

    if (loading) return <div className="loader-container" >
        <div className="loader"></div>
    </div>

    return (
        <>
            <Header2 />
            <Banner data={data?.banners} />

            <Carousel title="Now Showing" movies={data?.recommended} />
            <Carousel title="Comedy" movies={data?.comedy} />
            <Carousel title="Crime" movies={data?.crime} />
            <Carousel title="Action and Adventure" movies={data?.actionAndAdventure} />
            <Carousel title="Romance" movies={data?.romance} />

            <Footer />
        </>
    );
};

export default Home;