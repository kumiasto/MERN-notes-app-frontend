import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "../../style/header.scss";

import { AuthContext } from "../../context/AuthContext";
import Brightness2Icon from "@material-ui/icons/Brightness2";
import WbSunnyIcon from "@material-ui/icons/WbSunny";

const Header = () => {
  const { isAuth } = useContext(AuthContext);
  const [darkTheme, setDarkTheme] = useState(false);
  const [button, setButton] = useState(
    <Brightness2Icon className="dark-mode-icon" />
  );

  function changeTheme() {
    const span = document.querySelector(".change-theme-toggle");
    span.classList.toggle("dark");

    if (span.classList.contains("dark")) {
      setButton(<WbSunnyIcon className="dark-mode-icon" />);
    } else {
      setButton(<Brightness2Icon className="dark-mode-icon" />);
    }

    setDarkTheme(!darkTheme);

    if (!darkTheme) {
      document.body.style.filter = "invert(1) hue-rotate(180deg)";
    } else {
      document.body.style.filter = "";
    }
  }

  return (
    <header className="header">
      <nav className="header-nav">
        {!isAuth ? (
          <Link to="/">
            <div className="logo">Notes app</div>
          </Link>
        ) : (
          <Link to="/notes">
            <div className="logo">Notes app</div>
          </Link>
        )}
        <div className="header-buttons">
          <button onClick={changeTheme} className="change-theme">
            <span className="change-theme-toggle">{button}</span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
