import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "../../style/navigation.scss";
import "../../style/button.scss";

import { AuthContext } from "../../context/AuthContext";
import Brightness2Icon from "@material-ui/icons/Brightness2";
import WbSunnyIcon from "@material-ui/icons/WbSunny";

const Header = () => {
  const { isAuth } = useContext(AuthContext);
  const [darkTheme, setDarkTheme] = useState(false);
  const [button, setButton] = useState(
    <Brightness2Icon style={{ fontSize: "2rem" }} />
  );

  function changeTheme() {
    const span = document.querySelector(".change-theme-toggle");
    span.classList.toggle("dark");

    if (span.classList.contains("dark")) {
      setButton(
        <WbSunnyIcon className="light-icon" style={{ fontSize: "2rem" }} />
      );
    } else {
      setButton(<Brightness2Icon style={{ fontSize: "2rem" }} />);
    }

    setDarkTheme(!darkTheme);

    if (!darkTheme) {
      document.body.style.filter = "invert(1) hue-rotate(180deg)";
    } else {
      document.body.style.filter = "";
    }
  }

  return (
    <header>
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
          {!isAuth ? (
            <>
              <Link to="/signup" className="header-link">
                <button className="header-signup">Załóż konto</button>
              </Link>
              <Link to="/signin" className="header-link">
                <button className="header-signin">Zaloguj się</button>
              </Link>
            </>
          ) : null}
          <button onClick={changeTheme} className="change-theme">
            <span className="change-theme-toggle">{button}</span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
