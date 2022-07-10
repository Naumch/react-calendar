import React, { useState } from 'react';
import Calendar from './Calendar';
import Notes from './Notes';
import { nanoid } from 'nanoid';
import moment from 'moment';
import localization from 'moment/locale/ru';

moment.updateLocale('en', {week: {dow: 1}});
moment.updateLocale('ru', localization);

const initNotes = [
	{unix: 1657227600, id: nanoid(), text: "25 современных шедевров маслом, которые надоедят к следующему уикенду"},
	{unix: 1657227600, id: nanoid(), text: "100 самых великолепных деревьев, о которых узнала наука в последнее время"},
	{unix: 1656968400, id: nanoid(), text: "100500 чертовски милых записок от людей, которые меняют сознание"},
	{unix: 1656536400, id: nanoid(), text: "Сорок самых ярких участников «Евровидения», для которых природа не пожалела красок"},
	{unix: 1652994000, id: nanoid(), text: "105 крутых способов занять детей, которым действительно можно верить"}
];

function App() {
  const [notes, setNotes] = useState(initNotes);
	const [editId, setEditId] = useState(null);
	const [editUnix, setEditUnix] = useState(moment().startOf('day').unix());
	const [obj, setObj] = useState(getInitObj()); 

	function getInitObj() {
		return {
      unix: editUnix,
			id: nanoid(),
			text: ''
		};
	};
  
  return <div className='wrap'>
    <Calendar 
			notes={notes}
			obj={obj}
			setObj={setObj}
			editUnix={editUnix}
      setEditUnix={setEditUnix}
    />
    <Notes 
      editUnix={editUnix} 
      notes={notes} 
			setNotes={setNotes}
			editId={editId}
      setEditId={setEditId}
			obj={obj}
			setObj={setObj}
			getInitObj={getInitObj}
    />
  </div>; 
}

export default App;
