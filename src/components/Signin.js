import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { SERVER_URL } from "../config/serverURL";
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

  function onEmailChange(e) {
    setEmail(e.target.value);
  }

  function onPasswordChange(e) {
    setPassword(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch(`${SERVER_URL}/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const { token, user, emailError, passwordError } = await res.json();

    if (emailError || passwordError) {
      const errEmail = Object.values(emailError).filter((message) => message);
      setEmailError(errEmail);
      setTimeout(() => {
        setEmailError(null);
      }, 2000);

      const errPassword = Object.values(passwordError).filter(
        (message) => message
      );
      setPasswordError(errPassword);
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
          <button className="form-container-button" onClick={handleSubmit}>
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
