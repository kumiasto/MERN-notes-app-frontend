import React, { useEffect, useState, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import Navbar from "../Nav/Navbar";
import "../../style/NoteDetails.scss";
import "../../style/layout.scss";
import InfoIcon from "@material-ui/icons/Info";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import { get_note_details } from "../../request/get_note_details_request";
import { update_note } from "../../request/post_update_note_request";

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
      const { title, content } = await get_note_details("/note/get", id);

      setNoteTitle(title);
      setNoteContent(content);
    }
    fetchData();
  }, []);

  async function updateNote() {
    const data = await update_note("/note/update", id, noteContent, noteTitle);

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
              <InfoIcon className="error-icon" />
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
