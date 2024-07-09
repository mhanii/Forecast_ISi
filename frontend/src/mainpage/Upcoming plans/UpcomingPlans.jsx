import React, { useState, useEffect } from 'react';
import './UpcomingPlans.css';
import PlanTab from '../../components/PlanTab';
import { useIP } from '../../common/Context';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import RequireAuth from '../../common/tools/RequireAuth';
import axios from 'axios';
import Cookies from 'js-cookie';
import CSRFToken from '../../common/CSRFToken';

export default function UpcomingPlans() {
    const { weatherForecast } = useIP();
    const [plans, setPlans] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newPlan, setNewPlan] = useState({
        name: '',
        type: '',
        location: '',
        date: null,
        text: null,
        high: null,
        low:null,
        icon: null
    });

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await axios.get('https://fullstack-forecast-forge-03fcfb305bcd.herokuapp.com/plans/get_plans', {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'X-CSRFToken': Cookies.get('csrftoken'),
                    },
                    withCredentials: true,
                });
                setPlans(response.data.plans);
                console.log(response.data);
            } catch (err) {
                console.error('Error fetching plans', err);
            }
        };

        fetchPlans();
    }, []);

    const handleInputChange = (e) => {
        setNewPlan({ ...newPlan, [e.target.name]: e.target.value });
    };

    const getWeatherEmoji = (code) => {
        switch (code) {
            case 32: return '☀️';
            case 24: return '💨';
            case 11: return '🌧️';
            case 34: return '⛅';
            default: return '🌤️';
        }
    };

    const today = new Date();
    const maxDate = new Date(today);
    if (weatherForecast?.forecasts) {
        maxDate.setDate(maxDate.getDate() + weatherForecast.forecasts.length - 1);
    }
    const handleDateChange = (date) => {
        const timeDiff = date.getTime() - today.getTime();
        let daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24)) + 1;

        let weatherData = null;
        if (weatherForecast?.forecasts) {
            weatherData = weatherForecast.forecasts[daysDiff];
        }

        setNewPlan({
            ...newPlan,
            date: date,
            text: weatherData ? weatherData.text : null,
            high: weatherData ? Math.round(weatherData.high) : null,
            low: weatherData ? Math.round(weatherData.low) : null,
            icon: weatherData ? getWeatherEmoji(weatherData.code) : null
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, type, location, date } = newPlan;
        const planData = { name, type, location, date };

        try {
            const response = await axios.post('https://fullstack-forecast-forge-03fcfb305bcd.herokuapp.com/plans/add_plan', planData, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-CSRFToken': Cookies.get('csrftoken'),
                },
                withCredentials: true,
            });
            if (response.data.success) {
                setPlans([...plans, newPlan]);
                setShowForm(false);
                setNewPlan({
                    name: '',
                    type: '',
                    location: '',
                    date: null
                });
        }
            console.log("This should work")
            
        } catch (err) {
            console.error('Error adding plan', err);
        }
    };

    const handleFormClick = () => {
        setShowForm(true);
    };

    return (
        <div className='upcoming-plans-container'>
            {plans && plans.length > 0 ? (<></>) : (<h1 className='upcoming-plans-title'>¡Sin planes!</h1>)}
            <div className="upcoming-plans">
                {plans && plans.length > 0 ? (
                    plans.map((plan, i) => <PlanTab key={i} data={plan} />)
                ) : (
                    <></>
                )}

                <div className="upcoming-plans-empty">
                    {!showForm ? (
                        <div className='add-plan-container' onClick={handleFormClick}>
                            <h1 className='add-plan-button'>+</h1>
                        </div>
                    ) : (
                        <RequireAuth>
                            <form className="add-plan-form" onSubmit={handleSubmit}>
                                <CSRFToken/>
                                <input 
                                    type="text" 
                                    name="name" 
                                    placeholder="Nombre de la actividad" 
                                    value={newPlan.name} 
                                    onChange={handleInputChange} 
                                    required 
                                />
                                <select 
                                    name="type" 
                                    value={newPlan.type} 
                                    onChange={handleInputChange} 
                                    required
                                >
                                    <option value="">Tipo de actividad</option>
                                    <option value="Sports">Deportes</option>
                                    <option value="Social">Social</option>
                                    <option value="Work">Trabajo</option>
                                </select>
                                <select 
                                    name="location" 
                                    value={newPlan.location} 
                                    onChange={handleInputChange} 
                                    required
                                >
                                    <option value="">Ubicación</option>
                                    <option value="Indoor">Interior</option>
                                    <option value="Outdoor">Exterior</option>
                                </select>
                                <DatePicker
                                    selected={newPlan.date}
                                    onChange={handleDateChange}
                                    showTimeSelect
                                    dateFormat="Pp"
                                    minDate={today}
                                    maxDate={maxDate}
                                    placeholderText="Select Date & Time"
                                    required
                                />
                                <button type="submit">Agregar Plan</button>
                            </form>
                        </RequireAuth>
                    )}
                </div>
            </div>
        </div>
    );
}
