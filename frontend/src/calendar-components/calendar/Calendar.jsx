import React from 'react';


import {
  add,
  differenceInDays,
  endOfMonth,
  format,
  setDate,
  startOfMonth,
  sub,
} from "date-fns";
import Cell from "./Cell";

const weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar = ({ value = new Date(), onChange }) => {
  const startDate = startOfMonth(value);
  const endDate = endOfMonth(value);
  const numDays = differenceInDays(endDate, startDate) + 1;

  const prefixDays = startDate.getDay();
  const suffixDays = 6 - endDate.getDay();

  const handleClickPrevMonth = () => onChange(sub(value, { months: 1 }));
  const handleClickNextMonth = () => onChange(add(value, { months: 1 }));
  const handleClickPrevYear = () => onChange(sub(value, { years: 1 }));
  const handleClickNextYear = () => onChange(add(value, { years: 1 }));

  const handleClickDate = (index) => {
    const date = setDate(value, index);
    onChange(date);
  };

  return (
    <div className="calendar-container">
      <div className="calendar-navigation-container">
        <h3 onClick={handleClickPrevYear}>{"<<"}</h3>
        <h2 onClick={handleClickPrevMonth}>{"< "}</h2>
        <h1 className="col-span-3">{format(value, "LLLL yyyy")}</h1>
        <h2 onClick={handleClickNextMonth}>{" >"}</h2>
        <h3 onClick={handleClickNextYear} className='the-right-arrow-right'>{">>"}</h3>
      </div>

      <div className="calendar-body-container">
        <div className="calendar-daynames-container">
          {weeks.map((week, index) => (
            <h2 key={index} className="text-xs font-bold uppercase">{week}</h2>
          ))}
        </div>

        <div className="calendar-days-container">
          {Array.from({ length: prefixDays }).map((_, index) => {
            const prevMonthEndDate = endOfMonth(sub(value, { months: 1 }));
            return (
              <Cell key={index} className="suffix-or-prefix">
                {prevMonthEndDate.getDate() - prefixDays + index + 1}
              </Cell>
            );
          })}

          {Array.from({ length: numDays }).map((_, index) => {
            const date = index + 1;
            const isCurrentDate = date === value.getDate();

            return (
              <Cell
                key={index}
                isActive={isCurrentDate}
                onClick={() => handleClickDate(date)}
              >
                {date}
              </Cell>
            );
          })}

          {Array.from({ length: suffixDays }).map((_, index) => (
            <Cell key={index} className="suffix-or-prefix">
              {index + 1}
            </Cell>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
