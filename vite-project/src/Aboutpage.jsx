import React from 'react';
import './Aboutpage.css';
import About from './components/About-components/About';
import About_Header from './components/About-components/About_Header';
import Footer from './components/Footer';

const Aboutpage = () => {
    return (
        <>
            <About_Header />
            <About />
            <Footer />
        </>
    );
};

export default Aboutpage;