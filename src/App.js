import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import About from './components/About';
import ContactUs from './components/ContactUs';
import Home from './components/Home';
import NoteState from './context/notes/NoteState';
import ScrollToTopButton from './components/ScrollToTopButton';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Alert from './components/Alert';
import React, { useState } from 'react';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
        msg: message,
        type: type
    });
    setTimeout(() => {
        setAlert(null);
    }, 1500);
}
  return (
    <>
      <NoteState>
        <Router>
          <Navbar showAlert={showAlert}/>
          <Alert alert={alert}/>
          <ScrollToTopButton/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert}/>} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/contactus" element={<ContactUs />} />
              <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
              <Route exact path="/signup" element={<SignUp showAlert={showAlert}/>} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </NoteState>
    </>

  );
}

export default App;
