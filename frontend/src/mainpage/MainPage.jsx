import React, { useState } from 'react';
import './mainpage.css';
import Calendar from '../calendar-components/CalendarApp';
import UpcomingPlans from './Upcoming plans/UpcomingPlans';
import WeatherForecastAccu from './ForeCastApi/WeatherForecastAccu';

export default function MainPage() {
    const [plans, setPlans] = useState([]);

    return (
        <div>
            {/* <h1>ForecastForge</h1> */}
            <h2 className="title">¡Bienvenido! ¿Qué planes tienes en mente?</h2>
            <h2 className="title-reflection">¡Bienvenido! ¿Qué planes tienes en mente?</h2>

            <UpcomingPlans plans={plans} setPlans={setPlans} />
            <WeatherForecastAccu />


            <Calendar />
        </div>
    );
}
