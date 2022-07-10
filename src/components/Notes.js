import React from "react";

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

  return <div className="notes-wrapper">
    <div className="notes__field">
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
      })}
    </div>
  </div>;
}


export default Notes;