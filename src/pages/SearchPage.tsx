import { useState } from "react";
import { Search as SearchIcon, X, Clock, Flame } from "lucide-react";
import { movies } from "@/data/movies";
import { theaters } from "@/data/theaters";
import { useNavigate } from "react-router-dom";
import TopNav from "@/components/layout/TopNav";
import BottomNav from "@/components/layout/BottomNav";
import Sidebar from "@/components/layout/Sidebar";
import { Star } from "lucide-react";

const SearchPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState(["Baahubali", "Kalki", "PVR Cinemas"]);

  const results = query.length > 0
    ? movies.filter(m => m.title.toLowerCase().includes(query.toLowerCase()))
    : [];

  const trendingMovies = movies.filter(m => m.trending).slice(0, 6);

  const removeRecent = (s: string) => setRecentSearches(prev => prev.filter(r => r !== s));

  return (
    <div className="min-h-screen bg-cinema-bg">
      <TopNav />
      <Sidebar />
      <main className="lg:ml-60 pb-20 lg:pb-8">
        {/* Search input */}
        <div className="px-4 pt-4">
          <div className="relative flex items-center gap-2">
            <div className="relative flex-1">
              <SearchIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-cinema-muted" />
              <input
                type="text"
                autoFocus
                placeholder="Search movies, theaters..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="w-full bg-cinema-card border border-cinema-border rounded-xl pl-10 pr-10 py-3 text-sm font-body text-foreground placeholder:text-cinema-muted focus:outline-none focus:border-cinema-red/50"
              />
              {query && (
                <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                  <X size={16} className="text-cinema-muted" />
                </button>
              )}
            </div>
          </div>
        </div>

        {query.length === 0 ? (
          <div className="px-4 mt-6">
            {/* Recent */}
            {recentSearches.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-body font-semibold text-foreground mb-3">Recent Searches</h3>
                <div className="flex gap-2 flex-wrap">
                  {recentSearches.map(s => (
                    <div key={s} className="flex items-center gap-1.5 bg-cinema-card border border-cinema-border rounded-full px-3 py-1.5">
                      <Clock size={12} className="text-cinema-muted" />
                      <span className="text-xs text-cinema-muted font-body">{s}</span>
                      <button onClick={() => removeRecent(s)}><X size={12} className="text-cinema-muted/60" /></button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Trending */}
            <div className="mb-6">
              <h3 className="text-sm font-body font-semibold text-foreground mb-3 flex items-center gap-1">
                <Flame size={14} className="text-cinema-red" /> Trending Searches
              </h3>
              <div className="flex gap-2 flex-wrap">
                {trendingMovies.map(m => (
                  <button
                    key={m.id}
                    onClick={() => setQuery(m.title)}
                    className="bg-cinema-elevated text-cinema-muted text-xs font-body px-3 py-1.5 rounded-full hover:text-foreground transition-colors"
                  >
                    {m.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Popular Theaters */}
            <div>
              <h3 className="text-sm font-body font-semibold text-foreground mb-3">Popular Theaters</h3>
              <div className="space-y-2">
                {theaters.slice(0, 4).map(t => (
                  <div key={t.id} className="flex items-center justify-between bg-cinema-card border border-cinema-border rounded-xl p-3">
                    <div>
                      <p className="text-sm font-body font-medium text-foreground">{t.name}</p>
                      <p className="text-[10px] text-cinema-muted font-body">{t.area}</p>
                    </div>
                    <span className="text-[10px] text-cinema-muted font-mono">{t.distance}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : results.length > 0 ? (
          <div className="px-4 mt-4 space-y-3">
            {results.map((m, i) => (
              <button
                key={m.id}
                onClick={() => navigate(`/movie/${m.id}`)}
                className="w-full flex items-center gap-3 bg-cinema-card border border-cinema-border rounded-xl p-3 hover:border-cinema-red/30 transition-all"
                style={{ animation: `fade-in-up 0.3s ease-out ${i * 0.05}s forwards`, opacity: 0 }}
              >
                <img src={m.poster} alt={m.title} className="w-14 h-20 rounded-lg object-cover flex-shrink-0" />
                <div className="flex-1 text-left min-w-0">
                  <p className="text-sm font-body font-semibold text-foreground truncate">{m.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-cinema-muted font-body">{m.language}</span>
                    {m.rating && (
                      <div className="flex items-center gap-0.5">
                        <Star size={10} className="text-cinema-gold fill-cinema-gold" />
                        <span className="text-[10px] text-cinema-gold font-mono">{m.rating}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-1 mt-1">
                    {m.genre.slice(0, 2).map(g => (
                      <span key={g} className="text-[8px] bg-cinema-elevated text-cinema-muted px-1.5 py-0.5 rounded font-body">{g}</span>
                    ))}
                  </div>
                </div>
                <span className="text-xs text-cinema-red font-body font-medium">Book →</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-20 px-4">
            <SearchIcon size={48} className="text-cinema-muted/30 mb-4" />
            <p className="text-cinema-muted font-body text-sm">No movies found for "{query}"</p>
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  );
};

export default SearchPage;
