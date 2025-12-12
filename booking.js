// Booking system for consulting services
document.addEventListener('DOMContentLoaded', function() {
    const bookingModal = document.getElementById('booking-modal');
    const bookNowBtn = document.getElementById('book-now-btn');
    const closeBookingModal = document.getElementById('close-booking-modal');
    const calendarContainer = document.getElementById('calendar-container');
    const calendarMonthYear = document.getElementById('calendar-month-year');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const timeSlotsContainer = document.getElementById('time-slots');
    const pricingDisplay = document.getElementById('pricing-display');
    const bookingSummary = document.getElementById('booking-summary');
    const selectedDateDisplay = document.getElementById('selected-date-display');
    const confirmBookingBtn = document.getElementById('confirm-booking-btn');
    const prevStepBtn = document.getElementById('prev-step');
    const nextStepBtn = document.getElementById('next-step');

    // Booking state
    let currentDate = new Date(); // Today's date
    let selectedDate = null;
    let selectedType = null;
    let selectedDuration = null;
    let selectedTime = null;
    let currentStep = 1;

    // Pricing structure
    const pricing = {
        '30': {
            'call': 50,
            'video': 75,
            'in-person': 150
        },
        '60': {
            'call': 80,
            'video': 140,
            'in-person': 300
        }
    };

    // Open modal
    if (bookNowBtn) {
        bookNowBtn.addEventListener('click', function() {
            bookingModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            currentDate = new Date(); // Always show today's date when calendar opens
            renderCalendar();
        });
    }

    // Close modal
    if (closeBookingModal) {
        closeBookingModal.addEventListener('click', closeModal);
    }

    bookingModal.addEventListener('click', function(e) {
        if (e.target === bookingModal) {
            closeModal();
        }
    });

    function closeModal() {
        bookingModal.style.display = 'none';
        document.body.style.overflow = '';
        resetBooking();
    }

    function resetBooking() {
        selectedDate = null;
        selectedType = null;
        selectedDuration = null;
        selectedTime = null;
        currentStep = 1;
        showStep(1);
    }

    // Calendar navigation
    if (prevMonthBtn) {
        prevMonthBtn.addEventListener('click', function() {
            currentDate.setMonth(currentDate.getMonth() - 1);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (currentDate < today) {
                currentDate = new Date(today);
            }
            renderCalendar();
        });
    }

    if (nextMonthBtn) {
        nextMonthBtn.addEventListener('click', function() {
            currentDate.setMonth(currentDate.getMonth() + 1);
            const maxDate = new Date();
            maxDate.setFullYear(maxDate.getFullYear() + 1);
            maxDate.setMonth(10, 30);
            if (currentDate > maxDate) {
                currentDate = new Date(maxDate);
            }
            renderCalendar();
        });
    }

    // Render calendar
    function renderCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        
        calendarMonthYear.textContent = new Date(year, month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrevMonth = new Date(year, month, 0).getDate();
        const today = new Date();
        const minDate = new Date(2025, 10, 1);
        const maxDate = new Date(2026, 10, 30);

        calendarContainer.innerHTML = '';

        // Day headers
        const dayHeaders = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        dayHeaders.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'calendar-day-header';
            dayHeader.textContent = day;
            calendarContainer.appendChild(dayHeader);
        });

        // Previous month's trailing dates
        for (let i = firstDay - 1; i >= 0; i--) {
            const day = daysInPrevMonth - i;
            const prevMonthCell = document.createElement('div');
            prevMonthCell.className = 'calendar-day prev-month';
            prevMonthCell.textContent = day;
            calendarContainer.appendChild(prevMonthCell);
        }

        // Days of the current month
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const dayCell = document.createElement('div');
            dayCell.className = 'calendar-day';
            dayCell.textContent = day;

            // Check if date is today
            if (date.toDateString() === today.toDateString()) {
                dayCell.classList.add('today');
            }

            // Disable dates outside range or in the past
            if (date < minDate || date > maxDate || (date < today && date.toDateString() !== today.toDateString())) {
                dayCell.classList.add('disabled');
            } else {
                dayCell.addEventListener('click', function() {
                    if (!dayCell.classList.contains('disabled')) {
                        document.querySelectorAll('.calendar-day').forEach(cell => {
                            cell.classList.remove('selected');
                        });
                        dayCell.classList.add('selected');
                        selectedDate = new Date(year, month, day);
                        showStep(2);
                    }
                });
            }

            calendarContainer.appendChild(dayCell);
        }

        // Next month's leading dates
        const totalCells = 42; // 6 rows × 7 days
        const cellsUsed = firstDay + daysInMonth;
        const remainingCells = totalCells - cellsUsed;
        
        for (let day = 1; day <= remainingCells && day <= 6; day++) {
            const nextMonthCell = document.createElement('div');
            nextMonthCell.className = 'calendar-day next-month';
            nextMonthCell.textContent = day;
            calendarContainer.appendChild(nextMonthCell);
        }
    }

    // Appointment type selection
    document.querySelectorAll('.appointment-type-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.appointment-type-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            selectedType = this.dataset.type;
            showStep(3);
        });
    });

    // Duration selection
    document.querySelectorAll('.duration-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.duration-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            selectedDuration = this.dataset.duration;
            updatePricing();
            showStep(4);
        });
    });

    // Update pricing display
    function updatePricing() {
        if (selectedType && selectedDuration) {
            const price = pricing[selectedDuration][selectedType];
            pricingDisplay.innerHTML = `
                <div class="pricing-info">
                    <span class="pricing-label">Price:</span>
                    <span class="pricing-amount">$${price}</span>
                </div>
            `;
        }
    }

    // Show time slots
    function showTimeSlots() {
        if (!selectedDate) return;

        const dateStr = selectedDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        selectedDateDisplay.textContent = dateStr;

        timeSlotsContainer.innerHTML = '';

        const startHour = 8;
        const startMinute = 30;
        const endHour = 17;
        const endMinute = 0;
        const interval = parseInt(selectedDuration);

        let currentHour = startHour;
        let currentMinute = startMinute;

        while (currentHour < endHour || (currentHour === endHour && currentMinute <= endMinute)) {
            const timeSlot = document.createElement('button');
            timeSlot.className = 'time-slot-btn';
            
            const timeStr = formatTime(currentHour, currentMinute);
            timeSlot.textContent = timeStr;
            timeSlot.dataset.hour = currentHour;
            timeSlot.dataset.minute = currentMinute;

            timeSlot.addEventListener('click', function() {
                document.querySelectorAll('.time-slot-btn').forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                selectedTime = {
                    hour: parseInt(this.dataset.hour),
                    minute: parseInt(this.dataset.minute)
                };
                showStep(5);
            });

            timeSlotsContainer.appendChild(timeSlot);

            // Increment time
            currentMinute += interval;
            if (currentMinute >= 60) {
                currentMinute = 0;
                currentHour++;
            }
        }
    }

    function formatTime(hour, minute) {
        const period = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
        const displayMinute = minute.toString().padStart(2, '0');
        return `${displayHour}:${displayMinute}${period}`;
    }

    // Show booking summary
    function showBookingSummary() {
        if (!selectedDate || !selectedType || !selectedDuration || !selectedTime) return;

        const dateStr = selectedDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        const timeStr = formatTime(selectedTime.hour, selectedTime.minute);
        const typeLabels = {
            'call': 'Phone Call',
            'video': 'Video Call',
            'in-person': 'In-Person Meeting'
        };
        const price = pricing[selectedDuration][selectedType];

        bookingSummary.innerHTML = `
            <div class="summary-item">
                <span class="summary-label">Date:</span>
                <span class="summary-value">${dateStr}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Time:</span>
                <span class="summary-value">${timeStr}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Type:</span>
                <span class="summary-value">${typeLabels[selectedType]}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Duration:</span>
                <span class="summary-value">${selectedDuration} minutes</span>
            </div>
            <div class="summary-item summary-total">
                <span class="summary-label">Total:</span>
                <span class="summary-value">$${price}</span>
            </div>
        `;
    }

    // Step navigation
    function showStep(step) {
        currentStep = step;
        
        // Hide all steps
        document.querySelectorAll('.booking-step').forEach(s => {
            s.classList.remove('active');
        });

        // Show current step
        const stepElement = document.getElementById(`step-${getStepName(step)}`);
        if (stepElement) {
            stepElement.classList.add('active');
        }

        // Update navigation buttons
        prevStepBtn.style.display = step > 1 ? 'block' : 'none';
        nextStepBtn.style.display = 'none';

        // Step-specific actions
        if (step === 4 && selectedDate) {
            showTimeSlots();
        } else if (step === 5) {
            showBookingSummary();
        }
    }

    function getStepName(step) {
        const steps = ['', 'date', 'type', 'duration', 'time', 'confirm'];
        return steps[step] || '';
    }

    // Navigation buttons
    if (prevStepBtn) {
        prevStepBtn.addEventListener('click', function() {
            if (currentStep > 1) {
                showStep(currentStep - 1);
            }
        });
    }

    // Confirm booking
    if (confirmBookingBtn) {
        confirmBookingBtn.addEventListener('click', function() {
            if (selectedDate && selectedType && selectedDuration && selectedTime) {
                addBookingToCart();
                closeModal();
            }
        });
    }

    // Add booking to cart
    function addBookingToCart() {
        if (!selectedDate || !selectedType || !selectedDuration || !selectedTime) return;

        const dateStr = selectedDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        const timeStr = formatTime(selectedTime.hour, selectedTime.minute);
        const typeLabels = {
            'call': 'Phone Call',
            'video': 'Video Call',
            'in-person': 'In-Person Meeting'
        };
        const price = pricing[selectedDuration][selectedType];

        // Create booking item for cart
        const bookingItem = {
            id: 'booking-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9),
            name: `Consulting Appointment - ${typeLabels[selectedType]}`,
            price: price,
            quantity: 1,
            type: 'booking',
            bookingDetails: {
                date: selectedDate.toISOString(),
                dateDisplay: dateStr,
                time: timeStr,
                timeHour: selectedTime.hour,
                timeMinute: selectedTime.minute,
                appointmentType: selectedType,
                appointmentTypeLabel: typeLabels[selectedType],
                duration: parseInt(selectedDuration)
            }
        };

        // Ensure window.cart exists
        if (typeof window.cart === 'undefined') {
            window.cart = [];
        }
        
        // Load cart from localStorage if needed
        if (window.cart.length === 0) {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                window.cart = JSON.parse(savedCart);
            }
        }
        
        // Add to cart using the global addToCart function if available
        if (typeof addToCart === 'function') {
            addToCart(bookingItem);
        } else {
            // Fallback: directly add to window.cart
            window.cart.push(bookingItem);
            localStorage.setItem('cart', JSON.stringify(window.cart));
            
            // Update cart display if function exists
            if (typeof updateCartDisplay === 'function') {
                updateCartDisplay();
            }
        }

        // Show success message
        alert(`Booking added to cart!\n\n${typeLabels[selectedType]} - ${dateStr} at ${timeStr}\nPrice: $${price}\n\nYou can proceed to checkout from your cart.`);
    }

    // Initialize
    renderCalendar();
});

