import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

export default function MyRegistrations({ isDarkMode }) {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('my-registrations')
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
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-[#090d16] text-slate-100' : 'bg-slate-50 text-slate-800'
    }`}>
      
      <header className={`border-b transition-colors duration-300 py-12 px-4 ${
        isDarkMode ? 'border-slate-800 bg-[#0f172a]/40' : 'border-slate-200 bg-white'
      }`}>
        <div className="max-w-5xl mx-auto space-y-2">
          <h1 className={`text-2xl sm:text-3xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            My Registrations
          </h1>
          <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            View and keep track of all the upcoming events you have signed up for.
          </p>
        </div>
      </header>

      {/* Main Registrations Index Content */}
      <main className="max-w-5xl mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-12 text-sm text-slate-500 animate-pulse font-medium">
            Loading your registrations...
          </div>
        ) : registrations.length === 0 ? (
          <div className={`text-center py-16 px-4 border border-dashed rounded-xl ${
            isDarkMode ? 'border-slate-800 bg-slate-900/20 text-slate-400' : 'border-slate-200 bg-white text-slate-500'
          }`}>
            <p className="text-sm mb-6 font-light">You have not registered for any events yet.</p>
            <Link 
              to="/" 
              className={`inline-block font-semibold text-xs uppercase tracking-wider px-6 py-3 rounded-lg border transition-all ${
                isDarkMode 
                  ? 'border-slate-700 bg-slate-900 text-white hover:bg-white hover:text-slate-950 hover:border-white' 
                  : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900'
              }`}
            >
              Browse Events
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {registrations.map(reg => (
              <div 
                key={reg.id} 
                className={`border rounded-xl p-6 flex flex-col justify-between space-y-4 transition-all shadow-sm ${
                  isDarkMode 
                    ? 'bg-[#0f172a]/60 border-slate-800/80 hover:border-slate-700' 
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="space-y-2.5 min-w-0 w-full">
                  <div className="flex justify-between items-start gap-2">
                    <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                      Confirmed
                    </span>
                    <span className={`text-[11px] whitespace-nowrap ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                      Registered: {new Date(reg.registered_at).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  
                  <h3 className={`text-base sm:text-lg font-bold tracking-tight truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {reg.event.title}
                  </h3>
                  
                  <div className={`text-xs flex items-center gap-1.5 truncate ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    <span>📍</span> {reg.event.location}
                  </div>
                </div>

                {/* Card CTA Footer */}
                <div className={`pt-4 border-t flex justify-end ${isDarkMode ? 'border-slate-800/60' : 'border-slate-100'}`}>
                  <Link 
                    to={`/events/${reg.event.id}`} 
                    className="text-xs font-semibold text-blue-500 hover:text-blue-600 dark:text-amber-500 dark:hover:text-amber-400 flex items-center gap-1 transition-colors"
                  >
                    View Details
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
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