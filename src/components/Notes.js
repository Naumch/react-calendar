import React from "react";

function Notes({ editUnix, notes, setEditId, getValue, changeItem, saveItem, remItem }) {

  return <div className="notes_wrapper">
    <div className="notes_field">
      <input 
        placeholder="Добавить напоминание"
        value={getValue('text')}
        onChange={event => changeItem('text', event)}
        className="input"
      />
      <button 
        className="btn" 
        onClick={saveItem}
      >
        Сохранить
      </button>
    </div>
    <div>
      {notes.map(note => {
        if (note.unix === editUnix) {
          return (
            <div className="notes_item" 
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
      })}
    </div>
  </div>;
}


export default Notes;