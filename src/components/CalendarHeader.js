import moment from "moment";

function CalendarHeader({ startingPoint, setStartingPoint }) {

  const prevHandler = () => setStartingPoint(prev => prev.clone().subtract(1, 'month'));
  const todayHandler = () => setStartingPoint(moment());
  const nextHandler = () => setStartingPoint(next => next.clone().add(1, 'month'));

  const dayNames = [...Array(7)].map((_, i) => {
    return (
      <div 
        className="calendar-header__day-name" 
        key={i}
      >
        {moment().day(i + 1).format('dd')}
      </div>
    )
  })

  return (
    <>
      <div className="calendar-header__top">
        <button className="calendar-header__button-today" onClick={todayHandler}>{moment().format('LL')}</button>
      </div>
      <div className="calendar-header__bottom">
        <div>{startingPoint.format('MMM YYYY')}</div>
        <div className="calendar-header__arrow">
          <button onClick={prevHandler}>&#129121;</button>
          <button onClick={nextHandler}>&#129123;</button>
        </div>
      </div>
      <div className="grid">{dayNames}</div>
    </>
  )
}

export default CalendarHeader;