import React from 'react';
import { Link } from 'react-router-dom';

const Footer=()=>{
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

    let date = new Date();
    return (
      <footer className="bg-warning text-dark py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mb-3 mb-md-0">
              <h5>About The iNotebook</h5>
              <p className="small">
              Join the iNotebook community today and experience the convenience of having all your notes in one place, easily accessible at any time.
              </p>
            </div>
            <div className="col-md-3 mb-3 mb-md-0">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li><Link to="/" className="text-dark" onClick={scrollToTop}>Home</Link></li>
                <li><Link to="/about" className="text-dark" onClick={scrollToTop}>About Us</Link></li>
                <li><Link to="/contactus" className="text-dark" onClick={scrollToTop}>Contact Us</Link></li>
              </ul>
            </div>
            <div className="col-md-3">
              <h5 className='text-dark'>Follow Us</h5>
              <div className="d-flex gap-3">
                <a href="https://www.facebook.com/" className="text-dark"><i className="fa-brands fa-facebook"></i></a>
                <a href="https://twitter.com/" className="text-dark"><i className="fa-brands fa-twitter"></i></a>
                <a href="https://instagram.com/" className="text-dark"><i className="fa-brands fa-instagram"></i></a>
                <a href="https://www.linkedin.com/" className="text-dark"><i className="fa-brands fa-linkedin-in"></i></a>
              </div>
            </div>
          </div>
          <div className="text-center mt-3">
            <p className="small mb-0 text-dark">&copy; {date.getFullYear()} iNotebook. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
}

export default Footer;
