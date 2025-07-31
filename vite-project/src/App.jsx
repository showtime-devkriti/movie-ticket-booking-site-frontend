import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, Link } from 'react-router-dom';
import Cookies from "js-cookie"
import Header from './components/Header';
import Footer from './components/Footer';
import Banner from './components/Banner';
import Card from './components/Card';
import Loginpage from './Loginpage';
import Aboutpage from './Aboutpage';
import Detailspage from './Detailspage';
import './App.css';
import Home from "./components/Home/Home";
import Theatrepage from './Theatrepage';
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import Movies from './components/AllMovies/Movies';
import Theatres from './components/AllTheatres/Theatres';
import api from './components/getData'
import User from './User';
import Booking_History from './Booking_History';
import FAQ from './FAQ';
import Contact from './Contact';
import PP from './PP';
import TC from './TC';
import Booktickets from './Booktickets';
import Seat_Layout from './Seat_Layout';
import Admin_Profile from './Admin_Profile';
import Admin_Login from './components/Login-components/Admin_Login';
import Dashboard from './Dashboard';

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

const HomePage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    const scrollRef = useRef([null, null, null, null, null]);
    const [atStart, setAtStart] = useState([true, true, true, true, true]);
    const [atEnd, setAtEnd] = useState([false, false, false, false, false]);

    const checkScrollPosition = (el, index) => {
        if (!el) return;

        const isAtStart = el.scrollLeft <= 1;
        const isAtEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth;

        // console.log(`Element ${index}:`, {
        //     scrollLeft: el.scrollLeft,
        //     clientWidth: el.clientWidth,
        //     scrollWidth: el.scrollWidth,
        //     isAtStart,
        //     isAtEnd,
        // });

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

        const addScrollListeners = () => {
            elements.forEach((el, index) => {
                if (!el) return;

                checkScrollPosition(el, index);

                const handler = () => checkScrollPosition(el, index);
                el.addEventListener("scroll", handler);

                handlers[index] = handler;
            });
        };

        const removeScrollListeners = () => {
            elements.forEach((el, index) => {
                if (!el || !handlers[index]) return;
                el.removeEventListener("scroll", handlers[index]);
            });
        };

        const timeoutId = setTimeout(() => {
            addScrollListeners();
        }, 10);

        return () => {
            clearTimeout(timeoutId);
            removeScrollListeners();
        };
    }, [loading])

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
        const token = Cookies.get("token");

        if (!token) {
            setUser(null);
            setLoading(false);
            return;
        }

        fetch("http://localhost:3000/api/auth/validate", {
            method: "GET",
            headers: {
                "authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            credentials: "include",
        }).then((res) => {
            if (!res.ok) throw new Error("Invalid token");
            return res.json();

        }).then(data => {
            console.log("User data:", data);
            setUser(data.user);
            navigate("/home");
            setLoading(false);
        }).catch(err => {
            console.error("Token validation failed:", err);
            setUser(null);
            setLoading(false);
        })

        
    }, []);

    const [data, setData] = useState({ recommended: [] });
    const [error, setError] = useState(null);

    useEffect(() => {
        const elements = scrollRef.current;
        const fetchData = async () => {
            try {
                // const res = await fetch("http://localhost:3000/api/home", {
                //     method: "GET",
                //     headers: { "Content-Type": "application/json" },
                //     credentials: "include",
                // });

                // if (!res.ok) {
                //     throw new Error(`Error: ${res.status} ${res.statusText}`);
                // }

                // const result = await res.json();

                //const result = api.getallmovies()
                //setData(result); 
                //console.log("Fetched data:", result);
                elements.forEach((el, index) => {
                    if (!el) return;
                    checkScrollPosition(el, index);
                    SetScrollStart(index);
                });
            } catch (err) {
                console.error("Failed to fetch data:", err);
                setError(err.message);
            }
        };

        fetchData();

        
        
    }, []); 

    if (loading) return <div className="loader-container" >
        <div className="loader"></div>
    </div>

    return <>
        <Header />
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
};

const ScrollToTop = () => {
    const { pathname, key } = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        }); // scroll to top-left corner
    }, [key]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

};

function App() {
    return (
        <Router>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Loginpage />} />
                <Route path="/about" element={<Aboutpage />} />
                <Route path="/movies" element={<Detailspage />} />
                <Route path="/movies/all" element={<Movies />} />
                <Route path="/theatres" element={<Theatres />} />
                <Route path="/home" element={<Home />} />
                <Route path="/theatre" element={<Theatrepage />} />
                <Route path="/FAQ" element={<FAQ />} />
                <Route path="/contact" element={<Contact />} />
                <Route path='/privacypolicy' element={<PP />} />
                <Route path='/termsandconditions' element={<TC />} />
                <Route path="/user" element={<User />} />
                <Route path='/booking-history' element={<Booking_History />} />
                <Route path='/book-tickets' element={<Booktickets />} />
                <Route path='/seat-layout' element={<Seat_Layout />} />
                <Route path='admin' element={<Dashboard />} />
                <Route path='/admin/profile' element={<Admin_Profile />} />
                <Route path="/admin/login" element={<Admin_Login />} />
            </Routes>
        </Router>
    );
}

export default App;