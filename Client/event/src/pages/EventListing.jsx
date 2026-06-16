import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

export default function EventListing({ isDarkMode }) {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('events')
      .then(res => {
        setEvents(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredEvents = events.filter(e => 
    e.title.toLowerCase().includes(search.toLowerCase()) || 
    e.location.toLowerCase().includes(search.toLowerCase())
  );

  const featuredEvents = events.slice(0, 3);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-[#090d16]' : 'bg-slate-50'
    }`}>
      
      <header className={`border-b transition-colors duration-300 py-16 px-4 md:py-20 ${
        isDarkMode ? 'border-slate-800 bg-[#0f172a]/40' : 'border-slate-200 bg-white'
      }`}>
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Find and Register for Events
          </h1>
          <p className={`text-sm sm:text-base max-w-xl mx-auto leading-relaxed ${
            isDarkMode ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Browse our scheduled sessions, view detailed event parameters, and claim your registration slot seamlessly.
          </p>

          <div className="max-w-md mx-auto pt-2">
            <div className={`flex flex-col sm:flex-row gap-2 border rounded-xl p-1.5 transition-all w-full ${
              isDarkMode ? 'bg-slate-950 border-slate-800 focus-within:border-amber-500' : 'bg-white border-slate-200 focus-within:border-amber-500 shadow-sm'
            }`}>
              <input 
                type="text" 
                placeholder="Search events by title or city..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent border-none text-sm w-full py-2.5 px-3 focus:outline-none placeholder-slate-500"
              />
              <button className="bg-amber-500 hover:bg-amber-400 font-semibold text-slate-950 px-6 py-2.5 text-xs uppercase tracking-wider rounded-lg transition-colors whitespace-nowrap">
                Search
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        
        {!loading && events.length >= 3 && !search && (
          <div className="mb-16 space-y-4">
            <h2 className={`text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Featured Highlights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[18rem]">
              
              {/* Box 1 */}
              <div className={`md:col-span-2 relative group overflow-hidden border rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 ${
                isDarkMode ? 'bg-[#0f172a] border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
              }`}>
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded">Featured Workshop</span>
                  <h3 className={`text-xl sm:text-2xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{featuredEvents[0].title}</h3>
                  <p className={`text-xs sm:text-sm line-clamp-3 font-light max-w-xl ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{featuredEvents[0].description}</p>
                </div>
                <Link to={`/events/${featuredEvents[0].id}`} className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-500 dark:text-amber-500 mt-4">
                  Explore Masterclass <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>

              {/* Box 2  */}
              <div className={`relative group overflow-hidden border rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 ${
                isDarkMode ? 'bg-[#0f172a] border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
              }`}>
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded">Trending Session</span>
                  <h3 className={`text-lg font-bold tracking-tight line-clamp-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{featuredEvents[1].title}</h3>
                  <p className={`text-xs line-clamp-4 font-light ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{featuredEvents[1].description}</p>
                </div>
                <Link to={`/events/${featuredEvents[1].id}`} className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-500 dark:text-amber-500 mt-4">
                  View Space <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>

              {/* Box 3*/}
              <div className={`md:col-span-3 relative group overflow-hidden border rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-300 ${
                isDarkMode ? 'bg-[#0f172a] border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
              }`}>
                <div className="space-y-1.5 max-w-3xl">
                  <span className="inline-block text-[10px] uppercase font-bold tracking-wider text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded mb-1">Open Panel</span>
                  <h3 className={`text-lg font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{featuredEvents[2].title}</h3>
                  <p className={`text-xs line-clamp-2 font-light ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{featuredEvents[2].description}</p>
                </div>
                <Link to={`/events/${featuredEvents[2].id}`} className={`text-center font-semibold text-xs uppercase tracking-wider px-5 py-3 rounded-lg border transition-all whitespace-nowrap shrink-0 ${
                  isDarkMode ? 'border-slate-700 text-white bg-slate-900 hover:bg-white hover:text-slate-950' : 'border-slate-200 text-slate-700 bg-slate-50 hover:bg-slate-900 hover:text-white'
                }`}>
                  Secure Pass
                </Link>
              </div>

            </div>
          </div>
        )}

        <div className={`flex items-baseline justify-between border-b pb-4 mb-8 ${
          isDarkMode ? 'border-slate-800' : 'border-slate-200'
        }`}>
          <h2 className={`text-base font-bold tracking-tight uppercase text-slate-400`}>
            All Platform Events ({filteredEvents.length})
          </h2>
        </div>

        {loading ? (
          <div className="text-center py-12 text-sm text-slate-500 animate-pulse">Loading directory data...</div>
        ) : filteredEvents.length === 0 ? (
          <div className={`text-center py-16 border border-dashed rounded-xl ${
            isDarkMode ? 'border-slate-800 text-slate-500' : 'border-slate-200 text-slate-400'
          }`}>
            No events match your search criteria.
          </div>
        ) : (
          <div className="space-y-4">
            {filteredEvents.map(event => (
              <div 
                key={event.id} 
                className={`border rounded-xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 transition-all shadow-sm ${
                  isDarkMode 
                    ? 'bg-[#0f172a]/60 border-slate-800/80 hover:border-slate-700' 
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="space-y-3 flex-1 min-w-0 w-full">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-amber-500">
                    <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span className="hidden sm:inline text-slate-400">•</span>
                    <span className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>{event.location}</span>
                  </div>
                  <h3 className={`text-lg md:text-xl font-bold tracking-tight truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {event.title}
                  </h3>
                  <p className={`text-sm line-clamp-2 leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {event.description}
                  </p>
                </div>
                
                <Link 
                  to={`/events/${event.id}`} 
                  className={`w-full md:w-auto text-center font-semibold text-xs uppercase tracking-wider px-5 py-3 rounded-lg border transition-all whitespace-nowrap ${
                    isDarkMode 
                      ? 'border-slate-700 text-white bg-slate-900 hover:bg-white hover:text-slate-950' 
                      : 'border-slate-200 text-slate-700 bg-slate-50 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}