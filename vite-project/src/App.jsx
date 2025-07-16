import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
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

    const [data, setData] = useState({ recommended: [] });
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/home", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                });

                if (!res.ok) {
                    throw new Error(`Error: ${res.status} ${res.statusText}`);
                }

                const result = await res.json();
                setData(result); // JSON is already parsed
                console.log("Fetched data:", result);
            } catch (err) {
                console.error("Failed to fetch data:", err);
                setError(err.message);
            }
        };

        fetchData();
    }, []);

    // useEffect(() => {
    //     const token = Cookies.get("token");
    //     console.log("Current token:", token);

    //     // Example: Redirect to login if no token and not already on login page
    // }, [location]);

    if (loading) return <div>Loading...</div>;

    return <>
        <Header />
        <Banner data={data.banners}/>
        <div className="showing"><h1>Now Showing</h1></div>
        <div className="display-cards">
            {data?.recommended?.map((item, index) => {
                return <Card key={index} {...item} />
            })}
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
                <Route path="/home" element={<Home />} />
                <Route path="/theatre" element={<Theatrepage />} />
            </Routes>
        </Router>
    );
}

export default App;