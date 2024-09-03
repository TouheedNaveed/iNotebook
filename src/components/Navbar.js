import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
const Navbar = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        props.showAlert(`${localStorage.getItem('userName')} Logout successfully.`, "success");
        navigate('/login');
    }
    const userName = localStorage.getItem('userName');
    return (
        <>
            <nav className="navbar fixed-top navbar-expand-lg bg-warning navbar-light">
                <div className="container-fluid">
                    <img style={{ height: "50px", width: '50px', marginRight: "10px", cursor: 'pointer', borderRadius: "10px" }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpLDnWRgP0r1EMgyGAQVparQTc1ywznq7zew&s" alt="" />
                    <Link className="navbar-brand" style={{ fontWeight: "bold" }} to="/">iNotebook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0" >
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                            </li>
                            <li>
                                <Link className={`nav-link ${location.pathname === "/contactus" ? "active" : ""}`} aria-current="page" to="/contactus">Contact Us</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('token') ? <form className="d-flex gap-3">
                            <Link type="button" className="btn btn-dark rounded" role='button' to="/login">Login</Link>
                            <Link type="button" className="btn btn-light rounded" role='button' to="/signup">Sign up</Link>
                        </form> :
                            <>
                                <span className="navbar-text mx-3" style={{fontWeight:"bold"}}><i class="fa-solid fa-user mx-2"></i>{userName}</span>
                                <button onClick={handleLogout} className='btn btn-dark rounded'>Logout</button>
                            </>
                        }
                    </div>
                </div>
            </nav>

        </>
    )
}

export default Navbar
