import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import Navbar from "../Nav/Navbar";
import { UserContext } from "../../context/UserContext";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import "../../style/form.scss";
import "../../style/button.scss";
import "../../style/layout.scss";

const SearchNote = () => {
  const [note, setNote] = useState("");
  const [foundNote, setFoundNote] = useState([]);
  const { userData } = useContext(UserContext);

  async function fetchData(e) {
    e.preventDefault();
    const res = await fetch("/note/search", {
      method: "GET",
      headers: { "user-id": userData.user, "note-title": note },
    });
    const data = await res.json();
    const renderNotes = data.map(({ _id, title }) => {
      return (
        <div key={_id} className="notes-data">
          <div className="note-title">
            <Link to={`/note/${_id}`}>
              <p className="note-title-element" style={{ fontSize: "1.6rem" }}>
                {title}
              </p>
            </Link>
          </div>
        </div>
      );
    });

    let isNoteExist =
      renderNotes.length > 0 ? (
        renderNotes
      ) : (
        <span>Nie znaleziono notatki :(</span>
      );
    setFoundNote(isNoteExist);
  }

  return (
    <section className="container">
      <Navbar />
      <section className="container-page">
        <header className="container-header">
          <h1 className="header-text">Szukaj notatki</h1>
        </header>
        <form className="form-search-note" onSubmit={fetchData}>
          <input
            className="input-search-note"
            type="text"
            onChange={(e) => {
              setNote(e.target.value);
            }}
            placeholder="Wpisz tytuł..."
          />
          <button className="search-button">
            <ArrowForwardIcon style={{ fontSize: "2rem" }} />
          </button>
        </form>

        <div className="main-search">{foundNote}</div>
      </section>
    </section>
  );
};

export default SearchNote;
