// Free 15-minute strategy call booking system
document.addEventListener('DOMContentLoaded', function() {
    const bookingModal = document.getElementById('booking-modal');
    const bookFreeCallBtn = document.getElementById('book-free-call-btn');
    const closeBookingModal = document.getElementById('close-booking-modal');
    const calendarContainer = document.getElementById('calendar-container');
    const calendarMonthYear = document.getElementById('calendar-month-year');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const timeSlotsContainer = document.getElementById('time-slots');
    const bookingSummary = document.getElementById('booking-summary');
    const selectedDateDisplay = document.getElementById('selected-date-display');
    const confirmBookingBtn = document.getElementById('confirm-booking-btn');
    const prevStepBtn = document.getElementById('prev-step');
    const nextStepBtn = document.getElementById('next-step');
    const bookingModalTitle = document.getElementById('booking-modal-title');

    // Only initialize if modal exists and button exists (skip on consulting page where paid booking exists)
    if (!bookingModal || !bookFreeCallBtn) return;
    
    // Don't initialize if we're on the consulting page (it has its own booking system)
    if (window.location.pathname.includes('service-consulting.html')) return;

    // Booking state
    let currentDate = new Date(2025, 10, 1); // November 2025
    let selectedDate = null;
    let selectedTime = null;
    let currentStep = 1;
    const isFreeBooking = true; // This is always a free booking
    const bookingDuration = 15; // 15 minutes

    // Open modal
    bookFreeCallBtn.addEventListener('click', function(e) {
        e.preventDefault();
        bookingModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        currentDate = new Date(2025, 10, 1);
        resetBooking();
        renderCalendar();
    });

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
        selectedTime = null;
        currentStep = 1;
        showStep(1);
    }

    // Calendar navigation
    if (prevMonthBtn) {
        prevMonthBtn.addEventListener('click', function() {
            currentDate.setMonth(currentDate.getMonth() - 1);
            if (currentDate < new Date(2025, 10, 1)) {
                currentDate = new Date(2025, 10, 1);
            }
            renderCalendar();
        });
    }

    if (nextMonthBtn) {
        nextMonthBtn.addEventListener('click', function() {
            currentDate.setMonth(currentDate.getMonth() + 1);
            if (currentDate > new Date(2026, 10, 30)) {
                currentDate = new Date(2026, 10, 30);
            }
            renderCalendar();
        });
    }

    // Render calendar
    function renderCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        
        if (calendarMonthYear) {
            calendarMonthYear.textContent = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        }

        if (!calendarContainer) return;

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const prevMonthDays = new Date(year, month, 0).getDate();

        calendarContainer.innerHTML = '';

        // Day headers
        const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayHeaders.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'calendar-day-header';
            dayHeader.textContent = day;
            calendarContainer.appendChild(dayHeader);
        });

        // Previous month's trailing days
        for (let i = prevMonthDays - firstDay + 1; i <= prevMonthDays; i++) {
            const day = document.createElement('div');
            day.className = 'calendar-day other-month';
            day.textContent = i;
            calendarContainer.appendChild(day);
        }

        // Current month's days
        for (let i = 1; i <= daysInMonth; i++) {
            const day = document.createElement('div');
            const date = new Date(year, month, i);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const dateOnly = new Date(date);
            dateOnly.setHours(0, 0, 0, 0);

            day.className = 'calendar-day';
            day.textContent = i;

            // Disable past dates
            if (dateOnly < today) {
                day.classList.add('disabled');
            } else {
                day.addEventListener('click', function() {
                    if (!day.classList.contains('disabled')) {
                        document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
                        day.classList.add('selected');
                        selectedDate = new Date(year, month, i);
                        showStep(2);
                    }
                });
            }

            // Highlight today
            if (dateOnly.getTime() === today.getTime()) {
                day.classList.add('today');
            }

            calendarContainer.appendChild(day);
        }

        // Next month's leading days
        const totalCells = calendarContainer.children.length;
        const remainingCells = 42 - totalCells; // 6 rows x 7 days
        for (let i = 1; i <= remainingCells && i <= 14; i++) {
            const day = document.createElement('div');
            day.className = 'calendar-day other-month';
            day.textContent = i;
            calendarContainer.appendChild(day);
        }
    }

    // Generate time slots (15-minute intervals from 8:30 AM to 5:00 PM)
    function generateTimeSlots() {
        if (!timeSlotsContainer) return;
        timeSlotsContainer.innerHTML = '';

        const slots = [];
        for (let hour = 8; hour < 17; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                if (hour === 8 && minute < 30) continue; // Start at 8:30
                if (hour === 17 && minute > 0) break; // End at 5:00
                slots.push({ hour, minute });
            }
        }

        slots.forEach(slot => {
            const timeBtn = document.createElement('button');
            timeBtn.className = 'time-slot-btn';
            timeBtn.textContent = formatTime(slot.hour, slot.minute);
            timeBtn.addEventListener('click', function() {
                document.querySelectorAll('.time-slot-btn').forEach(btn => btn.classList.remove('selected'));
                timeBtn.classList.add('selected');
                selectedTime = slot;
                showStep(3);
            });
            timeSlotsContainer.appendChild(timeBtn);
        });
    }

    function formatTime(hour, minute) {
        const period = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
        return `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
    }

    // Step navigation
    function showStep(step) {
        currentStep = step;
        
        // Hide all steps
        document.querySelectorAll('.booking-step').forEach(s => {
            s.classList.remove('active');
        });

        // Show current step
        const stepElement = document.getElementById(`step-${step === 1 ? 'date' : step === 2 ? 'time' : 'confirm'}`);
        if (stepElement) {
            stepElement.classList.add('active');
        }

        // Update navigation buttons
        if (prevStepBtn) {
            prevStepBtn.style.display = step > 1 ? 'block' : 'none';
        }
        if (nextStepBtn) {
            nextStepBtn.style.display = 'none'; // We auto-advance, so hide next button
        }

        // Update displays
        if (step === 2 && selectedDate) {
            if (selectedDateDisplay) {
                selectedDateDisplay.textContent = selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                });
            }
            generateTimeSlots();
        }

        if (step === 3 && selectedDate && selectedTime) {
            updateSummary();
        }
    }

    if (prevStepBtn) {
        prevStepBtn.addEventListener('click', function() {
            if (currentStep > 1) {
                showStep(currentStep - 1);
            }
        });
    }

    // Update booking summary
    function updateSummary() {
        if (!bookingSummary || !selectedDate || !selectedTime) return;

        const dateStr = selectedDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        const timeStr = formatTime(selectedTime.hour, selectedTime.minute);

        bookingSummary.innerHTML = `
            <div class="summary-item">
                <span class="summary-label">Service:</span>
                <span class="summary-value">Free 15-Minute Strategy Call</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Date:</span>
                <span class="summary-value">${dateStr}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Time:</span>
                <span class="summary-value">${timeStr}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Duration:</span>
                <span class="summary-value">15 minutes</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Price:</span>
                <span class="summary-value" style="color: var(--accent-blue); font-weight: 700;">FREE</span>
            </div>
        `;
    }

    // Confirm booking
    if (confirmBookingBtn) {
        confirmBookingBtn.addEventListener('click', function() {
            if (selectedDate && selectedTime) {
                addBookingToCart();
                closeModal();
            }
        });
    }

    // Add booking to cart
    function addBookingToCart() {
        if (!selectedDate || !selectedTime) return;

        const dateStr = selectedDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        const timeStr = formatTime(selectedTime.hour, selectedTime.minute);

        // Create booking item for cart
        const bookingItem = {
            id: 'free-booking-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9),
            name: 'Free 15-Minute Strategy Call',
            price: 0,
            quantity: 1,
            type: 'booking',
            bookingDetails: {
                date: selectedDate.toISOString(),
                dateDisplay: dateStr,
                time: timeStr,
                timeHour: selectedTime.hour,
                timeMinute: selectedTime.minute,
                appointmentType: 'strategy-call',
                appointmentTypeLabel: 'Free 15-Minute Strategy Call',
                duration: 15
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
        alert(`Free strategy call booking added to cart!\n\n${dateStr} at ${timeStr}\nPrice: FREE\n\nYou can proceed to checkout from your cart.`);
    }

    // Initialize
    if (calendarContainer) {
        renderCalendar();
    }
});

