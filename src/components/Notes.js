import React from "react";
import Note from "./Note";

function Notes({ editUnix, notes, setNotes, editId, setEditId, obj, setObj, getInitObj }) {

  function remItem(id) {
    setNotes(notes.filter(note => note.id !== id));
  }

  function getValue(prop) {
		if (editId) {
			return notes.reduce((res, note) => 
      note.id === editId ? note[prop] : res, ''); 
		} else {
			return obj[prop];
		}
	}
	
	function changeItem(text, event) {
		if (editId) {
			setNotes(notes.map(note =>
				note.id === editId ? {...note, [text]: event.target.value} : note 
			));
		} else {
			setObj({...obj, [text]: event.target.value});
		}
	}
	
	function saveItem() {
		if (editId) {
			setEditId(null);
		} else if (!editId && editUnix) {
			setNotes([...notes, obj]);
			setObj(getInitObj());
		}
	}

  return (
    <div className="notes-wrapper">
      <div className="notes-field">
        <input 
          placeholder="Добавить напоминание"
          value={getValue('text')}
          onChange={event => changeItem('text', event)}
          className="notes-field__input"
        />
        <button className="notes-field__btn-save" onClick={saveItem}>
          Сохранить
        </button>
      </div>
      <div>
        <Note 
          notes={notes} 
          editUnix={editUnix} 
          setEditId={setEditId} 
          remItem={remItem}
        />
      </div>
    </div>
  )
}

export default Notes;