import moment from 'moment';
import styled from 'styled-components';
import CalendarGridHeader from './CalendarGridHeader';

const CalendarWrapper = styled.div`
  max-width: 280px;
  border-bottom: 1px solid #b3b3b3;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

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

const CurrentDay = styled.div`
  width: 80%;
  height: 80%;
  border-radius: 50%;
  background-color: #e7ebee;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
`;

const SelectedDay = styled.div`
  width: 80%;
  height: 80%;
  border-radius: 50%;
  background-color: #9facba;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
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
      {isCurrentDay(day) && !isSelectedDay(day) && <CurrentDay>{day.format('D')}</CurrentDay>}
      {isSelectedDay(day) && <SelectedDay>{day.format('D')}</SelectedDay>}   
    </Button>
  }); 

  return <CalendarWrapper>
    <CalendarGridHeader 
      prevHandler={prevHandler}
      todayHandler={todayHandler}
      nextHandler={nextHandler}
      startingPoint={startingPoint}
    />
    <Grid>
      {result}
    </Grid>
  </CalendarWrapper>
}

export default CalendarGrid;