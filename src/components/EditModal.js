import { useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import { useHistory } from "react-router-dom";
import { pink } from "@material-ui/core/colors";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { update_note } from "../request/post_update_note";

const EditModal = ({ open, setOpen, note }) => {
  const useStyles = makeStyles((theme) => ({
    modalWrapper: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
    },
    modal: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: 600,
      backgroundColor: "#fff",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(5),
      borderRadius: theme.shape.borderRadius,
    },
    buttonWrapper: {
      display: "flex",
      justifyContent: "space-around",
      marginTop: "2vh",
      width: "100%",
    },
    btn: {
      color: "#fff",
      backgroundColor: pink[800],
      "&:hover": {
        backgroundColor: pink[900],
      },
    },
    title: {
      width: "100%",
      fontSize: "1.4rem",
      marginBottom: 30,
    },
    content: {
      width: "100%",
      fontSize: "1rem",
      lineHeight: "1.43",
      marginBottom: 30,
      color: "rgba(0, 0, 0, 0.54)",
    },
  }));
  const classes = useStyles();
  const history = useHistory();
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [contentError, setContentError] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setNoteContent(note.content);
    setNoteTitle(note.title);
  }, []);

  async function handleUpdate() {
    const data = await update_note(
      "/note/update",
      note._id,
      noteContent,
      noteTitle
    );

    if (data.errors) {
      setContentError("Brakuje tytułu lub treści");
      setTimeout(() => {
        setContentError("");
      }, 2000);
    } else {
      history.push("/");
      history.push("/notes");
    }
  }

  const body = (
    <div className={classes.modalWrapper}>
      <div className={classes.modal}>
        <TextareaAutosize
          aria-label="minimum height"
          minRows={3}
          placeholder="Title..."
          className={classes.title}
          onChange={(e) => setNoteTitle(e.target.value)}
        >
          {note.title}
        </TextareaAutosize>
        <TextareaAutosize
          aria-label="minimum height"
          minRows={15}
          placeholder="Content..."
          className={classes.content}
          color="textSecondary"
          onChange={(e) => setNoteContent(e.target.value)}
        >
          {note.content}
        </TextareaAutosize>
        <div className={classes.buttonWrapper}>
          <Button
            className={classes.btn}
            variant="contained"
            onClick={handleUpdate}
          >
            Update
          </Button>

          <Button
            className={classes.btn}
            variant="contained"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {body}
    </Modal>
  );
};

export default EditModal;
