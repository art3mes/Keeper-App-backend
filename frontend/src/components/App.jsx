import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]); //empty array

  function addNote(newNote) {
    setNotes((preValue) => {
      return [...preValue, newNote];
    });
  }
  function deleteNote(id) {
    setNotes((preValues) => {
      return preValues.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }
  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDeleteProp={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
