import React from 'react';

const Cell = ({ onClick, children, className, isActive = false }) => {



  const states = ['Cloudy','Sunny','Rainy','Snowy','Windy','Stormy']
  const tempratures = [16,29,8,-1,14,4]
  const images = ['cloudy.png','sunny.png','rainy.png','snowy.png','windy.png','stormy.png']
  let random = Math.round(Math.random()*100)%6;

  return (

    <div className={'calendar-cell-container ' + states[random]}>

      <div
        onClick={!isActive ? onClick : undefined}
        className={'calendar-cell '}>

        <div className={'weather-tab-degree-container'}>
         <h3 className='weather-tab-description'>{states[random]}</h3>

          <h3 className="weather-tab-degree">{tempratures[random]}</h3>
          <h3 className="weather-tab-unit">°C</h3></div>

          </div>

        <h1 className='calendar-day-text'>{children}</h1>

    </div>

  );
};

export default Cell;
