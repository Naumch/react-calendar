import React, { useState } from 'react';
import CalendarGrid from './CalendarGrid';
import Notes from './Notes';
import { nanoid } from 'nanoid';
import moment from 'moment';
import styled from 'styled-components';
import localization from 'moment/locale/ru';

const Wrap = styled.div`
	display: flex;
	justify-content: center;
	max-width: 1200px;
	margin: 60px auto;
	@media (max-width: 620px) {
		flex-direction: column;
		align-items: center;
	}
`;

moment.updateLocale('en', {week: {dow: 1}});
moment.updateLocale('ru', localization);

function App() {
  const [startingPoint, setStartingPoint] = useState(moment());
  const firstDay =  startingPoint.clone().startOf('month').startOf('week');
	const totalDays = 42;
  const day = firstDay.clone().subtract(1, 'day');
  const days = [...Array(totalDays)].map(() => day.add(1, 'day').clone());

	const prevHandler = () => setStartingPoint(prev => prev.clone().subtract(1, 'month'));
  const todayHandler = () => setStartingPoint(moment());
  const nextHandler = () => setStartingPoint(next => next.clone().add(1, 'month'));
	
	const [editUnix, setEditUnix] = useState(moment().startOf('day').unix());

	const initNotes = [
		{unix: 1657227600, id: nanoid(), text: "25 современных шедевров маслом, которые надоедят к следующему уикенду"},
		{unix: 1657227600, id: nanoid(), text: "100 самых великолепных деревьев, о которых узнала наука в последнее время"},
		{unix: 1656968400, id: nanoid(), text: "100500 чертовски милых записок от людей, которые меняют сознание"},
		{unix: 1656536400, id: nanoid(), text: "Сорок самых ярких участников «Евровидения», для которых природа не пожалела красок"},
		{unix: 1652994000, id: nanoid(), text: "105 крутых способов занять детей, которым действительно можно верить"}
	];

  const [notes, setNotes] = useState(initNotes);
  const [obj, setObj] = useState(getInitObj()); 
	const [editId, setEditId] = useState(null);
	
  function getInitObj() {
		return {
      unix: editUnix,
			id: nanoid(),
			text: ''
		};
	};
	window.moment = moment;

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
  
  return <Wrap>
    <CalendarGrid 
			notes={notes}
      setEditUnix={setEditUnix}
      setObj={setObj}
      obj={obj}
			startingPoint={startingPoint}
			prevHandler={prevHandler}
			todayHandler={todayHandler}
			nextHandler={nextHandler}
			days={days}
			editUnix={editUnix}
    />
    <Notes 
      editUnix={editUnix} 
      notes={notes} 
      setEditId={setEditId}
      getValue={getValue}
      changeItem={changeItem}
      saveItem={saveItem}
			remItem={remItem}
    />
  </Wrap>; 
}

export default App;
