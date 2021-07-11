import React, { useContext, useEffect } from "react";
import { Container } from "@material-ui/core";
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
      marginTop: "10vh",
    },
  };
});

const AllNotes = () => {
  const { userNotes, setUserNotes } = useContext(NoteContext);
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
      <Masonry
        breakpointCols={breakpoints}
        className="masonry-grid"
        columnClassName="masonry-grid_column"
      >
        {userNotes.map((note) => {
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
