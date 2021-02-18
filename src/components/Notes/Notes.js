import React, { useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Navbar from "../Nav/Navbar";
import { NoteContext } from "../../context/NoteContext";
import "../../style/Notes.scss";
import "../../style/layout.scss";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import { get_note } from "../../request/get_note_request";
import { delete_note } from "../../request/delete_note_request";

const MainPage = () => {
  const { userNotes, setUserNotes } = useContext(NoteContext);

  const history = useHistory();

  useEffect(() => {
    async function renderNotes() {
      const data = await get_note("/notes/get");

      const notes = data.map(({ _id, title, createdAt }) => {
        return (
          <div key={_id} className="notes-data">
            <div className="note-title">
              <Link to={`note/${_id}`}>
                <p className="note-title-element">{title}</p>
              </Link>
            </div>
            <div className="note-date">
              <p className="note-date-element">{createdAt.slice(0, 10)}</p>
            </div>
            <div className="note-button">
              <Link to={`note/${_id}`}>
                <button className="edit-button">
                  <EditIcon className="edit-button-icon" />
                </button>
              </Link>
            </div>
            <div className="note-button">
              <button
                className="delete-button"
                onClick={async () => {
                  await delete_note("/note/delete", _id);
                  history.push("/");
                  history.push("/notes");
                }}
              >
                <DeleteIcon className="delete-button-icon" />
              </button>
            </div>
          </div>
        );
      });
      setUserNotes(notes);
    }
    renderNotes();
  }, []);

  return (
    <section className="container">
      <Navbar />
      <section className="container-page">
        <header className="container-header">
          <h1 className="header-text">Moje notatki</h1>
        </header>
        <div className="main">
          <div className="notes-info">{userNotes}</div>
        </div>
      </section>
    </section>
  );
};

export default MainPage;
