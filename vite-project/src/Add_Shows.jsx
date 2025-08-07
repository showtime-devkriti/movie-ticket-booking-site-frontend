import React, { useState, useEffect } from "react";
import "./Add_Shows.css";
import Sidebar from "./components/Admin-Sidebar/Sidebar";
import { TbSelect } from "react-icons/tb";
import { GiConfirmed } from "react-icons/gi";
import Cookies from "js-cookie";
import { FaSearch } from "react-icons/fa";
import api from "./components/getData";
import png from "/src/assets/user.png";
import DetailsCard from "./components/Details-components/Details_Card";
import { useNavigate } from "react-router-dom";
import { IoMenu } from "react-icons/io5";

const SeatClass = ({ seatStructure, className, setClass, info, setInfo }) => {
    const PriceHandler = (e) => {
        const { name, value } = e.target;
        setClass((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handler = (e) => {
        const { name, value } = e.target;
        setInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <>
            <div className={`screen-info ${seatStructure?.length ? "" : "hidden"}`}>
                <table>
                    <thead>
                        <tr>
                            <th>Class</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {seatStructure?.map((element, i) => (
                            <tr key={i}>
                                <td>{element.class}</td>
                                <td>
                                    <input name={element.class} type="text" placeholder="Price" value={className[element.class] || ""} onChange={PriceHandler} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="shows-showinfo">
                <div className="shows-language">
                    Language
                    <input type="text" name="language" placeholder="Enter Language" value={info.language} onChange={handler} />
                </div>
                <div className="shows-format">
                    Format
                    <input type="text" name="format" placeholder="Enter Format" value={info.format} onChange={handler} />
                </div>
                <div className="shows-showtime">
                    Showtime <input type="text" name="showtime" placeholder="Enter Showtime (e.g., 07:30 PM)" value={info.showtime} onChange={handler} />
                </div>
                <div className="shows-date">
                    Date <input type="date" name="date" placeholder="Enter Date" value={info.date} onChange={handler} />
                </div>
            </div>
        </>
    );
};

const Screen = ({ screen, isEdit, onEditToggle, movieData }) => {
    const [className, setClass] = useState({});
    const [info, setInfo] = useState({
        language: "",
        format: "",
        showtime: "",
        date: "",
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (screen?.seatStructure) {
            const initialPrices = {};
            screen.seatStructure.forEach((seatClass) => {
                initialPrices[seatClass.class] = "";
            });
            setClass(initialPrices);
        }
    }, [screen?.seatStructure]);

    //useEffect(() => { console.log(className) }, [className])

    function convertTo24HourFormat(time12h) {
        const [time, modifier] = time12h.trim().split(" ");
        let [hours, minutes] = time.split(":").map(Number);

        if (modifier?.toLowerCase() === "pm" && hours < 12) {
            hours += 12;
        } else if (modifier?.toLowerCase() === "am" && hours === 12) {
            hours = 0;
        }

        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00.000`;
    }

    const post = async () => {
        const isoTimestamp = new Date(
            `${info.date}T${convertTo24HourFormat(info.showtime)}Z`
        ).toISOString();
        const admin = Cookies.get("admin");

        if (!admin) {
            navigate("/admin/login");
            return;
        }

        const prices = Object.entries(className).reduce((acc, [key, value]) => {
            acc[key] = Number(value);
            return acc;
        }, {});
        console.log(prices)

        const res = await fetch(
            `http://localhost:3000/api/admin/showtime/${screen._id}`,
            {
                method: "POST",
                headers: {
                    authorization: `Bearer ${admin}`,
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    movieid: movieData.imdb_id,
                    language: info.language,
                    starttime: isoTimestamp,
                    format: info.format,
                    price: prices,
                }),
            }
        );
        if (res.ok) window.location.reload();
    };

    return (
        <>
            <div className="my-screen">
                <p>{screen?.screenName}</p>
                {!isEdit && (
                    <button onClick={onEditToggle}>
                        Select <TbSelect />
                    </button>
                )}
                {isEdit && (
                    <button onClick={post}>
                        Confirm <GiConfirmed />
                    </button>
                )}
            </div>
            <div className="my-screen-edit">
                {isEdit && (
                    <SeatClass seatStructure={screen?.seatStructure} className={className} setClass={setClass} info={info} setInfo={setInfo} />
                )}
            </div>
        </>
    );
};

const Add_Shows = () => {
    const [screen, setScreen] = useState(null);
    const [editingScreenId, setEditingScreenId] = useState(null);
    const [movieId, setMovieId] = useState("");
    const [movieData, setMovieData] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleEditToggle = (id) => {
        setEditingScreenId((prevId) => (prevId === id ? null : id));
    };

    useEffect(() => {
        const admin = Cookies.get("admin");
        setLoading(true);

        if (!admin) navigate("/");

        const fetchData = async () => {
            try {
                const getScreens = await fetch(
                    "http://localhost:3000/api/admin/getscreen",
                    {
                        method: "GET",
                        headers: {
                            authorization: `Bearer ${admin}`,
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                    }
                ).then((res) => res.json());
                setScreen(getScreens);
            } catch (error) {
                console.error("Failed to fetch screens:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

    const idHandler = (e) => {
        setMovieId(e.target.value);
    };

    const search = async () => {
        if (!movieId) return;
        setLoading(true);
        const result = await api.getMovie(movieId);
        setMovieData(result);
        setLoading(false);
    };

    const removeRepeat = (someData) => {
        const seen = new Set();
        return someData
            ?.filter((item) => {
                if (seen.has(item.name)) {
                    return false;
                }
                seen.add(item.name);
                return true;
            })
            .slice(0, 3)
            .map((item, index) => <DetailsCard key={index} data={item} />);
    };

    const convert = () => {
        if (!movieData?.runtime) return "";
        let screenTime = parseInt(movieData.runtime);
        const hrs = Math.floor(screenTime / 60);
        const min = screenTime % 60;
        return `${hrs}hr ${min}min`;
    };

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
            <div className="add-shows-wrapper">
                {loading && (
                    <div className="loader-container">
                        <div className="loader"></div>
                    </div>
                )}
                <Sidebar isSidebar={isSidebar} setIsSidebar={setIsSidebar} />
                {isMobile ? (
                    <div className="admin-menu">
                        <button onClick={() => { setIsSidebar(!isSidebar) }}><IoMenu size={50} /></button>
                    </div>
                ) : <></>}
                <div className="add-shows">
                    <h1>My Shows</h1>
                    <div className="movie-search">
                        <input type="text" value={movieId} placeholder="Movie ID" onChange={idHandler} ></input>
                        <button onClick={search}> Search <FaSearch />
                        </button>
                    </div>
                    {!movieData && <div>Search for a movie to add a show.</div>}
                    {movieData && (
                        <div className="admin-movie-preview">
                            <div className="movie-preview">
                                <img src={movieData.poster_path ? `https://image.tmdb.org/t/p/original${movieData.poster_path}` : png} alt={movieData?.title} />
                                <div className="movie-preview-text">
                                    <h1>{movieData?.title}</h1>
                                    <p>{movieData?.description}</p>
                                    <div className="preview-timings">
                                        <div className="admin-language">
                                            {movieData?.languages?.map((item, index) => (
                                                <span key={index}>
                                                    {item}
                                                    {index !== movieData.languages.length - 1 ? ", " : ""}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="admin-genre">
                                            {movieData?.genres?.map((item, index) => (
                                                <span key={index}>
                                                    {item}
                                                    {index !== movieData.genres.length - 1 ? ", " : ""}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="admin-runtime">{convert()}</div>
                                    </div>
                                </div>
                            </div>
                            <h1>Cast</h1>
                            <div className="cast">
                                {movieData?.cast?.length > 0 ? (
                                    removeRepeat(movieData.cast)
                                ) : (
                                    <p>No cast available.</p>
                                )}
                            </div>
                            <h1>Crew</h1>
                            <div className="crew">
                                {movieData?.crew?.length > 0 ? (
                                    removeRepeat(movieData.crew)
                                ) : (
                                    <p>No crew available.</p>
                                )}
                            </div>
                        </div>
                    )}
                    {movieData && (
                        <div className="my-screens">
                            {screen?.screens?.map((screen) => (
                                <Screen key={screen._id} screen={screen} isEdit={editingScreenId === screen._id} onEditToggle={() => handleEditToggle(screen._id)} movieData={movieData} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Add_Shows;