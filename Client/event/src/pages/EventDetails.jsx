import  { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api';

export default function EventDetails({ isAuthenticated, isDarkMode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api.get(`events/${id}`)
      .then(res => {
        setEvent(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

 const handleRegister = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setSubmitting(true);
    setMessage({ type: '', text: '' });

    try {
      await api.post(`events/${id}/register`);
      setMessage({ type: 'success', text: 'Success! Your registration has been confirmed.' });
      
      setEvent(prev => ({
        ...prev,
        seats_left: Math.max(0, prev.seats_left - 1)
      }));
    } catch (err) {
      const errorMsg = 
        err.response?.data?.detail || 
        err.response?.data?.error || 
        err.response?.data?.[0] || 
        'You have already registered for this event.';
        
      setMessage({ type: 'error', text: errorMsg });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-32 text-sm font-medium tracking-wider text-slate-400 animate-pulse">
        Fetching event specifications...
      </div>
    );
  }

  if (!event) {
    return (
      <div className={`text-center py-32 px-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
        <p className="text-sm mb-4">Event details not found or may have expired.</p>
        <Link to="/" className="text-blue-500 hover:underline font-semibold">Return to Directory</Link>
      </div>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-12 md:py-20 antialiased">
      {/* Navigation Link */}
      <Link to="/" className="group inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white mb-8 transition-colors">
        <svg className="w-3 h-3 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Events
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column: Context Area */}
        <div className="lg:col-span-8 space-y-6">
          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>
            {event.title}
          </h1>

          <div className={`text-base sm:text-lg leading-relaxed font-light whitespace-pre-wrap ${
            isDarkMode ? 'text-slate-300' : 'text-slate-600'
          }`}>
            {event.description}
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 w-full">
          <div className={`border rounded-2xl p-6 md:p-8 space-y-6 shadow-sm backdrop-blur-xl transition-all duration-300 ${
            isDarkMode 
              ? 'bg-[#0f172a]/40 border-slate-800/80 shadow-black/20' 
              : 'bg-white border-slate-200/80 shadow-slate-100'
          }`}>
            
            <div className="space-y-4">
              <h3 className={`text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Event Details
              </h3>
              
              <div className="space-y-4 text-sm">
                
                <div className="flex items-start gap-3">
                  <span className="text-base mt-0.5">📅</span>
                  <div className="space-y-0.5">
                    <span className={`block font-medium ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>Date & Time</span>
                    <span className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      {new Date(event.date).toLocaleString([], { dateStyle: 'long', timeStyle: 'short' })}
                    </span>
                  </div>
                </div>

                {/* Venue  */}
                <div className="flex items-start gap-3">
                  <span className="text-base mt-0.5">📍</span>
                  <div className="space-y-0.5">
                    <span className={`block font-medium ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>Venue</span>
                    <span className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{event.location}</span>
                  </div>
                </div>

                {/* Live Seats */}
                <div className="flex items-start gap-3">
                  <span className="text-base mt-0.5">🎟️</span>
                  <div className="space-y-0.5">
                    <span className={`block font-medium ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>Availability</span>
                    <span className={`text-xs font-semibold ${
                      event.seats_left === 0 
                        ? 'text-rose-500' 
                        : event.seats_left <= 5 ? 'text-amber-500' : 'text-emerald-500'
                    }`}>
                      {event.seats_left === 0 ? 'Fully Booked' : `${event.seats_left} seats left (out of ${event.max_seats})`}
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/*  Banner */}
            {message.text && (
              <div className={`p-3.5 rounded-xl text-xs font-semibold border ${
                message.type === 'success' 
                  ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-500' 
                  : 'bg-rose-500/5 border-rose-500/20 text-rose-500'
              }`}>
                {message.type === 'success' ? '✓ ' : '⚠️ '} {message.text}
              </div>
            )}

            <button 
              onClick={handleRegister}
              disabled={submitting || event.seats_left === 0}
              className={`w-full font-semibold text-xs uppercase tracking-wider py-4 rounded-xl shadow-sm transition-all duration-200 active:scale-[0.98] disabled:opacity-50 ${
                event.seats_left === 0
                  ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
                  : isDarkMode 
                    ? 'bg-white text-slate-950 hover:bg-slate-100' 
                    : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              {submitting ? 'Confirming Attendance...' : event.seats_left === 0 ? 'Sold Out' : 'Register for this Event'}
            </button>

          </div>
        </div>

      </div>
    </main>
  );
}