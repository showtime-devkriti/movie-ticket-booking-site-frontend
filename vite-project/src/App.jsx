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
import getHome from './components/Home/getRecommened'
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
import Add_Shows from './Add_Shows';
import Add_Screens from './Add_Screens';
import Book_Preview from './Book_Preview';
import Forgot_Password from './Forgot_Password';
import Cancel from './Cancel';
import Verify from "./Verify"

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

const Carousel = ({ title, movies, index }) => {
    const scrollRef = useRef(null);
    const [atStart, setAtStart] = useState(true);
    const [atEnd, setAtEnd] = useState(false);

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
                </div>
                <div className={`scroll-right ${!atEnd ? "" : "hidden"}`} onClick={() => handleScroll('right')}>
                    <MdKeyboardArrowRight size={50} />
                </div>
            </div>
        </div>
    );
};

const HomePage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();


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

    const [data, setData] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            try {
                const result = await getHome();
                sessionStorage.setItem("url", JSON.stringify(result))
                console.log(result)
                setLoading(false)
            } catch (err) {
                console.error("Failed to fetch data:", err);
                setError(err.message);
                setLoading(false)
            }
        };

        const res = sessionStorage.getItem("url")
        let parsed
        try {
            parsed = res ? JSON.parse(res) : [];
        } catch (e) {
            console.error("Failed to parse localStorage movie data:", e);
        }
        if (parsed == []) {
            fetchData();
        } else {
            setData(parsed);
            setLoading(false)
        }

    }, []);

    if (loading) return <div className="loader-container" >
        <div className="loader"></div>
    </div>

    return <>
        <Header />
        <Banner data={data?.banners} />
        <Carousel title="Now Showing" movies={data?.recommended} />
        <Carousel title="Comedy" movies={data?.comedy} />
        <Carousel title="Crime" movies={data?.crime} />
        <Carousel title="Action and Adventure" movies={data?.actionAndAdventure} />
        <Carousel title="Romance" movies={data?.romance} />
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
                <Route path='/admin' element={<Dashboard />} />
                <Route path='/admin/profile' element={<Admin_Profile />} />
                <Route path="/admin/login" element={<Admin_Login />} />
                <Route path="/admin/shows" element={<Add_Shows />} />
                <Route path="/admin/screens" element={<Add_Screens />} />
                <Route path='/book-preview' element={<Book_Preview />} />
                <Route path='/forgot' element={<Forgot_Password />} />
                <Route path='/verify' element={<Verify />} />
                <Route path='/cancel' element={<Cancel />} />
            </Routes>
        </Router>
    );
}

export default App;