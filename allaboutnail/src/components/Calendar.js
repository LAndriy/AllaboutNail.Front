import React, { useState, useEffect } from 'react';
import '../Style/Calendar.css';

const daysOfWeek = ['Pon.', 'Wto.', 'Śro.', 'Czw.', 'Pią.', 'Sob.'];
const monthNames = [
    'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
    'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'
];

const Calendar = ({ reservations, onSlotSelect }) => {
    const [currentWeekOffset, setCurrentWeekOffset] = useState(0);
    const [startDate, setStartDate] = useState(new Date());

    useEffect(() => {
        const today = new Date();
        const dayOfWeek = today.getDay();
        const shift = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;
        const newStartDate = new Date(today);
        newStartDate.setDate(today.getDate() + shift + currentWeekOffset * 7);
        setStartDate(newStartDate);
    }, [currentWeekOffset]);

    const generateDays = () => {
        const days = [];
        for (let i = 0; i < 6; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            days.push(date);
        }
        return days;
    };

    const handleSlotClick = (slotTime, fullDate) => {
        if (onSlotSelect) {
            onSlotSelect(fullDate);
        }
    };

    return (
        <div className='reservation-container'>
        <div className="calendar">
            <div className="month-year-header">
                {monthNames[startDate.getMonth()]} {startDate.getFullYear()}
            </div>
            <div className="days-container">
                {generateDays().map((date, index) => (
                    <div key={index} className="day-column">
                        <div className="day-header">
                            {daysOfWeek[index]} <br />
                            {date.getDate().toString().padStart(2, '0')}.
                            {(date.getMonth() + 1).toString().padStart(2, '0')}
                        </div>
                        {Array.from({ length: 7 }, (_, idx) => 8 + idx * 1.5).map(hour => {
                            const slotTime = `${Math.floor(hour).toString().padStart(2, '0')}:${hour % 1 === 0 ? '00' : '30'}`;
                            const fullDate = `${date.getFullYear()}-${(date.getMonth() + 1)
                                .toString()
                                .padStart(2, '0')}-${date.getDate()
                                .toString()
                                .padStart(2, '0')} ${slotTime}`;
                            const isReserved = reservations.some(r => r.datetime === fullDate);

                            return (
                                <button
                                    key={slotTime}
                                    className={`time-slot ${isReserved ? 'reserved' : ''}`}
                                    onClick={() => handleSlotClick(slotTime, fullDate)}
                                    disabled={isReserved}
                                >
                                    {slotTime}
                                </button>
                            );
                        })}
                    </div>
                ))}
            </div>
            <div className="navigation-buttons">
                <button onClick={() => setCurrentWeekOffset(currentWeekOffset - 1)}>{'<'}</button>
                <button onClick={() => setCurrentWeekOffset(currentWeekOffset + 1)}>{'>'}</button>
            </div>
        </div>
        </div>
    );
};

export default Calendar;
