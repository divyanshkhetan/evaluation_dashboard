import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import AuthContext from "../../contexts/auth/authContext";

const Navbar = () => {
  const location = useLocation();
  const authContext = useContext(AuthContext);

  const { user, logout } = authContext;
  return (
    
    <div
      className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
      style={{ width: "10rem", height: "100vh", textAlign: "center", position: "absolute" }}
    >
      <a
        href="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        style={{ textAlign: "center", width: "100%" }}
      >
        <span className="fs-4" style={{ width: "100%" }}>
          {user ? user.name : "Guest"}
        </span>
      </a>
      <hr />
      <ul
        className="nav nav-pills flex-column mb-auto"
        style={{ textAlign: "center" }}
      >
        <li className="nav-item">
          <Link
            to="/dashboard"
            className={`nav-link ${
              location.pathname === "/dashboard" ? "active" : ""
            }`}
            aria-current="page"
          >
            View
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/dashboard/assign"
            className={`nav-link ${
              location.pathname === "/dashboard/assign" ? "active" : ""
            }`}
          >
            Assign
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/dashboard/marks"
            className={`nav-link ${
              location.pathname === "/dashboard/marks" ? "active" : ""
            }`}
          >
            Marks
          </Link>
        </li>
        <li className="nav-item">
          <button
            style={{ border: "none", color: "red", background: "inherit" }}
            onClick={() => logout()}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
