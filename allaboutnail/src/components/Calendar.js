import React, { useState, useEffect } from 'react';
import '../Style/Calendar.css';

const daysOfWeek = ['Pon.', 'Wto.', 'Śro.', 'Czw.', 'Pią.', 'Sob.'];
const monthNames = [
    'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
    'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'
];

const Calendar = ({ reservations, onSlotSelect, selectedSlot }) => {
    const [currentWeekOffset, setCurrentWeekOffset] = useState(0);
    const [startDate, setStartDate] = useState(new Date());
    const [timeSlots] = useState([
        '08:00', '09:30', '11:00', '12:30', '14:00', '15:30',
        '17:00', '18:30'
    ]);

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

    const isSlotAvailable = (dateStr, timeStr) => {
        const [hours, minutes] = timeStr.split(':');
        const slotDate = new Date(dateStr);
        slotDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    
        if (slotDate < new Date()) return false;

        const slotDateUTC = new Date(Date.UTC(
            slotDate.getFullYear(),
            slotDate.getMonth(),
            slotDate.getDate(),
            slotDate.getHours(),
            slotDate.getMinutes()
        ));

        return reservations.some(availableSlot => {
            const availableDate = new Date(availableSlot);
            return availableDate.getTime() === slotDateUTC.getTime();
        });
    };
    
    const handleTimeSlotSelection = (date, timeStr) => {
        const [hours, minutes] = timeStr.split(':');
        const slotDate = new Date(date);
        slotDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    
        if (isSlotAvailable(date, timeStr)) {
            const slotDateUTC = new Date(Date.UTC(
                slotDate.getFullYear(),
                slotDate.getMonth(),
                slotDate.getDate(),
                slotDate.getHours(),
                slotDate.getMinutes()
            ));
            onSlotSelect(slotDateUTC);
        }
    };

    const isSlotSelected = (dateStr, timeStr) => {
        if (!selectedSlot) return false;
        
        const [hours, minutes] = timeStr.split(':');
        const slotDate = new Date(dateStr);
        slotDate.setHours(parseInt(hours), parseInt(minutes));
        
        return selectedSlot.getTime() === slotDate.getTime();
    };

    const handleSlotClick = (date, timeStr) => {
        const [hours, minutes] = timeStr.split(':');
        const slotDate = new Date(date);
        slotDate.setHours(parseInt(hours), parseInt(minutes));

        if (isSlotAvailable(date, timeStr)) {
            onSlotSelect(slotDate);
        }
    };

    const handlePrevWeek = () => {
        setCurrentWeekOffset(prev => prev - 1);
    };

    const handleNextWeek = () => {
        setCurrentWeekOffset(prev => prev + 1);
    };

    return (
        <div className='reservation-container'>
            <div className="calendar">
                <div className="calendar-header">
                    <button onClick={handlePrevWeek}>&lt;</button>
                    <div className="month-year-header">
                        {monthNames[startDate.getMonth()]} {startDate.getFullYear()}
                    </div>
                    <button onClick={handleNextWeek}>&gt;</button>
                </div>
                <div className="days-container">
                    {generateDays().map((date, index) => (
                        <div key={index} className="day-column">
                            <div className="day-header">
                                {daysOfWeek[index]} <br />
                                {date.getDate().toString().padStart(2, '0')}.
                                {(date.getMonth() + 1).toString().padStart(2, '0')}
                            </div>
                            <div className="time-slots">
                                {timeSlots.map((timeSlot) => (
                                    <div
                                        key={timeSlot}
                                        className={`time-slot ${
                                            isSlotAvailable(date, timeSlot) ? 'available' : ''
                                        } ${isSlotSelected(date, timeSlot) ? 'selected' : ''}`}
                                        onClick={() => handleSlotClick(date, timeSlot)}
                                    >
                                        {timeSlot}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Calendar;