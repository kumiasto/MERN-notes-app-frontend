import React, { useContext, useEffect, useState } from "react";
import { Container, TextField } from "@material-ui/core";
import { NoteContext } from "../context/NoteContext";
import { get_notes } from "../request/get_notes";
import "../style/config.scss";
import Note from "../components/Note";
import Masonry from "react-masonry-css";
import { makeStyles } from "@material-ui/core";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
  return {
    container: {
      [theme.breakpoints.up("sm")]: {
        marginLeft: drawerWidth,
      },
      marginTop: "7vh",
    },
    search: {
      marginBottom: "5vh",
      textAlign: "center",
    },
  };
});

const AllNotes = () => {
  const { userNotes, setUserNotes } = useContext(NoteContext);
  const [title, setTitle] = useState("");
  const classes = useStyles();

  useEffect(() => {
    async function getNotes() {
      const data = await get_notes("/notes/get");
      setUserNotes(data);
    }
    getNotes();
  }, []);

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <Container className={classes.container}>
      <TextField
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={classes.search}
        label="Search note for title..."
        color="primary"
        fullWidth
        color="secondary"
        startAdorment
      />
      <Masonry
        breakpointCols={breakpoints}
        className="masonry-grid"
        columnClassName="masonry-grid_column"
      >
        {userNotes
          .filter((note) => {
            if (title === "") {
              return userNotes;
            } else if (
              note.title.toLowerCase().includes(title.toLocaleLowerCase())
            ) {
              return note;
            }
          })
          .map((note) => {
            return (
              <div key={note._id} item>
                <Note note={note} />
              </div>
            );
          })}
      </Masonry>
    </Container>
  );
};
export default AllNotes;
