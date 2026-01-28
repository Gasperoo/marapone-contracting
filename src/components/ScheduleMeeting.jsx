import React, { useState } from 'react';
import Calendar from './Calendar';
import TimeSlot from './TimeSlot';
import './ScheduleMeeting.css';

export default function ScheduleMeeting({ onClose, onAddToCart }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedTime12, setSelectedTime12] = useState(null);
  const [duration, setDuration] = useState(null);

  const durations = [
    { value: 30, label: '30 Minutes', price: 150 },
    { value: 60, label: '1 Hour', price: 250 }
  ];

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setSelectedTime12(null);
    setDuration(null);
  };

  const handleTimeSelect = (time24, time12) => {
    setSelectedTime(time24);
    setSelectedTime12(time12);
    setDuration(null);
  };

  const handleDurationSelect = (durationValue) => {
    setDuration(durationValue);
  };

  const handleAddToCart = () => {
    if (!selectedDate || !selectedTime || !duration) return;

    const selectedDuration = durations.find(d => d.value === duration);
    const formatDate = (date) => {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    };

    const meetingDetails = {
      name: `Consultation Meeting - ${selectedDuration.label}`,
      price: selectedDuration.price,
      quantity: 1,
      category: 'Consultation',
      details: {
        date: formatDate(selectedDate),
        time: selectedTime12,
        duration: `${duration} minutes`
      }
    };

    onAddToCart(meetingDetails);
    onClose();
  };

  const canAddToCart = selectedDate && selectedTime && duration;

  return (
    <div className="schedule-meeting-overlay" onClick={onClose}>
      <div className="schedule-meeting-modal" onClick={(e) => e.stopPropagation()}>
        <div className="schedule-meeting-header">
          <h2>Schedule a Meeting</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="schedule-meeting-content">
          {/* Step 1: Select Date */}
          <div className="schedule-step">
            <div className="step-label">
              <span className="step-number">1</span>
              <span>Select Date</span>
            </div>
            <Calendar 
              onDateSelect={handleDateSelect}
              selectedDate={selectedDate}
            />
          </div>

          {/* Step 2: Select Time */}
          {selectedDate && (
            <div className="schedule-step">
              <div className="step-label">
                <span className="step-number">2</span>
                <span>Select Time</span>
              </div>
              <TimeSlot
                selectedDate={selectedDate}
                onTimeSelect={handleTimeSelect}
                selectedTime={selectedTime}
              />
            </div>
          )}

          {/* Step 3: Select Duration */}
          {selectedTime && (
            <div className="schedule-step">
              <div className="step-label">
                <span className="step-number">3</span>
                <span>Select Duration</span>
              </div>
              <div className="duration-options">
                {durations.map((dur) => (
                  <button
                    key={dur.value}
                    className={`duration-btn ${duration === dur.value ? 'selected' : ''}`}
                    onClick={() => handleDurationSelect(dur.value)}
                  >
                    <div className="duration-label">{dur.label}</div>
                    <div className="duration-price">${dur.price}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Summary and Add to Cart */}
          {canAddToCart && (
            <div className="schedule-summary">
              <h3>Booking Summary</h3>
              <div className="summary-details">
                <div className="summary-row">
                  <span>📅 Date:</span>
                  <span>{selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div className="summary-row">
                  <span>⏰ Time:</span>
                  <span>{selectedTime12}</span>
                </div>
                <div className="summary-row">
                  <span>⏱️ Duration:</span>
                  <span>{duration} minutes</span>
                </div>
                <div className="summary-row total">
                  <span>💰 Total:</span>
                  <span>${durations.find(d => d.value === duration)?.price}</span>
                </div>
              </div>
              <button className="add-to-cart-btn" onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
