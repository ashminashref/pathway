import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api';

export default function EventDetails({ isAuthenticated, theme }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api.get(`events/${id}/`)
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
      await api.post(`events/${id}/register/`);
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

  const isDark = theme === 'dark';

  if (loading) {
    return (
      <div className={`text-center py-48 text-[11px] font-bold tracking-widest uppercase animate-pulse ${
        isDark ? 'text-white/40' : 'text-slate-400'
      }`}>
        Fetching event specifications...
      </div>
    );
  }

  if (!event) {
    return (
      <div className="text-center py-48 px-4">
        <p className={`text-sm tracking-wide font-light mb-6 ${isDark ? 'text-white/70' : 'text-slate-500'}`}>
          Event details not found or may have expired.
        </p>
        <Link to="/" className="text-[#5ca122] dark:text-[#96f940] hover:underline text-xs tracking-widest uppercase font-bold">
          Return to Directory
        </Link>
      </div>
    );
  }

  return (
    <main className="w-full max-w-7xl mx-auto px-4 py-12 md:py-16 antialiased font-sans">
      
      <Link 
        to="/" 
        className={`group inline-flex items-center gap-2.5 text-[10px] uppercase tracking-widest font-bold mb-12 transition-colors ${
          isDark ? 'text-white/60 hover:text-white' : 'text-slate-500 hover:text-slate-950'
        }`}
      >
        <svg className="w-4 h-4 stroke-current transition-transform group-hover:-translate-x-1" fill="none" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        Back to Directory
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Column */}
        <div className="lg:col-span-7 space-y-8">
          <h1 className={`text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] ${
            isDark ? 'text-white' : 'text-slate-950'
          }`}>
            {event.title}
          </h1>

          <div className="h-1 w-20 bg-[#5ca122] dark:bg-[#96f940] rounded-full"></div>

          <div className={`text-sm sm:text-base leading-relaxed font-light whitespace-pre-wrap tracking-wide max-w-3xl ${
            isDark ? 'text-white/80' : 'text-slate-600'
          }`}>
            {event.description}
          </div>
        </div>

        {/* Right Column   */}
        <div className="lg:col-span-5 w-full">
          <div className={`rounded-3xl p-8 md:p-10 space-y-8 shadow-sm border ${
            isDark 
              ? 'bg-[#141414] border-white/5 text-white' 
              : 'bg-[#f4f4f4] border-slate-200/60 text-slate-950'
          }`}>
            
            <div className="space-y-6">
              <h3 className={`text-[10px] font-bold uppercase tracking-widest pb-4 border-b ${
                isDark ? 'text-white/30 border-white/5' : 'text-slate-400 border-slate-200'
              }`}>
                Registration Profile
              </h3>
              
              <div className="space-y-6 text-sm">
                
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-2xl text-lg border ${
                    isDark ? 'bg-white/5 border-white/5' : 'bg-white border-slate-200'
                  }`}>📅</div>
                  <div className="space-y-1">
                    <span className={`block text-[10px] font-bold tracking-wider uppercase ${isDark ? 'text-white/40' : 'text-slate-400'}`}>Date & Time</span>
                    <span className={`text-sm font-medium ${isDark ? 'text-white/90' : 'text-slate-800'}`}>
                      {new Date(event.date).toLocaleString([], { dateStyle: 'long', timeStyle: 'short' })}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-2xl text-lg border ${
                    isDark ? 'bg-white/5 border-white/5' : 'bg-white border-slate-200'
                  }`}>📍</div>
                  <div className="space-y-1">
                    <span className={`block text-[10px] font-bold tracking-wider uppercase ${isDark ? 'text-white/40' : 'text-slate-400'}`}>Venue Location</span>
                    <span className={`text-sm font-medium ${isDark ? 'text-white/90' : 'text-slate-800'}`}>{event.location}</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-2xl text-lg border ${
                    isDark ? 'bg-white/5 border-white/5' : 'bg-white border-slate-200'
                  }`}>🎟️</div>
                  <div className="space-y-1">
                    <span className={`block text-[10px] font-bold tracking-wider uppercase ${isDark ? 'text-white/40' : 'text-slate-400'}`}>Pass Availability</span>
                    <span className={`text-sm font-bold ${
                      event.seats_left === 0 
                        ? 'text-rose-500' 
                        : event.seats_left <= 5 ? 'text-amber-500' : 'text-[#5ca122] dark:text-[#96f940]'
                    }`}>
                      {event.seats_left === 0 ? 'Fully Booked' : `${event.seats_left} seats left (out of ${event.max_seats})`}
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {message.text && (
              <div className={`p-4 rounded-2xl text-xs font-semibold border tracking-wide transition-all ${
                message.type === 'success' 
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400' 
                  : 'bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400'
              }`}>
                {message.type === 'success' ? '✓ ' : '⚠️ '} {message.text}
              </div>
            )}

            {/* Call to Action Button */}
            <button 
              onClick={handleRegister}
              disabled={submitting || event.seats_left === 0}
              className={`w-full font-bold text-xs uppercase tracking-widest py-4 px-6 rounded-full shadow-md transition-all active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none flex justify-center items-center gap-2 ${
                event.seats_left === 0
                  ? (isDark ? 'bg-white/5 text-white/30 border border-white/5' : 'bg-slate-200 text-slate-400')
                  : 'bg-slate-950 text-white dark:bg-[#96f940] dark:text-slate-950 dark:hover:bg-[#86e236] hover:opacity-90'
              }`}
            >
              <span>{submitting ? 'Confirming Attendance...' : event.seats_left === 0 ? 'Sold Out' : 'Get Tickets'}</span>
              {event.seats_left > 0 && !submitting && (
                <svg className="w-3.5 h-3.5 stroke-current" fill="none" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              )}
            </button>

          </div>
        </div>

      </div>
    </main>
  );
}