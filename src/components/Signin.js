import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { AuthContext } from "../context/AuthContext";
import "../style/authForm.scss";
import "../style/layout.scss";
import "../style/errors.scss";

import { post_auth } from "../request/post_auth_request";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { setUserData } = useContext(UserContext);
  const { setIsAuth } = useContext(AuthContext);
  const history = useHistory();

  function onEmailChange(e) {
    setEmail(e.target.value);
  }

  function onPasswordChange(e) {
    setPassword(e.target.value);
  }

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

  function getErrors(value) {
    return Object.values(value).filter((message) => message);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const { token, user, emailError, passwordError } = await post_auth(
      "signin",
      email,
      password
    );

    if (emailError || passwordError) {
      handleEmailErrors(getErrors(emailError));
      handlePasswordErrors(getErrors(passwordError));
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
    <div className="container-auth">
      <div className="container-auth-form">
        <h2>Logowanie</h2>
        <form className="form-auth">
          <input
            onChange={onEmailChange}
            type="text"
            name=""
            id="email"
            value={email}
            placeholder="Email"
          />
          {emailError ? <span className="error">{emailError}</span> : null}

          <input
            onChange={onPasswordChange}
            type="password"
            name=""
            id="password"
            value={password}
            placeholder="Hasło"
          />
          {passwordError ? (
            <span className="error">{passwordError}</span>
          ) : null}
          <button className="form-auth-button" onClick={handleSubmit}>
            Zaloguj się
          </button>
        </form>
        <p>
          Nie masz konta? <Link to="/signup">Zarejestruj się</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
