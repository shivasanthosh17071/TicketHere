import { useState, useMemo, useEffect } from "react";
import { Search } from "lucide-react";
import { movies } from "@/data/movies";
import MovieCard from "@/components/ui/MovieCard";
import LanguageTabs from "@/components/ui/LanguageTabs";
import TopNav from "@/components/layout/TopNav";
import BottomNav from "@/components/layout/BottomNav";
import Sidebar from "@/components/layout/Sidebar";
import NotificationPanel from "@/components/ui/NotificationPanel";
import { HomeSkeleton } from "@/components/ui/SkeletonLoader";

const categories = ["Now Showing", "Coming Soon", "Trending", "Top Rated"];

const HomePage = () => {
  const [language, setLanguage] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Now Showing");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const filtered = useMemo(() => {
    let list = movies;
    if (language !== "All") list = list.filter(m => m.language === language);
    if (searchQuery) list = list.filter(m => m.title.toLowerCase().includes(searchQuery.toLowerCase()));
    return list;
  }, [language, searchQuery]);

  const nowShowing = filtered.filter(m => m.nowShowing);
  const trending = filtered.filter(m => m.trending);
  const comingSoon = filtered.filter(m => m.comingSoon);

  return (
    <div className="min-h-screen bg-cinema-bg">
      <TopNav />
      <Sidebar />
      <main className="lg:ml-60 pb-20 lg:pb-8">
        {loading ? (
          <HomeSkeleton />
        ) : (
          <>
            {/* Search */}
            <div className="px-4 pt-4">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-cinema-muted" />
                <input
                  type="text"
                  placeholder="Search movies, theaters, events..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-cinema-card border border-cinema-border rounded-xl pl-10 pr-4 py-3 text-sm font-body text-foreground placeholder:text-cinema-muted focus:outline-none focus:border-cinema-red/50"
                />
              </div>
            </div>

            {/* Language Tabs */}
            <div className="px-4 mt-3">
              <LanguageTabs selected={language} onSelect={setLanguage} />
            </div>

            {/* Category Pills */}
            <div className="px-4 mt-3 flex gap-2 overflow-x-auto scrollbar-hide">
              {categories.map(c => (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  className={`px-4 py-1.5 rounded-full text-xs font-body font-medium whitespace-nowrap transition-all ${c === activeCategory ? "bg-cinema-gold text-cinema-bg" : "bg-cinema-elevated text-cinema-muted"}`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Now Showing */}
            {nowShowing.length > 0 && (
              <section className="mt-6 px-4">
                <h2 className="font-display text-2xl text-foreground tracking-wide mb-3">NOW SHOWING</h2>
                <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
                  {nowShowing.map(m => <MovieCard key={m.id} movie={m} size="large" />)}
                </div>
              </section>
            )}

            {/* Trending */}
            {trending.length > 0 && (
              <section className="mt-8 px-4">
                <h2 className="font-display text-2xl text-foreground tracking-wide mb-3">TRENDING THIS WEEK</h2>
                <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
                  {trending.map((m, i) => <MovieCard key={m.id} movie={m} rank={i + 1} />)}
                </div>
              </section>
            )}

            {/* Coming Soon */}
            {comingSoon.length > 0 && (
              <section className="mt-8 px-4">
                <h2 className="font-display text-2xl text-foreground tracking-wide mb-3">COMING SOON</h2>
                <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
                  {comingSoon.map(m => <MovieCard key={m.id} movie={m} />)}
                </div>
              </section>
            )}

            {/* Developer Credit */}
            <div className="mt-10 px-4 pb-4 text-center">
              <p className="text-[11px] font-mono text-cinema-muted">
                App developed by <span className="text-cinema-red font-semibold">Santhosh</span>
              </p>
            </div>
          </>
        )}
      </main>
      <BottomNav />
      <NotificationPanel />
    </div>
  );
};

export default HomePage;
