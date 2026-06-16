import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

export default function EventListing({ theme }) {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('events/')
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

  const isDark = theme === 'dark';

  return (
    <div className="antialiased font-sans pb-20">
      
      <header className="max-w-4xl mx-auto text-center pt-16 pb-12 px-4 space-y-4">
        <h1 className={`text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight leading-[1.1] ${
          isDark ? 'text-white' : 'text-slate-950'
        }`}>
          intelligent <span className="font-semibold">innovation</span>
        </h1>
        <p className={`text-xs sm:text-sm max-w-md mx-auto leading-relaxed tracking-wide font-light ${
          isDark ? 'text-white/50' : 'text-slate-500'
        }`}>
          Whether you're optimizing today or building for tomorrow we help you move faster with confidence.
        </p>

        <div className="max-w-md mx-auto pt-6">
          <div className={`flex items-center border rounded-full p-1.5 pl-5 transition-all focus-within:border-[#5ca122] shadow-sm ${
            isDark ? 'bg-[#141414] border-white/10' : 'bg-white border-slate-200'
          }`}>
            <input 
              type="text" 
              placeholder="Search events by title or city..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`bg-transparent border-none text-xs w-full py-2 focus:outline-none tracking-wide ${
                isDark ? 'text-white placeholder-white/30' : 'text-slate-950 placeholder-slate-400'
              }`}
            />
            <button className="bg-slate-950 hover:bg-slate-800 dark:bg-[#96f940] dark:hover:bg-[#86e236] font-bold text-white dark:text-slate-950 px-6 py-2.5 text-[11px] uppercase tracking-wider rounded-full transition-all">
              Search
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 mt-6">
        
        <div className={`flex items-baseline justify-between border-b pb-3 mb-8 ${isDark ? 'border-white/5' : 'border-slate-200'}`}>
          <h2 className={`text-[10px] font-bold tracking-widest uppercase ${isDark ? 'text-white/30' : 'text-slate-400'}`}>
            All Platform Events ({filteredEvents.length})
          </h2>
        </div>

        {loading ? (
          <div className="text-center py-20 text-[11px] tracking-widest uppercase text-[#5ca122] dark:text-[#96f940] animate-pulse">
            Loading directory data...
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className={`text-center py-25 border border-dashed rounded-3xl text-xs tracking-wide ${
            isDark ? 'border-white/10 text-white/30' : 'border-slate-300 text-slate-400'
          }`}>
            No active events match your current search criteria.
          </div>
        ) : (
          <div className="space-y-6">
            {filteredEvents.map((event, index) => {
              const isEven = index % 2 === 0;
              
              let containerClasses = "";
              let titleClasses = "";
              let descriptionClasses = "";
              let metaClasses = "";

              if (isDark) {
                containerClasses = isEven ? "bg-[#f4f4f4]" : "bg-[#141414] border border-white/5";
                titleClasses = isEven ? "text-slate-950" : "text-white";
                descriptionClasses = isEven ? "text-slate-600" : "text-white/60";
                metaClasses = isEven ? "text-slate-500" : "text-white/40";
              } else {
                containerClasses = isEven ? "bg-white border border-slate-200/80" : "bg-[#f4f4f4]";
                titleClasses = "text-slate-950";
                descriptionClasses = "text-slate-500";
                metaClasses = "text-slate-400";
              }

              return (
                <div 
                  key={event.id} 
                  className={`rounded-3xl p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 transition-all shadow-sm ${containerClasses}`}
                >
                  <div className="space-y-4 flex-1 min-w-0 w-full">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-bold uppercase tracking-widest">
                      <span className={metaClasses}>
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span className={metaClasses}>•</span>
                      <span className="text-[#5ca122] dark:text-[#96f940]">
                        {event.location}
                      </span>
                    </div>

                    <h3 className={`text-2xl font-bold tracking-tight ${titleClasses}`}>
                      {event.title}
                    </h3>
                    
                    <p className={`text-xs leading-relaxed font-light tracking-wide line-clamp-2 max-w-3xl ${descriptionClasses}`}>
                      {event.description}
                    </p>
                  </div>
                  
                  <Link 
                    to={`/events/${event.id}/`} 
                    className={`w-full md:w-auto text-center font-bold text-[11px] uppercase tracking-wider px-6 py-3.5 rounded-full transition-all duration-200 whitespace-nowrap flex items-center justify-center gap-2 group shrink-0 ${
                      isDark && isEven 
                        ? 'bg-slate-950 text-white hover:bg-[#96f940] hover:text-slate-950' 
                        : 'bg-slate-950 text-white dark:bg-[#96f940] dark:text-slate-950 hover:opacity-90'
                    }`}
                  >
                    Get Tickets
                    <svg className="w-3 h-3 stroke-current transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}