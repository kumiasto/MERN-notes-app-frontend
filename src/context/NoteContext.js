import React, { useState, createContext } from "react";

export const NoteContext = createContext();

const NoteContextProvider = (props) => {
  const [userNotes, setUserNotes] = useState([]);

  return (
    <NoteContext.Provider value={{ userNotes, setUserNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteContextProvider;
