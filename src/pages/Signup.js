import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { AuthContext } from "../context/AuthContext";

import { post_auth } from "../request/post_auth";
import { Button, Container, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    minHeight: "90vh",
  },
  form: {
    width: "80%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  input: {
    marginTop: "5vh",
  },
  button: {
    marginTop: "5vh",
    width: "40%",
  },
  p: {
    marginTop: "3vh",
    letterSpacing: ".1vh",
  },
  link: {
    fontWeight: 700,
    "&:hover": {
      textDecoration: "underline",
    },
  },
});

const Signup = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { setUserData } = useContext(UserContext);
  const { setIsAuth } = useContext(AuthContext);
  const history = useHistory();

  function handleEmailErrors(errMessage) {
    setEmailError(errMessage);
    setTimeout(() => {
      setEmailError(null);
    }, 2000);
  }

  function handlePasswordErrors(errMessage) {
    setPasswordError(errMessage);
    setTimeout(() => {
      setPasswordError(null);
    }, 2000);
  }
  function onEmailChange(e) {
    setEmail(e.target.value);
  }

  function onPasswordChange(e) {
    setPassword(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const { token, user, errors } = await post_auth("signup", email, password);

    if (errors) {
      handleEmailErrors(errors.email);
      handlePasswordErrors(errors.password);
    } else {
      localStorage.setItem("auth-token", token);
      setUserData({
        token,
        user,
      });
      setIsAuth(true);
      history.push("/notes");
    }
  }

  return (
    <Container className={classes.container}>
      <Typography variant="h3" component="h2" align="center">
        Create your account
      </Typography>
      <form noValidate autoComplete="off" className={classes.form}>
        <TextField
          value={email}
          onChange={onEmailChange}
          label="Email"
          variant="outlined"
          fullWidth
          color="secondary"
          className={classes.input}
          required
          error={emailError}
        ></TextField>
        {emailError && (
          <Typography
            variant="body2"
            component="p"
            align="center"
            className={classes.error}
          >
            {emailError}
          </Typography>
        )}
        <TextField
          value={password}
          onChange={onPasswordChange}
          label="Password"
          variant="outlined"
          fullWidth
          color="secondary"
          type="password"
          className={classes.input}
          required
          error={passwordError}
        ></TextField>
        {passwordError && (
          <Typography
            variant="body2"
            component="p"
            align="center"
            className={classes.error}
          >
            {passwordError}
          </Typography>
        )}
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="secondary"
          className={classes.button}
        >
          Sign up
        </Button>
      </form>
      <Typography
        variant="body1"
        component="p"
        align="center"
        className={classes.p}
      >
        You have an acoount?
        <Link to="/signin" className={classes.link}>
          {" "}
          Log in.
        </Link>
      </Typography>
    </Container>
  );
};

export default Signup;
