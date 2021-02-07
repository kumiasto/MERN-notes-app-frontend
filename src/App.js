import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./style/config.scss";
import Header from "./components/Nav/Header";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Notes from "./components/Notes/Notes";
import Welcome from "./components/Welcome";
import AddNote from "./components/Notes/AddNote";
import SearchNote from "./components/Notes/SearchNote";
import NoteDetails from "./components/Notes/NoteDetails";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import UserContextProvider from "./context/UserContext";
import NoteContextProvider from "./context/NoteContext";
import AuthContextProvider from "./context/AuthContext";

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <UserContextProvider>
          <NoteContextProvider>
            <div className="App">
              <Header />
              <Switch>
                <Route path="/" exact component={Welcome} />
                <Route path="/signin" component={Signin} />
                <Route path="/signup" component={Signup} />
                <ProtectedRoute path="/notes" exact component={Notes} />
                <ProtectedRoute path="/note/add" component={AddNote} />
                <ProtectedRoute path="/note/search" component={SearchNote} />
                <ProtectedRoute path="/note/:id" component={NoteDetails} />
                <Route path="*" component={NotFound} />
              </Switch>
            </div>
          </NoteContextProvider>
        </UserContextProvider>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
