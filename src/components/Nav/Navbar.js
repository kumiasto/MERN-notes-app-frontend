import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import SearchIcon from "@material-ui/icons/Search";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { UserContext } from "../../context/UserContext";
import { NoteContext } from "../../context/NoteContext";
import { AuthContext } from "../../context/AuthContext";
import "../../style/navigation.scss";

const Navbar = () => {
  const { setUserData } = useContext(UserContext);
  const { setUserNotes } = useContext(NoteContext);
  const { setIsAuth } = useContext(AuthContext);

  const history = useHistory();

  function userLogout() {
    setUserData({
      token: "",
      id: "",
    });
    localStorage.setItem("auth-token", "");
    setUserNotes([]);
    setIsAuth(false);
    history.push("/");
  }

  return (
    <nav className="navbar-nav">
      <Link to="/notes">
        <HomeIcon className="navbar-icon" style={{ fontSize: "2.5rem" }} />
      </Link>
      <Link to="/note/add">
        <NoteAddIcon className="navbar-icon" style={{ fontSize: "2.5rem" }} />
      </Link>
      <Link to="/note/search">
        <SearchIcon className="navbar-icon" style={{ fontSize: "2.5rem" }} />
      </Link>
      <ExitToAppIcon
        onClick={userLogout}
        className="navbar-icon"
        style={{ fontSize: "2.5rem", cursor: "pointer" }}
      />
    </nav>
  );
};

export default Navbar;
