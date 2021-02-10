import React, { useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { SERVER_URL } from "../../config/serverURL";
import Navbar from "../Nav/Navbar";
import { NoteContext } from "../../context/NoteContext";
import "../../style/Notes.scss";
import "../../style/layout.scss";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const MainPage = () => {
  const { userNotes, setUserNotes } = useContext(NoteContext);

  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      let token = localStorage.getItem("auth-token");
      const res = await fetch(`${SERVER_URL}/notes/get`, {
        method: "GET",
        headers: { "x-auth-token": token },
      });
      const data = await res.json();
      if (data) {
        const renderNotes = data.map(({ _id, title, createdAt }) => {
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
                    <EditIcon />
                  </button>
                </Link>
              </div>
              <div className="note-button">
                <button
                  className="delete-button"
                  onClick={() => deleteNote(_id)}
                >
                  <DeleteIcon />
                </button>
              </div>
            </div>
          );
        });
        setUserNotes(renderNotes);
      }
    }

    fetchData();
  }, []);

  async function deleteNote(userId) {
    const res = await fetch(`${SERVER_URL}/note/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: userId,
      }),
    });
    history.push("/");
    history.push("/notes");
  }

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
