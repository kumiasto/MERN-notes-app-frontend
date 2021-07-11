import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import { SERVER_URL } from "../config/serverURL";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { pink, teal } from "@material-ui/core/colors";
import { Typography } from "@material-ui/core";

const DeleteModal = ({ open, setOpen, note }) => {
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
      width: 400,
      backgroundColor: "#fff",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(5),
      borderRadius: theme.shape.borderRadius,
    },
    buttonWrapper: {
      display: "flex",
      justifyContent: "space-around",
      marginTop: "3vh",
      width: "100%",
    },
    btn: {
      color: "#fff",
      backgroundColor: pink[800],
      "&:hover": {
        backgroundColor: pink[900],
      },
    },
    header: {
      fontWeight: 700,
      marginBottom: 30,
      textAlign: "center",
    },
  }));
  const classes = useStyles();

  const history = useHistory();

  const handleClose = () => {
    setOpen(false);
  };

  async function handleDelete() {
    await fetch(`${SERVER_URL}/note/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: note._id,
      }),
    });

    history.push("/");
    history.push("/notes");
  }
  const body = (
    <div className={classes.modalWrapper}>
      <div className={classes.modal}>
        <Typography
          variant="h5"
          component="h2"
          color="textPrimary"
          className={classes.header}
        >
          Are you sure you want delete this note?
        </Typography>
        <div className={classes.buttonWrapper}>
          <Button
            className={classes.btn}
            variant="contained"
            onClick={handleDelete}
          >
            Delete
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

export default DeleteModal;
