import React, { useContext } from "react";
import { Route, useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ component: Component, ...data }) => {
  const { isAuth } = useContext(AuthContext);

  const history = useHistory();

  return (
    <Route
      {...data}
      render={(props) => {
        if (isAuth) {
          return <Component {...props} />;
        } else {
          return history.push("/signin");
        }
      }}
    />
  );
};

export default ProtectedRoute;
