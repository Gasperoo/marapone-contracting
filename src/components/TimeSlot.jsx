import React, { useMemo } from 'react';
import './TimeSlot.css';

export default function TimeSlot({ selectedDate, onTimeSelect, selectedTime }) {
  // Get booked slots from localStorage
  const getBookedSlots = () => {
    const bookings = JSON.parse(localStorage.getItem('bookedSlots') || '[]');
    return bookings;
  };

  // Check if a time slot is booked
  const isSlotBooked = (date, time24, duration) => {
    const bookings = getBookedSlots();
    const dateStr = date.toISOString().split('T')[0];
    
    // Convert time to minutes for easier comparison
    const [hours, minutes] = time24.split(':').map(Number);
    const slotStart = hours * 60 + minutes;
    
    // Check if this slot conflicts with any existing bookings
    return bookings.some(booking => {
      if (booking.date !== dateStr) return false;
      
      const [bookingHours, bookingMinutes] = booking.time24.split(':').map(Number);
      const bookingStart = bookingHours * 60 + bookingMinutes;
      const bookingEnd = bookingStart + booking.duration;
      
      // Check if the slot overlaps with the booking
      // A 30-min slot conflicts if it starts within the booked time range
      return slotStart >= bookingStart && slotStart < bookingEnd;
    });
  };

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

  // Filter out booked time slots
  const availableTimeSlots = useMemo(() => {
    const allSlots = generateTimeSlots();
    if (!selectedDate) return allSlots;
    
    return allSlots.filter(slot => !isSlotBooked(selectedDate, slot.time24, 30));
  }, [selectedDate]);

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
        {availableTimeSlots.length > 0 ? (
          availableTimeSlots.map((slot) => (
            <button
              key={slot.time24}
              className={`timeslot-btn ${selectedTime === slot.time24 ? 'selected' : ''}`}
              onClick={() => onTimeSelect(slot.time24, slot.time12)}
            >
              {slot.time12}
            </button>
          ))
        ) : (
          <p className="timeslot-message">No available time slots for this date</p>
        )}
      </div>

      <div className="timeslot-info">
        <p>📅 Available Monday - Friday</p>
        <p>⏰ 30-minute time blocks</p>
        {availableTimeSlots.length > 0 && (
          <p>✅ {availableTimeSlots.length} slots available</p>
        )}
      </div>
    </div>
  );
}
