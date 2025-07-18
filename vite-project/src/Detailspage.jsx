import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import './Detailspage.css';
import Details_Banner from "./components/Details-components/Details_Banner";
import DetailsCard from "./components/Details-components/Details_Card";
import Header2 from "./components/Header2";
import Footer from "./components/Footer";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";


const MovieCard = ({ genre, id, language, posterurl, rating, title }) => {
    return (
        <>
            <div className="moviecard">
                <Link to={`/movies?id=${id}`}>
                    <img src={posterurl}></img>
                    <div className="moviecard-info">
                        <div className="moviecard-title">{title}</div>
                        <div className="moviecard-details">
                            <div className="language">
                                {language?.map((item, index) => (
                                    <span key={index}>
                                        {item}{index !== language.length - 1 ? ', ' : ''}
                                    </span>
                                ))}
                            </div>
                            <div className="genre">
                                {genre?.slice(0, 3)?.map((item, index) => (
                                    <span key={index}>
                                        {item}{index !== genre?.slice(0, 2)?.length - 1 ? ', ' : ''}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </>
    );
};


const Detailspage = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const [data, setData] = useState(null); // Initialize with null or {}
    const scrollRef = useRef(null);
    const [atStart, setAtStart] = useState(true);
    const [atEnd, setAtEnd] = useState(false);

    const checkScrollPosition = () => {
        const el = scrollRef.current;
        if (!el) return;

        setAtStart(el.scrollLeft <= 1);
        setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth);
    };

    useEffect(() => {
        const add = () => {
            const el = scrollRef.current;
            if (!el) return;
            checkScrollPosition()
            el.addEventListener("scroll", checkScrollPosition);
        }

        const remove = () => {
            const el = scrollRef.current;
            if (!el) return;
            el.removeEventListener("scroll", checkScrollPosition);
        }

        const timeoutId = setTimeout(() => {
            add();
        }, 100);

        return () => {
            clearTimeout(timeoutId);
            remove();
        };
    }, []);

    const handleScrollLeft = () => {
        const el = scrollRef.current;
        if (el) {
            el.scrollLeft -= el.clientWidth;
        }
    };

    const handleScrollRight = () => {
        const el = scrollRef.current;
        if (el) {
            el.scrollLeft += el.clientWidth;
        }
    };

    const SetScrollStart = () => {
        const el = scrollRef.current;
        if (el) {
            el.scrollLeft = 0;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/movies/${id}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                });

                if (!res.ok) {
                    throw new Error(`Error: ${res.status} ${res.statusText}`);
                }

                const result = await res.json();
                setData(result);
                console.log("Fetched details:", result);
                checkScrollPosition();
                SetScrollStart();
            } catch (err) {
                console.error("Failed to fetch details:", err);
            }
        };

        if (id) fetchData();
    }, [id]);

    const removeRepeat = (someData) => {
        const count = {};
        const newData = [];

        for (const item of someData) {
            if (count[item.name]) {
                count[item.name] += 1;
            } else {
                count[item.name] = 1;
            }
        }

        for (const item of someData) {
            if (count[item.name] && count[item.name] > 0) {
                newData.push(item);
                count[item.name] = 0;
            }
        }

        return newData.map((item, index) => (
            <DetailsCard key={index} data={item} />
        ));
    };

    return (
        <>
            <Header2 />
            {data && <Details_Banner data={data.movie} />}
            <div className="detailspage-details">
                <h1>Description</h1>
                <span>
                    {data?.movie?.description?.length > 0 ? data.movie.description : "No description available."}
                </span>
                <h1>Cast</h1>
                <div className="cast">
                    {data?.movie?.castDetails?.length > 0 ? (
                        (removeRepeat(data.movie.castDetails))
                    ) : (
                        <p>No cast available.</p>
                    )}
                </div>
                <h1>Crew</h1>
                <div className="crew">
                    {data?.movie?.crewDetails?.length > 0 ? (
                        (removeRepeat(data.movie.crewDetails))
                    ) : (
                        <p>No crew available.</p>
                    )}
                </div>
                <div className="display-cards">
                    <div className={`scroll-left ${!atStart ? "" : "hidden"}`} >
                        <MdKeyboardArrowLeft size={100} onClick={() => handleScrollLeft()} />
                    </div>
                    <div ref={scrollRef} className="scroll-div">
                        {data?.moviesYouAlsoLike?.map((item, index) => (
                            <MovieCard key={index} {...item} />
                        ))}
                    </div>
                    <div className={`scroll-right ${!atEnd ? "" : "hidden"}`} >
                        <MdKeyboardArrowRight size={100} onClick={() => handleScrollRight()} />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Detailspage;
