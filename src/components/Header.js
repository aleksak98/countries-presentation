import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../App";
import { Link } from "react-router-dom";

const Header = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleChangeTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <div className="header-wrapper">
      <div className="container container-header">
        <div>
          <Link to={"/"}>
            <h1 className="header-title">Where in the world?</h1>
          </Link>
        </div>
        <div className="mode-wrapper" onClick={handleChangeTheme}>
          <img
            src={theme === "dark" ? "/images/moon-regular.svg" : "/images/moon-solid.svg"}
            className="mode-image"
            alt="mode"
          />
          <span className="mode-text">{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
