import React, { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useHistory } from "react-router-dom";
import { SERVER_URL } from "../../config/serverURL";
import Navbar from "../Nav/Navbar";
import "../../style/AddNote.scss";
import "../../style/layout.scss";
import InfoIcon from "@material-ui/icons/Info";

const AddNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");
  const { userData } = useContext(UserContext);

  const history = useHistory();

  async function createNote(e) {
    e.preventDefault();
    const res = await fetch(`${SERVER_URL}/note/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        content,
        user: userData.user,
      }),
    });
    const { errors } = await res.json();
    if (errors) {
      setTitleError(errors.title);
      setTimeout(() => {
        setTitleError(null);
      }, 2000);
      setContentError(errors.content);
      setTimeout(() => {
        setContentError(null);
      }, 2000);
    } else {
      history.push("/notes");
    }
  }

  return (
    <section className="container">
      <Navbar />
      <section className="container-page">
        <header className="container-header">
          <h1 className="header-text">Dodaj notatkę</h1>
        </header>
        <div className="add-note-form">
          <form>
            <input
              type="text"
              value={title}
              placeholder="Tytuł"
              maxLength="25"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <textarea
              value={content}
              placeholder="Zacznij pisać..."
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
            {titleError ? (
              <span className="error">
                <InfoIcon className="error-icon" />
                {titleError}
              </span>
            ) : null}
            {contentError ? (
              <span className="error">
                <InfoIcon className="error-icon" />
                {contentError}
              </span>
            ) : null}
            <button className="add-note-button" onClick={createNote}>
              Zapisz
            </button>
          </form>
        </div>
      </section>
    </section>
  );
};

export default AddNote;
