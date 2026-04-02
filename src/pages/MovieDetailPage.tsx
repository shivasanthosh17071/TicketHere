import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Share2, Star, Clock, Calendar } from "lucide-react";
import { movies } from "@/data/movies";
import { useBooking } from "@/context/BookingContext";
import { useFavorites } from "@/context/FavoritesContext";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MovieDetailSkeleton } from "@/components/ui/SkeletonLoader";

const MovieDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setSelectedMovie } = useBooking();
  const { isFavorite, toggleFavorite } = useFavorites();
  const movie = movies.find(m => m.id === Number(id));
  const [activeTab, setActiveTab] = useState("about");
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [id]);

  if (!movie) return <div className="min-h-screen bg-cinema-bg flex items-center justify-center text-foreground">Movie not found</div>;

  const liked = isFavorite(movie.id);

  const handleBook = () => {
    setSelectedMovie(movie);
    navigate(`/movie/${movie.id}/theaters`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cinema-bg">
        <MovieDetailSkeleton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cinema-bg pb-24">
      {/* Hero */}
      <div className="relative h-[45vh] min-h-[300px]">
        <img src={movie.hero} alt={movie.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-hero-gradient" />
        <button onClick={() => navigate(-1)} className="absolute top-4 left-4 p-2 bg-cinema-bg/50 rounded-full backdrop-blur-sm">
          <ArrowLeft size={20} className="text-foreground" />
        </button>
        <div className="absolute top-4 right-4 flex gap-2">
          <motion.button
            whileTap={{ scale: 1.3 }}
            onClick={() => toggleFavorite(movie.id)}
            className="p-2 bg-cinema-bg/50 rounded-full backdrop-blur-sm"
          >
            <Heart size={20} className={liked ? "text-cinema-red fill-cinema-red" : "text-foreground"} />
          </motion.button>
          <button className="p-2 bg-cinema-bg/50 rounded-full backdrop-blur-sm">
            <Share2 size={20} className="text-foreground" />
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="px-4 -mt-16 relative z-10">
        <div className="flex gap-2 mb-2">
          <span className="text-[10px] bg-cinema-red/20 text-cinema-red px-2 py-0.5 rounded font-mono">{movie.certificate}</span>
          <span className="text-[10px] bg-cinema-elevated text-cinema-muted px-2 py-0.5 rounded font-mono">{movie.language}</span>
        </div>
        <h1 className="font-display text-4xl text-foreground tracking-wide">{movie.title}</h1>
        <div className="flex items-center gap-3 mt-2">
          {movie.rating && (
            <div className="flex items-center gap-1">
              <Star size={16} className="text-cinema-gold fill-cinema-gold" />
              <span className="text-cinema-gold font-mono text-sm">{movie.rating}/10</span>
              <span className="text-cinema-muted text-xs">({movie.votes} votes)</span>
            </div>
          )}
        </div>
        <div className="flex gap-2 mt-3 flex-wrap">
          {movie.formats.map(f => (
            <span key={f} className="text-xs bg-cinema-elevated text-cinema-muted px-3 py-1 rounded-full font-body border border-cinema-border">{f}</span>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-3 text-xs text-cinema-muted font-body">
          <span className="flex items-center gap-1"><Clock size={12} /> {movie.duration}</span>
          <span className="flex items-center gap-1"><Calendar size={12} /> {movie.releaseYear}</span>
        </div>
        <div className="flex gap-1.5 mt-3 flex-wrap">
          {movie.genre.map(g => (
            <span key={g} className="text-[10px] bg-cinema-card text-cinema-muted px-2.5 py-1 rounded-full font-body border border-cinema-border">{g}</span>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mt-6 border-b border-cinema-border">
          {["about", "cast", "reviews"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-sm font-body font-medium capitalize transition-colors ${tab === activeTab ? "text-cinema-red border-b-2 border-cinema-red" : "text-cinema-muted"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "about" && (
          <motion.div className="mt-4" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
            <p className="text-sm text-cinema-muted font-body leading-relaxed">
              {expanded ? movie.description : movie.description.slice(0, 120) + "..."}
              <button onClick={() => setExpanded(!expanded)} className="text-cinema-red ml-1 text-xs font-medium">
                {expanded ? "Show Less" : "Read More"}
              </button>
            </p>
            <div className="mt-4 flex items-center gap-3">
              <span className="text-xs text-cinema-muted font-body">Director:</span>
              <span className="text-sm text-foreground font-body font-medium">{movie.director}</span>
            </div>
          </motion.div>
        )}

        {activeTab === "cast" && (
          <motion.div className="mt-4 flex gap-4 overflow-x-auto scrollbar-hide pb-2" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
            {movie.cast.map(c => (
              <div key={c.name} className="flex-shrink-0 text-center w-[80px]">
                <img src={c.avatar} alt={c.name} className="w-16 h-16 rounded-full object-cover mx-auto border-2 border-cinema-border" />
                <p className="text-xs text-foreground font-body font-medium mt-2 truncate">{c.name}</p>
                <p className="text-[10px] text-cinema-muted font-body truncate">{c.role}</p>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === "reviews" && (
          <motion.div className="mt-4 space-y-3" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
            {[
              { name: "Ravi K.", rating: 9, comment: "Absolutely spectacular! A visual feast.", date: "Mar 2024" },
              { name: "Priya S.", rating: 8, comment: "Great performances and stunning visuals.", date: "Feb 2024" },
              { name: "Arjun M.", rating: 7, comment: "Engaging story with some pacing issues.", date: "Jan 2024" },
            ].map((r, i) => (
              <div key={i} className="bg-cinema-card border border-cinema-border rounded-xl p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-cinema-red/20 flex items-center justify-center text-cinema-red text-xs font-bold">{r.name[0]}</div>
                    <span className="text-sm text-foreground font-body font-medium">{r.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star size={12} className="text-cinema-gold fill-cinema-gold" />
                    <span className="text-xs text-cinema-gold font-mono">{r.rating}/10</span>
                  </div>
                </div>
                <p className="text-xs text-cinema-muted font-body mt-2">{r.comment}</p>
                <p className="text-[10px] text-cinema-muted/60 font-mono mt-1">{r.date}</p>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-cinema-card/95 backdrop-blur-md border-t border-cinema-border p-4 lg:ml-60">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <div>
            <span className="text-xs text-cinema-muted font-body">From</span>
            <p className="text-lg text-foreground font-body font-bold">{movie.currency}{movie.price}</p>
          </div>
          <button onClick={handleBook} className="bg-cinema-red text-primary-foreground px-8 py-3 rounded-xl font-body font-bold text-sm hover:bg-cinema-red/90 transition-all shadow-cinema-glow active:scale-95">
            Book Tickets
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
