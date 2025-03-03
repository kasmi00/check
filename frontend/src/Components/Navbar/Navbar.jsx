// Navbar.js

import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useLocation } from "../../context/LocationProvider";
import Search from "../Search/Search";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(true);
  const { toggleViewNearbyPosts, nearby } = useLocation();
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const isLoggedIn = true; // For example purposes, replace with actual login state

  return (
    <div className={`navbar ${isMenuOpen ? "open" : ""}`}>
      <img className="logo" src={logo} alt="Logo" />
      <div className="menu-icon" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <div
        className="menu-items"
        style={{ display: isMenuOpen ? "flex" : "none" }}
      >
        <Link to="/">Home</Link>
        <Link to="/lend">Lend</Link>
        <Link to="/rent">Rent</Link>
        <Link to="/login">Login</Link>
        <a style={{ color: "white" }} onClick={toggleViewNearbyPosts}>
          {nearby}
        </a>
        {isLoggedIn && (
          <Link to="/login" className="profile-btn">
            Logout
          </Link>
        )}
      </div>
      <div className="search">
        <Search />
      </div>
    </div>
  );
};

export default Navbar;
