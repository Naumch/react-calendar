import moment from "moment";
import styled from 'styled-components';

const DayNamesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const DayName = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  color: #1f1f1f;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 0.55rem;
  margin-top: 0.5rem;
`;

const ArrowsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 80px;
`;

const ButtonTodayWrapper = styled.div`
  height: 50px;
  border-bottom: 1px solid #b3b3b3;
`;

const ButtonToday = styled.button`
  font-size: 1.5rem;
  color: #1f1f1f;
  margin-left: 0.5rem;
`;

function CalendarGridHeader({ prevHandler, todayHandler, nextHandler, startingPoint }) {
  const dayNames = [...Array(7)].map((_, i) => {
    return <DayName key={i}>{moment().day(i + 1).format('dd')}</DayName>
  })

  return <>
    <ButtonTodayWrapper>
      <ButtonToday onClick={todayHandler}>{moment().format('LL')}</ButtonToday>
    </ButtonTodayWrapper>
    <ButtonsWrapper>
      <div>{startingPoint.format('MMM YYYY')}</div>
      <ArrowsWrapper>
        <button onClick={prevHandler}>&#129121;</button>
        <button onClick={nextHandler}>&#129123;</button>
      </ArrowsWrapper>
    </ButtonsWrapper>
    <DayNamesWrapper>{dayNames}</DayNamesWrapper>
  </>
}

export default CalendarGridHeader;