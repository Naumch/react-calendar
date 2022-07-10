import React from "react";

function Note({ notes, editUnix, setEditId, remItem }) {
  const result = notes.map(note => {
    if (note.unix === editUnix) {
      return (
        <div className="notes-item" key={note.id}>
          <p className="notes-item__text">
            {note.text}<br/>
            <small className="notes-item__btn-edit" onClick={() => setEditId(note.id)}>
              Редактировать...
            </small>
          </p>
          <button onClick={() => remItem(note.id)} className="notes-item__btn-delete">&#128937;</button>
        </div>
      )
    } else {
      return null;
    }
  })

  return [result];
}

export default Note;