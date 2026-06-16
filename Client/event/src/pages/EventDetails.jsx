import React, { useState, useEffect } from 'react';
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

  if (loading) {
    return (
      <div className="text-center py-48 text-[13px] font-medium tracking-widest uppercase text-white/50 animate-pulse">
        Fetching event specifications...
      </div>
    );
  }

  if (!event) {
    return (
      <div className="text-center py-48 px-4 text-white">
        <p className="text-sm tracking-wide font-light opacity-80 mb-6">Event details not found or may have expired.</p>
        <Link to="/" className="text-[#96f940] hover:underline text-xs tracking-widest uppercase font-semibold">
          Return to Directory
        </Link>
      </div>
    );
  }

  return (
    <main className="w-full max-w-7xl mx-auto px-4 py-12 md:py-16 antialiased font-sans text-white">
      
      {/* Premium Back Navigation */}
      <Link to="/" className="group inline-flex items-center gap-2.5 text-[11px] uppercase tracking-widest font-bold text-white/60 hover:text-white mb-12 transition-colors">
        <svg className="w-4 h-4 stroke-current transition-transform group-hover:-translate-x-1" fill="none" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        Back to Directory
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Column: Hero Context Info */}
        <div className="lg:col-span-7 space-y-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] text-white">
            {event.title}
          </h1>

          <div className="h-1 w-20 bg-[#96f940] rounded-full"></div>

          <div className="text-base sm:text-lg leading-relaxed font-light text-white/80 whitespace-pre-wrap tracking-wide max-w-3xl">
            {event.description}
          </div>
        </div>

        {/* Right Column: Premium Sidebar Widget Container */}
        <div className="lg:col-span-5 w-full">
          <div className="rounded-3xl p-8 md:p-10 space-y-8 backdrop-blur-xl bg-white/[0.06] border border-white/10 shadow-2xl">
            
            <div className="space-y-6">
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-white/40 border-b border-white/10 pb-4">
                Registration Profile
              </h3>
              
              <div className="space-y-6 text-sm">
                
                {/* Schedule Integration Layout */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/5 rounded-2xl text-xl border border-white/5">📅</div>
                  <div className="space-y-1">
                    <span className="block text-[11px] font-bold tracking-wider uppercase text-white/50">Date & Time</span>
                    <span className="text-sm font-medium text-white/90">
                      {new Date(event.date).toLocaleString([], { dateStyle: 'long', timeStyle: 'short' })}
                    </span>
                  </div>
                </div>

                {/* Venue Layout */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/5 rounded-2xl text-xl border border-white/5">📍</div>
                  <div className="space-y-1">
                    <span className="block text-[11px] font-bold tracking-wider uppercase text-white/50">Venue Location</span>
                    <span className="text-sm font-medium text-white/90">{event.location}</span>
                  </div>
                </div>

                {/* Live Capacity Indicators */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/5 rounded-2xl text-xl border border-white/5">🎟️</div>
                  <div className="space-y-1">
                    <span className="block text-[11px] font-bold tracking-wider uppercase text-white/50">Pass Availability</span>
                    <span className={`text-sm font-bold ${
                      event.seats_left === 0 
                        ? 'text-rose-400' 
                        : event.seats_left <= 5 ? 'text-amber-400' : 'text-[#96f940]'
                    }`}>
                      {event.seats_left === 0 ? 'Fully Booked' : `${event.seats_left} seats left (out of ${event.max_seats})`}
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Application Feedback Banner Context */}
            {message.text && (
              <div className={`p-4 rounded-2xl text-xs font-semibold border tracking-wide transition-all ${
                message.type === 'success' 
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                  : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
              }`}>
                {message.type === 'success' ? '✓ ' : '⚠️ '} {message.text}
              </div>
            )}

            {/* Aeline-Spec Call to Action Component Button */}
            <button 
              onClick={handleRegister}
              disabled={submitting || event.seats_left === 0}
              className={`w-full font-bold text-xs uppercase tracking-widest py-4 px-6 rounded-full shadow-lg transition-all duration-300 active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none flex justify-center items-center gap-2 ${
                event.seats_left === 0
                  ? 'bg-white/10 text-white/40 cursor-not-allowed border border-white/10'
                  : 'bg-[#96f940] text-slate-950 hover:bg-[#86e236] hover:scale-[1.01]'
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