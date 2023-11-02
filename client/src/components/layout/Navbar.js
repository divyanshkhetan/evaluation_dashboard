import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import AuthContext from "../../contexts/auth/authContext";

const Navbar = () => {
  const location = useLocation();
  const authContext = useContext(AuthContext);

  const { user, logout } = authContext;
  return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{padding: "0 3.5rem"}}>
        <Link to="/" className="navbar-brand">
          <span className="fs-4">{user ? user.name : "Guest"}</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <div className="navbar-nav">
            <Link
              to="/dashboard"
              className={`nav-link ${
                location.pathname === "/dashboard" ? "active" : ""
              }`}
              aria-current="page"
            >
              View
            </Link>
            <Link
              to="/dashboard/assign"
              className={`nav-link ${
                location.pathname === "/dashboard/assign" ? "active" : ""
              }`}
            >
              Assign
            </Link>
            <Link
              to="/dashboard/marks"
              className={`nav-link ${
                location.pathname === "/dashboard/marks" ? "active" : ""
              }`}
            >
              Marks
            </Link>
            <Link
              to="/"
              className="nav-link text-danger"
              onClick={() => logout()}
            >
              Logout
            </Link>
          </div>
        </div>
      </nav>
  );
};

export default Navbar;
