import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { dark, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleUserLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className={`navbar navbar-expand-lg px-4 py-3 shadow-sm border-bottom ${
      dark ? "navbar-dark bg-black border-secondary" : "navbar-light bg-white border-light"
    }`}>
      <div className="container-fluid">
        <Link className="navbar-brand fw-extrabold fs-4 d-flex align-items-center gap-2 text-decoration-none" to={user ? "/dashboard" : "/login"}>

          <span className="fw-black text-success">TURFPLAY</span>
        </Link>
        
        <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <div className="navbar-nav align-items-center gap-2 mt-3 mt-lg-0">
            {user ? (
              <>
                <Link className="nav-link fw-bold px-3 text-success" to="/dashboard">📊 Dashboard</Link>
                <Link className="nav-link fw-bold px-3 text-success" to="/explore">🎯 Find Fields</Link>
                <Link className="nav-link fw-bold px-3 text-success" to="/bookings">📅 My Bookings</Link>
                <div className="px-3 py-1.5 bg-success bg-opacity-10 text-success rounded-pill text-xs fw-bold font-monospace">
                  👤 Active: {user.name}
                </div>
                <button type="button" className="btn btn-danger btn-sm px-4 py-2 rounded-3 fw-bold border-0 shadow-sm" onClick={handleUserLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link className="btn btn-success btn-sm px-4 py-2 rounded-3 fw-bold text-white text-decoration-none" to="/register">Create Account</Link>
                <Link className="btn btn-outline-success btn-sm px-4 py-2 rounded-3 fw-bold text-decoration-none ms-2" to="/login">Login</Link>
              </>
            )}

            <button 
              type="button" 
              className={`btn btn-sm ms-lg-3 rounded-circle d-flex align-items-center justify-content-center border-0 shadow-sm ${dark ? "btn-light" : "btn-secondary"}`} 
              onClick={toggleTheme} 
              style={{ width: "38px", height: "38px", fontSize: "1.1rem" }}
            >
              {dark ? "☀️" : "🌙"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;