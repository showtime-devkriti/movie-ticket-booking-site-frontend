import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import About_Header from './components/About-components/About_Header';
import Details_Header from './components/Details-components/Details_Header';
import Footer from './components/Footer';
import Banner from './components/Banner';
import Card from './components/Card';
import Loginpage from './Loginpage';
import Aboutpage from './Aboutpage';
import Detailspage from './Detailspage';
import './App.css';
import Home from "./components/Home/Home";

const HomePage = () => (
    <>
        <Header />
        <Banner />
        <div className="showing"><h1>Now Showing</h1></div>
        <div className="display-cards">
            <Card /><Card /><Card /><Card />
            <Card /><Card /><Card /><Card />
        </div>
        <Footer />
    </>
);

const AboutPage = () => (
    <>
        <About_Header />
        <Aboutpage />
        <Footer />
    </>
);

const DetailsPage = () => (
    <>
        <Details_Header />
        <Detailspage />
        <Footer />
    </>
)

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
                <Route path="/about" element={<AboutPage />} />
                <Route path="/details" element={<DetailsPage />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </Router>
    );
}

export default App;