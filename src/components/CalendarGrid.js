import moment from 'moment';
import styled from 'styled-components';
import CalendarHeader from './CalendarHeader';

const Button = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  color: ${props => props.isSelectedMonth ? '#1f1f1f' : '#b3b3b3'};
  position: relative;
  &::after {
    content: ${props => props.thereIsANote ? '"_"' : '""'};
    position: absolute;
    top: 16px;
    left: 16px;
    font-weight: 700;
    color: green;
  }
`;

function CalendarGrid({ setEditUnix, setObj, obj, days, editUnix, notes,       
                        prevHandler, todayHandler, nextHandler, startingPoint }) {
  
  const isSelectedMonth = (day) => startingPoint.isSame(day, 'month');
  const isCurrentDay = (day) => moment().isSame(day, 'day');
  const isSelectedDay = (day) => day.unix() === editUnix;
  const thereIsANote = (day, notes) => {
    return notes.some(note => note.unix === day.unix());
  };

  const result = days.map(day => {
    return <Button 
			key={day.unix()}
      thereIsANote={thereIsANote(day, notes)}
      isSelectedMonth={isSelectedMonth(day)}
			onClick={() => {
        setEditUnix(day.unix());
        setObj({...obj, unix: day.unix()});
      }}
		> 
      {!isCurrentDay(day) && !isSelectedDay(day) && day.format('D')}
      {isCurrentDay(day) && !isSelectedDay(day) && <div className='day-wrapper current-day'>{day.format('D')}</div>}
      {isSelectedDay(day) && <div className='day-wrapper selected-day'>{day.format('D')}</div>}   
    </Button>
  }); 

  return <div className='calendar-wrapper'>
    <CalendarHeader 
      prevHandler={prevHandler}
      todayHandler={todayHandler}
      nextHandler={nextHandler}
      startingPoint={startingPoint}
    />
    <div className='grid'>
      {result}
    </div>
  </div>
}

export default CalendarGrid;