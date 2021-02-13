import React from "react";
import { Link } from "react-router-dom";

import "../style/Welcome.scss";

const Welcome = () => {
  return (
    <div className="welcome-page">
      <div className="welcome-page-container">
        <h1>Wszystkie notatki w jednym miejscu!</h1>
        <div className="welcome-page-signin">
          <p>
            Jeżeli posiadasz konto możesz zalogować się klikając w poniższy
            przycisk
          </p>
          <Link to="/signin">
            <button className="welcome-page-button">Zaloguj się</button>
          </Link>
        </div>
        <div className="welcome-page-signup">
          <p>Możesz również utworzyć konto użytkownika</p>
          <Link to="/signup">
            <button className="welcome-page-button">Załóż konto</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
