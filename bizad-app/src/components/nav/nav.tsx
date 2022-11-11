import { Link } from "react-router-dom";
import "./nav.css";

export const Nav = () => {
  return (
    <nav id="nav" className="navbar navbar-expand-lg text-bg-primary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          BizAd
        </a>

        <ul className="navbar-nav me-auto mb-2 mb-lg-0 flex-row ">
          <li className="nav-item px-2">
            <Link to="/">BizAd Home</Link>
          </li>
          <li className="nav-item px-2">
            <Link to="/services">Services</Link>
          </li>
          <li className="nav-item px-2">
            <Link to="/about">About</Link>
          </li>
        </ul>
        <ul className="navbar-nav d-flex flex-row">
          <li className="nav-item px-2">
            <Link to="/signup">SignUp</Link>
          </li>
          <li className="nav-item px-2">
            <Link to="/login">Login</Link>
          </li>
          <li className="nav-item px-2">
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
