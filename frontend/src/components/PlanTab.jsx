import React from 'react'
import './planTab.css'

export default function PlanTab({data}) {
  // Convert the date string to a Date object
  const dateObject = new Date(data.date);

  return (
    <div className='plan-tab-container'>
      <div className='weather-details-container'>
        <div className='weather-details'>
          {(
            <>
              <p className='weather-details-text'>{data.icon}</p>
              <p className='weather-details-text'>{data.text}</p>
              <div className="weather_degree">              
                <span className='weather-details-text high_degree'>{data.high}°</span>
                <span className='weather-details-text low_degree'>/{data.low}°</span>
              </div>
            </>
          )}
        </div>
      </div>
      <h1 className='plan-tab-title'>{data.name}</h1>
      <div className='plan-tab-content'>
        <div className='plan-tab-description'>
          <p className='plan-tab-description-text'>{data.location}</p>
        </div>
        <p className='weather-details-text'>
          {dateObject.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}{" "}
          {dateObject.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
}