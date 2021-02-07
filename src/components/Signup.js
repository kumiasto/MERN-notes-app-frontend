import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";

import { UserContext } from "../context/UserContext";
import { AuthContext } from "../context/AuthContext";

import "../style/Signup.scss";
import "../style/layout.scss";
import "../style/button.scss";
import "../style/form.scss";
import "../style/errors.scss";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { setUserData } = useContext(UserContext);
  const { setIsAuth } = useContext(AuthContext);

  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch("/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const { token, user, errors } = await res.json();

    if (errors) {
      setEmailError(errors.email);
      setTimeout(() => {
        setEmailError(null);
      }, 2000);
      setPasswordError(errors.password);
      setTimeout(() => {
        setPasswordError(null);
      }, 2000);
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
        <h2>Rejestracja</h2>
        <form className="form-auth">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            id="email"
            value={email}
            placeholder="Email"
          />
          {emailError ? <span className="error">{emailError}</span> : null}

          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            value={password}
            placeholder="Hasło"
          />
          {passwordError ? (
            <span className="error">{passwordError}</span>
          ) : null}

          <button className="form-container-button" onClick={handleSubmit}>
            Zarejestruj się
          </button>
        </form>
        <p>
          Masz konto? <Link to="/signin">Zaloguj się</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
