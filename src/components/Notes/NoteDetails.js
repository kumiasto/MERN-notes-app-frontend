import React, { useEffect, useState, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import { SERVER_URL } from "../../config/serverURL";
import Navbar from "../Nav/Navbar";
import "../../style/NoteDetails.scss";
import "../../style/layout.scss";
import "../../style/button.scss";
import InfoIcon from "@material-ui/icons/Info";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const NoteDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [contentError, setContentError] = useState("");

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  const prevNote = usePrevious(noteContent);

  useEffect(() => {
    async function fetchData() {
      let token = localStorage.getItem("auth-token");
      const res = await fetch(`${SERVER_URL}/note/get`, {
        method: "GET",
        headers: { "x-auth-token": token, "note-id": id },
      });

      const { title, content } = await res.json();

      setNoteTitle(title);
      setNoteContent(content);
    }
    fetchData();
  }, []);

  async function updateNote() {
    const res = await fetch(`${SERVER_URL}/note/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        content: noteContent,
        title: noteTitle,
      }),
    });

    const data = await res.json();

    if (data.errors) {
      setContentError("Brakuje tytułu lub treści");
      setTimeout(() => {
        setContentError("");
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
          <ArrowBackIcon
            className="arrow-back-icon"
            style={{ fontSize: "2rem" }}
            onClick={() => {
              history.push("/notes");
            }}
          />
          <textarea
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
            className="header-textarea"
            maxLength="20"
          >
            {noteTitle}
          </textarea>
        </header>
        <div className="main-notes">
          <textarea
            className="note-details-content"
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
          ></textarea>
          {contentError ? (
            <span className="error">
              <InfoIcon />
              {contentError}
            </span>
          ) : null}

          {prevNote ? (
            <button className="update-note-button" onClick={updateNote}>
              Zapisz
            </button>
          ) : null}
        </div>
      </section>
    </section>
  );
};

export default NoteDetails;
