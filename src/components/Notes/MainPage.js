import React, { useContext, useEffect } from "react";
import Navbar from "../Nav/Navbar";
import AllNotes from "./AllNotes";
import { NoteContext } from "../../context/NoteContext";
import "../../style/Notes.scss";
import "../../style/layout.scss";
import { get_note } from "../../request/get_note_request";

const MainPage = () => {
  const { userNotes, setUserNotes } = useContext(NoteContext);

  useEffect(() => {
    async function getNotes() {
      const data = await get_note("/notes/get");

      setUserNotes(data);
    }
    getNotes();
  }, []);

  return (
    <section className="container">
      <Navbar />
      <section className="container-page">
        <header className="container-header">
          <h1 className="header-text">Moje notatki</h1>
        </header>
        <div className="main">
          <div className="notes-info">
            <AllNotes userNotes={userNotes} />
          </div>
        </div>
      </section>
    </section>
  );
};

export default MainPage;
