import React, { useState } from "react";
import { format } from "date-fns";
import Calendar from "./calendar/Calendar";
import Button from "./components/Button";
import "./CalendarApp.css";
import WeatherForecastYahoo from "../mainpage/ForeCastApi/WeatherForcastYahoo";

export default function CalendarApp() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleSetToday = () => setCurrentDate(new Date());

  return (
    <div className="calender-main-container">
            <WeatherForecastYahoo/>

      {/* <div className="calendar-header">
        <p>
          {format(currentDate, "dd LLLL yyyy")}
        </p>
      </div> */}
      {/* <Calendar value={currentDate} onChange={setCurrentDate} /> */}
    </div>
  );
};
