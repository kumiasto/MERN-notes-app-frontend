import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import AddNote from "./pages/AddNote";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import UserContextProvider from "./context/UserContext";
import NoteContextProvider from "./context/NoteContext";
import AuthContextProvider from "./context/AuthContext";
import Home from "./pages/Home";
import "./style/font.scss";
import "./style/config.scss";
import { pink, purple, red, teal } from "@material-ui/core/colors";
import Layout from "./components/Layout";
import { AuthContext } from "./context/AuthContext";

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: pink,
    error: {
      main: red[500],
    },
  },
  typography: {
    fontFamily: "Lato",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AuthContextProvider>
          <UserContextProvider>
            <NoteContextProvider>
              <Layout>
                <Switch>
                  <Route path="/" exact>
                    <Redirect to="/notes" />
                  </Route>
                  <Route path="/signin" component={Signin} />
                  <Route path="/signup" component={Signup} />
                  <ProtectedRoute path="/notes" exact component={Home} />
                  <ProtectedRoute path="/note/add" component={AddNote} />
                  <Route path="*" component={NotFound} />
                </Switch>
              </Layout>
            </NoteContextProvider>
          </UserContextProvider>
        </AuthContextProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
