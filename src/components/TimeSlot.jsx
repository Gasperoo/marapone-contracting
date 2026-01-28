import React from 'react';
import './TimeSlot.css';

export default function TimeSlot({ selectedDate, onTimeSelect, selectedTime }) {
  // Generate time slots from 8:30am to 4:30pm in 30-minute intervals
  const generateTimeSlots = () => {
    const slots = [];
    const startHour = 8;
    const startMinute = 30;
    const endHour = 16;
    const endMinute = 30;

    for (let hour = startHour; hour <= endHour; hour++) {
      const minutes = hour === startHour ? [startMinute] : hour === endHour ? [0, 30] : [0, 30];
      
      for (const minute of minutes) {
        if (hour === endHour && minute > endMinute) break;
        
        const time24 = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const isPM = hour >= 12;
        const hour12 = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
        const time12 = `${hour12}:${minute.toString().padStart(2, '0')} ${isPM ? 'PM' : 'AM'}`;
        
        slots.push({ time24, time12 });
      }
    }

    return slots;
  };

  const timeSlots = generateTimeSlots();

  if (!selectedDate) {
    return (
      <div className="timeslot-container">
        <p className="timeslot-message">Please select a date first</p>
      </div>
    );
  }

  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="timeslot-container">
      <h3 className="timeslot-title">
        Select a Time for {formatDate(selectedDate)}
      </h3>
      
      <div className="timeslot-grid">
        {timeSlots.map((slot) => (
          <button
            key={slot.time24}
            className={`timeslot-btn ${selectedTime === slot.time24 ? 'selected' : ''}`}
            onClick={() => onTimeSelect(slot.time24, slot.time12)}
          >
            {slot.time12}
          </button>
        ))}
      </div>

      <div className="timeslot-info">
        <p>📅 Available Monday - Friday</p>
        <p>⏰ 30-minute time blocks</p>
      </div>
    </div>
  );
}
