import React, { useState, useEffect } from "react";
import './Calendar.css';

function Calendar({ bookings, currentUser, setShowBookingForm, setEditingBooking }) {
    const currentDate = new Date();
    const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
    const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
    const [yearCalendar, setYearCalendar] = useState([]);

    useEffect(() => {
        generateCalendarForYear(currentYear);
    }, [currentYear]);

    function generateCalendarForYear(year) {
        const calendar = [];

        for (let month = 0; month < 12; month++) {
            const firstDay = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();

            const daysFromPrevMonth = (firstDay + 6) % 7;

            const monthCalendar = [];

            for (let i = 0; i < daysFromPrevMonth; i++) {
                monthCalendar.push(null);
            }

            for (let i = 1; i <= daysInMonth; i++) {
                const dayOfWeek = new Date(year, month, i).getDay();
                if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                    monthCalendar.push(i);
                }
            }

            const weeksInCalendar = Math.ceil(monthCalendar.length / 5);
            while (monthCalendar.length < weeksInCalendar * 5) {
                monthCalendar.push(null);
            }

            const weeks = [];
            for (let i = 0; i < weeksInCalendar; i++) {
                weeks.push(monthCalendar.slice(i * 5, (i + 1) * 5));
            }

            calendar.push(weeks);
        }

        setYearCalendar(calendar);
    }

    function getBookingsForDay(day) {
        return bookings.filter(booking => {
            const bookingDate = new Date(booking.dateTimeStart);
            return bookingDate.getDate() === day && bookingDate.getMonth() === currentMonth && bookingDate.getFullYear() === currentYear;
        });
    }

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    return (
        <div className="calendar">
            <div className="controls">
                <button className="styled-button" onClick={() => setCurrentYear(currentYear - 1)}>&laquo; Year</button>
                <button className="styled-button" onClick={() => {
                    if (currentMonth === 0) {
                        setCurrentMonth(11);
                        setCurrentYear(currentYear - 1);
                    } else {
                        setCurrentMonth(currentMonth - 1);
                    }
                }}>&lt; Month</button>
                <div>{monthNames[currentMonth]}, {currentYear}</div>
                <button className="styled-button" onClick={() => {
                    if (currentMonth === 11) {
                        setCurrentMonth(0);
                        setCurrentYear(currentYear + 1);
                    } else {
                        setCurrentMonth(currentMonth + 1);
                    }
                }}>Month &gt;</button>
                <button className="styled-button" onClick={() => setCurrentYear(currentYear + 1)}>Year &raquo;</button>
            </div>

            <div className="weekday-titles">
                {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, i) => (
                    <div className="weekday-title" key={i}>{day}</div>
                ))}
            </div>

            <div className="month">
                {yearCalendar[currentMonth]?.map((week, i) => (
                    <div className="week" key={i}>
                        {week.map((day, j) => (
                            <div className={currentYear === currentDate.getFullYear() && currentMonth === currentDate.getMonth() && day === currentDate.getDate() ? "day current" : "day"} key={j} onClick={() => { setShowBookingForm(true); setEditingBooking(null); }}>
                                <div className="day-content">
                                    <div className="day-date">{day}</div>
                                    {day && getBookingsForDay(day).map((booking, k) => (
                                        <div key={k}
                                            className="booking"
                                            style={{ backgroundColor: booking.userId === currentUser.id ? "#488f31" : "#ff506d" }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (booking.userId === currentUser.id) {
                                                    setShowBookingForm(true);
                                                    setEditingBooking(booking);
                                                }
                                            }}>
                                            <div className="booking-text">
                                                {booking.title}
                                            </div>
                                            <div className="booking-text">
                                                {new Date(booking.dateTimeStart).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -
                                                {new Date(booking.dateTimeEnd).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}

                    </div>
                ))}
            </div>

        </div>
    );
}

export default Calendar;