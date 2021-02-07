import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <h2>Podana strona nie istnieje :(</h2>
      <Link to="/">
        <h3>Wróć do strony głównej</h3>
      </Link>
    </>
  );
};

export default NotFound;
