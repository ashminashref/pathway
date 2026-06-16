import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

export default function MyRegistrations({ theme }) {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  const isDark = theme === 'dark';

  return (
    <div className="antialiased font-sans">
      
      <header className="max-w-7xl mx-auto pt-12 pb-8 px-4 space-y-3">
        <div className="space-y-2">
          <h1 className={`text-3xl sm:text-4xl font-black tracking-tight ${
            isDark ? 'text-white' : 'text-slate-950'
          }`}>
            My Registrations
          </h1>
          <p className={`text-xs sm:text-sm font-light tracking-wide max-w-xl ${
            isDark ? 'text-white/60' : 'text-slate-500'
          }`}>
            View, track, and manage your verified schedules across your active digital sessions.
          </p>
        </div>
        <div className={`h-[1px] w-full pt-2 ${isDark ? 'bg-white/5' : 'bg-slate-200'}`}></div>
      </header>

      <main className="max-w-7xl mx-auto px-4 pb-24">
        {loading ? (
          <div className="text-center py-24 text-[11px] tracking-widest uppercase text-[#5ca122] dark:text-[#96f940] animate-pulse">
            Loading authorization ledger...
          </div>
        ) : registrations.length === 0 ? (
          <div className={`text-center py-20 px-4 border border-dashed rounded-3xl ${
            isDark ? 'border-white/10 bg-[#141414]/20' : 'border-slate-300 bg-[#f4f4f4]/40'
          }`}>
            <p className={`text-sm font-light tracking-wide mb-6 ${isDark ? 'text-white/50' : 'text-slate-400'}`}>
              You have not registered for any active events yet.
            </p>
            <Link 
              to="/" 
              className="inline-flex items-center gap-1.5 font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded-full bg-slate-950 text-white dark:bg-[#96f940] dark:text-slate-950 shadow-md hover:opacity-90 transition-all"
            >
              Browse Directory
              <svg className="w-3.5 h-3.5 stroke-current" fill="none" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {registrations.map((reg, index) => {
              const isEven = index % 2 === 0;
              
              let cardStyle = "";
              let titleStyle = "";
              let descStyle = "";
              let borderStyle = "";

              if (isDark) {
                cardStyle = isEven ? "bg-[#f4f4f4]" : "bg-[#141414] border border-white/5";
                titleStyle = isEven ? "text-slate-950" : "text-white";
                descStyle = isEven ? "text-slate-500" : "text-white/40";
                borderStyle = isEven ? "border-slate-200" : "border-white/5";
              } else {
                cardStyle = isEven ? "bg-white border border-slate-200/80" : "bg-[#f4f4f4]";
                titleStyle = "text-slate-950";
                descStyle = "text-slate-400";
                borderStyle = isEven ? "border-slate-100" : "border-slate-200/60";
              }

              return (
                <div 
                  key={reg.id} 
                  className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 transition-all duration-300 shadow-sm ${cardStyle}`}
                >
                  <div className="space-y-4 min-w-0 w-full">
                    <div className="flex justify-between items-center gap-4">
                      <span className={`inline-block text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                        isDark && isEven 
                          ? 'bg-slate-950 text-white' 
                          : 'bg-[#5ca122] text-white dark:bg-[#96f940] dark:text-slate-950'
                      }`}>
                        Confirmed Pass
                      </span>
                      <span className={`text-[10px] font-medium tracking-wide ${descStyle}`}>
                        Enrolled: {new Date(reg.registered_at).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    
                    <h3 className={`text-xl font-bold tracking-tight truncate ${titleStyle}`}>
                      {reg.event.title}
                    </h3>
                    
                    <div className={`text-xs flex items-center gap-2 font-light tracking-wide truncate ${
                      isDark && isEven ? 'text-slate-600' : 'text-slate-500 dark:text-white/60'
                    }`}>
                      <span className="text-base opacity-80">📍</span> {reg.event.location}
                    </div>
                  </div>

                  <div className={`pt-4 border-t flex justify-end ${borderStyle}`}>
                    <Link 
                      to={`/events/${reg.event.id}/`} 
                      className={`text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 transition-colors group/link ${
                        isDark && isEven ? 'text-slate-700 hover:text-slate-950' : 'text-slate-500 hover:text-slate-950 dark:text-white/70 dark:hover:text-white'
                      }`}
                    >
                      Access Gateway
                      <svg className="w-3.5 h-3.5 stroke-current text-[#5ca122] dark:text-[#96f940] transition-transform group-hover/link:translate-x-0.5" fill="none" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}