import styled from "styled-components";

const NotesWrap = styled.div`
  width: 40%;
  margin-left: 50px;
  @media (max-width: 610px) {
    margin-left: 10px;
  }
  @media (max-width: 620px) {
    width: 80%;
    margin-top: 20px;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #9facba;
  width: 100%;
  padding: 10px;
  background-color: #f8f9fb;
`;

function Notes({ editUnix, notes, setEditId, getValue, changeItem, saveItem, remItem }) {

  return <NotesWrap>
    <Field>
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
    </Field>
    <div>
      {notes.map(note => {
        if (note.unix === editUnix) {
          return <Item 
            key={note.id} 
            onClick={() => setEditId(note.id)}
          >
            <span>{note.text}</span>
            <button onClick={() => remItem(note.id)}>&#128937;</button>
          </Item>;
        } else {
          return null;
        }
      })}
    </div>
  </NotesWrap>;
}


export default Notes;