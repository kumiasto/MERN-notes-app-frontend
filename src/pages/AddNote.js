import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useHistory } from "react-router-dom";
import { Container, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { add_note } from "../request/post_add_note";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import { pink, red } from "@material-ui/core/colors";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
  return {
    container: {
      [theme.breakpoints.up("sm")]: {
        marginLeft: drawerWidth,
      },
    },
    field: {
      marginTop: 20,
    },
    error: {
      color: red[500],
      fontWeight: 600,
    },
    button: {
      marginTop: 30,
      color: "#fff",
      backgroundColor: pink[800],
      "&:hover": {
        backgroundColor: pink[900],
      },
    },
  };
});

const AddNote = () => {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [contentError, setContentError] = useState(false);
  const { userData } = useContext(UserContext);
  const history = useHistory();

  async function handleSubmit(e) {
    const { errors } = await add_note(
      "/note/add",
      title,
      content,
      userData.user
    );

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
    <Container className={classes.container}>
      <Typography
        variant="h4"
        component="h2"
        color="textPrimary"
        gutterBottom
        className={classes.header}
      >
        Add new note
      </Typography>
      <form noValidate autoComplete="off">
        <TextField
          value={title}
          onChange={(e) => {
            e.preventDefault();
            setTitle(e.target.value);
          }}
          label="Title"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          className={classes.field}
          error={titleError}
        />
        {titleError && (
          <Typography
            variant="body2"
            component="p"
            align="center"
            className={classes.error}
          >
            {titleError}
          </Typography>
        )}
        <TextField
          value={content}
          onChange={(e) => {
            e.preventDefault();
            setContent(e.target.value);
          }}
          label="Content"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          multiline
          rows={15}
          className={classes.field}
          error={contentError}
        />
        {contentError && (
          <Typography
            variant="body2"
            component="p"
            align="center"
            className={classes.error}
          >
            {contentError}
          </Typography>
        )}
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={handleSubmit}
          className={classes.button}
        >
          Save
        </Button>
      </form>
    </Container>
  );
};

export default AddNote;
