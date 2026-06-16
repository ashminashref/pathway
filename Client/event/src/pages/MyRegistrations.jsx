import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

export default function MyRegistrations() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Explicit trailing slash added to prevent network redirect header dropping
    api.get('my-registrations/')
      .then(res => {
        setRegistrations(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen text-white antialiased font-sans">
      
      {/* Premium Minimalist Section Header */}
      <header className="max-w-7xl mx-auto pt-8 pb-12 px-4 space-y-3">
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            My Registrations
          </h1>
          <p className="text-xs sm:text-sm font-light text-white/60 tracking-wide max-w-xl">
            View, track, and manage your verified schedules across your active digital sessions.
          </p>
        </div>
        <div className="h-[1px] w-full bg-white/10 pt-2"></div>
      </header>

      {/* Main Registrations Content Matrix */}
      <main className="max-w-7xl mx-auto px-4 pb-24">
        {loading ? (
          <div className="text-center py-24 text-[13px] tracking-widest uppercase text-white/40 animate-pulse">
            Loading authorization ledger...
          </div>
        ) : registrations.length === 0 ? (
          <div className="text-center py-20 px-4 border border-dashed border-white/10 rounded-3xl backdrop-blur-md bg-white/[0.02]">
            <p className="text-sm font-light text-white/50 tracking-wide mb-6">You have not registered for any active events yet.</p>
            <Link 
              to="/" 
              className="inline-flex items-center gap-1.5 font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded-full bg-[#96f940] text-slate-950 hover:bg-[#86e236] shadow-lg transition-all duration-200"
            >
              Browse Directory
              <svg className="w-3.5 h-3.5 stroke-current" fill="none" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {registrations.map(reg => (
              <div 
                key={reg.id} 
                className="rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 transition-all duration-300 backdrop-blur-xl bg-white/[0.04] border border-white/5 hover:border-white/15 hover:bg-white/[0.07] shadow-xl group"
              >
                <div className="space-y-4 min-w-0 w-full">
                  <div className="flex justify-between items-center gap-4">
                    <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-slate-950 bg-[#96f940] px-3 py-1 rounded-full">
                      Confirmed Pass
                    </span>
                    <span className="text-[11px] font-medium tracking-wide text-white/40">
                      Enrolled: {new Date(reg.registered_at).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold tracking-tight text-white truncate">
                    {reg.event.title}
                  </h3>
                  
                  <div className="text-xs flex items-center gap-2 text-white/60 font-light tracking-wide truncate">
                    <span className="text-base opacity-80">📍</span> {reg.event.location}
                  </div>
                </div>

                {/* Glassmorphic Divider and Card Footer */}
                <div className="pt-4 border-t border-white/5 flex justify-end">
                  <Link 
                    to={`/events/${reg.event.id}/`} 
                    className="text-xs font-bold uppercase tracking-widest text-white/70 hover:text-white flex items-center gap-1.5 transition-colors group/link"
                  >
                    Access Gateway
                    <svg className="w-3.5 h-3.5 stroke-current text-[#96f940] transition-transform group-hover/link:translate-x-0.5" fill="none" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}