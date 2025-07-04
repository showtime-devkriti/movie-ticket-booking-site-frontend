import React from 'react';
import './Footer.css';
import {Link} from 'react-router-dom';

const Footer =  ()=>{
    return (
        <>
            <footer>
                <Link to="/about"><h1>About</h1></Link>
            </footer>
        </>
    );
};

export default Footer;