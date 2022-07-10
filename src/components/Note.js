import React from "react";

function Note({ notes, editUnix, setEditId, remItem }) {
  const result = notes.map(note => {
    if (note.unix === editUnix) {
      return (
        <div className="notes__item" 
          key={note.id} 
          onClick={() => setEditId(note.id)}
        >
          <span>{note.text}</span>
          <button onClick={() => remItem(note.id)}>&#128937;</button>
        </div>
      )
    } else {
      return null;
    }
  })

  return [result];
}

export default Note;