import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Login_Header from './components/Login-components/Login_Header';
import Register_Header from './components/Register-components/Register_Header';
import Footer from './components/Footer';
import Banner from './components/Banner';
import Card from './components/Card';
import Loginpage from './components/Loginpage';
import Registerpage from './components/Registerpage';
import './App.css';

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

const LoginPage = () => (
  <>
    <Login_Header />
    <Loginpage />
  </>
);

const RegisterPage = () => (
  <>
    <Register_Header />
    <Registerpage />
  </>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;