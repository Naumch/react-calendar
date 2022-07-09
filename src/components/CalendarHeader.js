import moment from "moment";

function CalendarHeader({ prevHandler, todayHandler, nextHandler, startingPoint }) {

  const dayNames = [...Array(7)].map((_, i) => {
    return (
      <div 
        className="calendar-header_day-name" 
        key={i}
      >
        {moment().day(i + 1).format('dd')}
      </div>
    )
  })

  return <>
    <div className="calendar-header_top">
      <button className="calendar-header_button-today" onClick={todayHandler}>{moment().format('LL')}</button>
    </div>
    <div className="calendar-header_bottom">
      <div>{startingPoint.format('MMM YYYY')}</div>
      <div className="calendar-header_arrow">
        <button onClick={prevHandler}>&#129121;</button>
        <button onClick={nextHandler}>&#129123;</button>
      </div>
    </div>
    <div className="grid">{dayNames}</div>
  </>
}

export default CalendarHeader;