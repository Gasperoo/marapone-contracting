import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Shield, Server, Box, CheckCircle2, ShieldAlert, PhoneCall, ClipboardCheck, Lock, ChevronLeft, ChevronRight, Calendar, Clock } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  // Booking Calendar State
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [bookingStep, setBookingStep] = useState('time'); // 'time' | 'details' | 'success'
  
  // Booking Form State
  const [bookingDetails, setBookingDetails] = useState({ name: '', email: '', phone: '' });
  const [isBookingSubmitting, setIsBookingSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState(null);

  // Calendar Helpers
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  const firstDay = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());
  
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  
  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // Time slots from 8:00 AM to 4:00 PM in 30min intervals
  const timeSlots = [
    "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM",
    "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM"
  ];
  
  const handleFinalizeBooking = async () => {
    setIsBookingSubmitting(true);
    setBookingError(null);

    try {
      const response = await fetch('/api/send-booking-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: bookingDetails.name,
          email: bookingDetails.email,
          phone: bookingDetails.phone,
          date: selectedDate.toLocaleDateString(),
          time: selectedTime
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to book appointment');
      }

      setBookingStep('success');
      setBookingDetails({ name: '', email: '', phone: '' });
    } catch (err) {
      console.error('Booking error:', err);
      setBookingError(err.message || 'Something went wrong. Please email us directly.');
    } finally {
      setIsBookingSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
        const response = await fetch('/api/send-contact-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || data.error || 'Failed to send message');
        }

        setIsSuccess(true);
        setFormData({ name: '', email: '', company: '', role: '', message: '' });
    } catch (err) {
        console.error('Submission error:', err);
        setError(err.message || 'Something went wrong. Please email us directly at general@marapone.com');
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="landing-container pt-32 pb-24 min-h-screen relative overflow-hidden bg-[#0a0e1a]">

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#8B5CF6]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#FF6B00]/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* Left Side: Copy & Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 shadow-sm">
            <span className="text-xs font-bold tracking-widest text-[#FF6B00] uppercase">Direct Consultation</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight tracking-tight">
            Stop Guessing. <br />Fix Your Ops.
          </h1>

          <p className="text-gray-300 text-lg mb-12 leading-relaxed font-medium">
            Marapone doesn't do generic demos. Marapone conducts direct operational audits to see if your data structure is ready for a private AI engine. Book a 15-30 minute discovery call to get started.
          </p>

          <div className="space-y-8">
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FF6B00] shrink-0">
                <ClipboardCheck size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Operational Audit</h3>
                <p className="text-[#6b7280] text-sm leading-relaxed font-medium">We'll review your current data silos—accounting, site logs, or manifests—to pinpoint exactly where AI can cut your costs.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FF6B00] shrink-0">
                <Lock size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Privacy & Ownership</h3>
                <p className="text-[#6b7280] text-sm leading-relaxed font-medium">Everything we build is private. Your sensitive operational data never leaves your control during or after the build.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FF6B00] shrink-0">
                <PhoneCall size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">No-BS Discovery Call</h3>
                <p className="text-[#6b7280] text-sm leading-relaxed font-medium">A quick, direct conversation to determine if your project is a fit for our fixed-price ownership model.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.3)] relative overflow-hidden"
        >
          {/* Subtle top border glow */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF6B00] to-[#F59E0B]" />

          <h2 className="text-2xl font-bold text-white mb-8">Schedule a Consultation</h2>

          {isSuccess ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-10">
                <div className="w-20 h-20 bg-[#10B981]/20 rounded-full flex items-center justify-center mb-6 border border-[#10B981]/50 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                    <CheckCircle2 size={40} className="text-[#10B981]" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Message Received</h3>
                <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-sm font-medium">
                    Marapone will review your details and reach out within 24 hours to schedule our discovery call.
                </p>
                <button
                    onClick={() => setIsSuccess(false)}
                    className="px-8 py-3 bg-[#FF6B00] hover:bg-[#ea580c] text-white rounded-xl font-bold transition-all shadow-sm"
                >
                    Send Another Inquiry
                </button>
            </div>
          ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-500 text-sm font-bold flex items-start gap-3">
                    <ShieldAlert size={20} className="shrink-0 mt-0.5" />
                    <span>{error}</span>
                </div>
            )}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-xs font-bold tracking-wider uppercase text-gray-500">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:bg-white/10 focus:border-white/20 transition-all font-medium"
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-xs font-bold tracking-wider uppercase text-gray-500">Business Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:bg-white/10 focus:border-white/20 transition-all font-medium"
                  placeholder="john@company.ca"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="role" className="text-xs font-bold tracking-wider uppercase text-gray-500">Role</label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:bg-white/10 focus:border-white/20 transition-all font-medium"
                  placeholder="Project Manager / Ops Lead"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="company" className="text-xs font-bold tracking-wider uppercase text-gray-500">Company</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:bg-white/10 focus:border-white/20 transition-all font-medium"
                  placeholder="Enterprise Logistics Inc."
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-xs font-bold tracking-wider uppercase text-gray-500">How can Marapone help?</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:bg-white/10 focus:border-white/20 transition-all resize-none font-medium"
                placeholder="Briefly describe your operational friction..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#FF6B00] hover:bg-[#ea580c] text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:-translate-y-1 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Transmitting...' : 'Send Inquiry'} 
              {!isSubmitting && <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />}
            </button>

            <p className="text-[10px] text-center text-gray-500 font-bold uppercase tracking-widest mt-4">
              Direct consultation. No Sales Fluff.
            </p>
          </form>
          )}
        </motion.div>

      </div>

      {/* ═══════════════════════ BOOKING SECTION ═══════════════════════ */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 mt-32">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6 shadow-sm">
            <Calendar size={14} className="text-[#FF6B00] mr-2" />
            <span className="text-xs font-bold tracking-widest text-[#FF6B00] uppercase">Direct Booking</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Schedule Your Discovery</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-medium">
            Select a convenient time below to discuss how a private AI engine can eliminate your operational friction.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle top border glow for consistency */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF6B00] to-[#F59E0B]" />
          
          {/* Calendar Side */}
          <div className="lg:col-span-3 space-y-8">
            <div className="flex items-center justify-between bg-black/20 p-4 rounded-2xl border border-white/5">
              <button onClick={handlePrevMonth} className="p-2 hover:bg-white/10 rounded-xl transition-colors text-white">
                <ChevronLeft size={24} />
              </button>
              <h3 className="text-xl font-bold text-white">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h3>
              <button onClick={handleNextMonth} className="p-2 hover:bg-white/10 rounded-xl transition-colors text-white">
                <ChevronRight size={24} />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-2 md:gap-4 text-center">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">{day}</div>
              ))}
              
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square" />
              ))}
              
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                const isSelected = selectedDate?.toDateString() === dateObj.toDateString();
                const isPast = dateObj < new Date(new Date().setHours(0,0,0,0));
                // Disabling weekends for business context
                const isWeekend = dateObj.getDay() === 0 || dateObj.getDay() === 6;

                return (
                  <button
                    key={day}
                    disabled={isPast || isWeekend}
                    onClick={() => { setSelectedDate(dateObj); setSelectedTime(null); setBookingStep('time'); setBookingError(null); }}
                    className={`
                      aspect-square rounded-2xl flex items-center justify-center text-lg font-bold transition-all relative
                      ${isPast || isWeekend ? 'opacity-30 cursor-not-allowed text-gray-600' : 'hover:bg-white/10 hover:-translate-y-1 cursor-pointer'}
                      ${isSelected ? 'bg-[#FF6B00] text-white shadow-[0_0_20px_rgba(255,107,0,0.4)]' : 'bg-black/20 text-gray-300 border border-white/5'}
                    `}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Slots Side */}
          <div className="lg:col-span-2 flex flex-col h-full pl-0 lg:pl-8 border-t lg:border-t-0 lg:border-l border-white/10 pt-8 lg:pt-0">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Clock size={20} className="text-[#FF6B00]" />
              {selectedDate ? selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) : 'Select a Date'}
            </h3>

            {bookingStep === 'success' ? (
              <div className="flex-grow flex flex-col items-center justify-center text-center p-6 bg-black/20 rounded-3xl border border-white/5 mt-4">
                <div className="w-16 h-16 bg-[#10B981]/20 rounded-full flex items-center justify-center mb-4 border border-[#10B981]/50">
                  <CheckCircle2 size={32} className="text-[#10B981]" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-2">Booking Confirmed</h4>
                <p className="text-gray-400 font-medium mb-6">
                  You are scheduled for {selectedDate?.toLocaleDateString()} at {selectedTime}. A calendar invite has been sent.
                </p>
                <button
                  onClick={() => { setBookingStep('time'); setSelectedDate(null); setSelectedTime(null); }}
                  className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-colors text-sm"
                >
                  Book Another Time
                </button>
              </div>
            ) : bookingStep === 'details' ? (
              <div className="flex-grow flex flex-col justify-center">
                <button onClick={() => setBookingStep('time')} className="text-gray-400 hover:text-white text-sm font-bold flex items-center gap-1 mb-6 transition-colors self-start">
                  <ChevronLeft size={16} /> Back to Times
                </button>

                <h4 className="text-2xl font-bold text-white mb-2">Your Details</h4>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  Please provide your contact information to finalize your appointment for <strong className="text-white">{selectedDate.toLocaleDateString()} at {selectedTime}</strong>.
                </p>

                {bookingError && (
                    <div className="p-4 mb-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-500 text-sm font-bold">
                        {bookingError}
                    </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold tracking-wider uppercase text-gray-500 mb-1 block">Full Name</label>
                    <input
                      type="text"
                      value={bookingDetails.name}
                      onChange={(e) => setBookingDetails({...bookingDetails, name: e.target.value})}
                      className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#FF6B00]/50 transition-all font-medium"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold tracking-wider uppercase text-gray-500 mb-1 block">Business Email</label>
                    <input
                      type="email"
                      value={bookingDetails.email}
                      onChange={(e) => setBookingDetails({...bookingDetails, email: e.target.value})}
                      className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#FF6B00]/50 transition-all font-medium"
                      placeholder="jane@company.com"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold tracking-wider uppercase text-gray-500 mb-1 block">Phone Number</label>
                    <input
                      type="tel"
                      value={bookingDetails.phone}
                      onChange={(e) => setBookingDetails({...bookingDetails, phone: e.target.value})}
                      className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#FF6B00]/50 transition-all font-medium"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10">
                  <button
                    disabled={!bookingDetails.name || !bookingDetails.email || !bookingDetails.phone || isBookingSubmitting}
                    onClick={handleFinalizeBooking}
                    className="w-full bg-[#FF6B00] hover:bg-[#ea580c] text-white font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isBookingSubmitting ? 'Confirming...' : 'Finalize Booking'}
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex-grow overflow-y-auto pr-2 space-y-3 custom-scrollbar" style={{ maxHeight: '350px' }}>
                  {selectedDate ? (
                    timeSlots.map(time => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`w-full p-4 rounded-xl text-left font-bold transition-all border
                          ${selectedTime === time 
                            ? 'bg-[#FF6B00]/20 border-[#FF6B00] text-[#FF6B00]' 
                            : 'bg-black/20 border-white/5 text-gray-300 hover:bg-white/10 hover:border-white/20'}
                        `}
                      >
                        {time}
                      </button>
                    ))
                  ) : (
                    <div className="h-full min-h-[150px] flex items-center justify-center text-gray-500 font-medium italic border border-dashed border-white/10 rounded-2xl p-6 text-center">
                      Please pick a date from the calendar to view available times.
                    </div>
                  )}
                </div>

                <div className="pt-6 mt-6 border-t border-white/10">
                  <button
                    disabled={!selectedDate || !selectedTime}
                    onClick={() => setBookingStep('details')}
                    className="w-full bg-[#FF6B00] hover:bg-[#ea580c] text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:-translate-y-1 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
                  >
                    Continue
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
