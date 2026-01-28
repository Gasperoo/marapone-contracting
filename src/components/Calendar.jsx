import React, { useState, useMemo } from 'react';
import './Calendar.css';

export default function Calendar({ onDateSelect, selectedDate }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const firstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6; // Not Sunday (0) or Saturday (6)
  };

  const isPastDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    return checkDate < today;
  };

  const isSameDay = (date1, date2) => {
    if (!date1 || !date2) return false;
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  };

  // Get all booked slots from localStorage
  const getBookedSlots = () => {
    return JSON.parse(localStorage.getItem('bookedSlots') || '[]');
  };

  // Count available time slots for a given date
  const getAvailableSlotCount = (date) => {
    if (!date || !isWeekday(date) || isPastDate(date)) return 0;
    
    const dateStr = date.toISOString().split('T')[0];
    const bookings = getBookedSlots();
    
    // Total possible slots (8:30am - 4:30pm in 30-min blocks = 16 slots)
    const totalSlots = 16;
    
    // Find bookings for this date
    const dayBookings = bookings.filter(booking => booking.date === dateStr);
    
    // Count blocked slots
    let blockedSlots = 0;
    dayBookings.forEach(booking => {
      // Each booking blocks slots based on duration
      blockedSlots += booking.duration / 30; // 30 min = 1 slot, 60 min = 2 slots
    });
    
    return totalSlots - blockedSlots;
  };

  // Check if a date is fully booked
  const isFullyBooked = (date) => {
    return getAvailableSlotCount(date) === 0;
  };

  const generateCalendarDays = useMemo(() => {
    const days = [];
    const totalDays = daysInMonth(currentMonth);
    const firstDay = firstDayOfMonth(currentMonth);
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push({ day: null, date: null });
    }

    // Add days of the month
    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(year, month, day);
      days.push({ day, date });
    }

    return days;
  }, [currentMonth]);

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleDateClick = (date) => {
    if (date && isWeekday(date) && !isPastDate(date) && !isFullyBooked(date)) {
      onDateSelect(date);
    }
  };

  const canGoBack = () => {
    const today = new Date();
    const firstOfCurrentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const firstOfThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    return firstOfCurrentMonth > firstOfThisMonth;
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button
          className="calendar-nav-btn"
          onClick={previousMonth}
          disabled={!canGoBack()}
        >
          ←
        </button>
        <h3 className="calendar-month">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        <button
          className="calendar-nav-btn"
          onClick={nextMonth}
        >
          →
        </button>
      </div>

      <div className="calendar-weekdays">
        <div className="calendar-weekday">S</div>
        <div className="calendar-weekday">M</div>
        <div className="calendar-weekday">T</div>
        <div className="calendar-weekday">W</div>
        <div className="calendar-weekday">T</div>
        <div className="calendar-weekday">F</div>
        <div className="calendar-weekday">S</div>
      </div>

      <div className="calendar-days">
        {generateCalendarDays.map((item, index) => {
          if (!item.day) {
            return <div key={`empty-${index}`} className="calendar-day empty"></div>;
          }

          const isWeekdayDate = isWeekday(item.date);
          const isPast = isPastDate(item.date);
          const isSelected = isSameDay(item.date, selectedDate);
          const fullyBooked = isFullyBooked(item.date);
          const isAvailable = isWeekdayDate && !isPast && !fullyBooked;

          return (
            <div
              key={index}
              className={`calendar-day ${isAvailable ? 'available' : 'unavailable'} ${isSelected ? 'selected' : ''}`}
              onClick={() => handleDateClick(item.date)}
            >
              {item.day}
            </div>
          );
        })}
      </div>

      <div className="calendar-legend">
        <div className="legend-item">
          <span className="legend-dot available-dot"></span>
          <span>Available</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot unavailable-dot"></span>
          <span>Unavailable</span>
        </div>
      </div>
    </div>
  );
}
