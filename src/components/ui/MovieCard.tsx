import { Movie } from "@/data/movies";
import { Star, Flame, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "@/context/FavoritesContext";
import { motion } from "framer-motion";

interface MovieCardProps {
  movie: Movie;
  rank?: number;
  size?: "normal" | "large";
}

const MovieCard = ({ movie, rank, size = "normal" }: MovieCardProps) => {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const w = size === "large" ? "w-[180px]" : "w-[150px]";
  const h = size === "large" ? "h-[270px]" : "h-[225px]";
  const fav = isFavorite(movie.id);

  return (
    <div className={`${w} flex-shrink-0 group relative`}>
      <button
        onClick={() => navigate(`/movie/${movie.id}`)}
        className="w-full text-left"
      >
        <div className={`${h} relative rounded-xl overflow-hidden shadow-card-lift transition-transform duration-200 group-hover:scale-[1.04] group-hover:shadow-cinema-glow`}>
          <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-card-gradient" />
          {movie.trending && (
            <div className="absolute top-2 right-2 bg-cinema-red/90 rounded-full p-1">
              <Flame size={12} className="text-primary-foreground" />
            </div>
          )}
          <div className="absolute top-2 left-2 bg-cinema-bg/80 text-[10px] font-mono px-2 py-0.5 rounded text-foreground">
            {movie.language}
          </div>
          {movie.comingSoon && (
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 bg-cinema-red text-primary-foreground text-xs font-body font-bold text-center py-1 rotate-[-3deg]">
              COMING SOON
            </div>
          )}
          {rank && (
            <div className="absolute bottom-2 left-2 font-display text-5xl text-foreground/20 leading-none">
              {rank}
            </div>
          )}
        </div>
      </button>

      {/* Heart / Favorite button */}
      <motion.button
        whileTap={{ scale: 1.3 }}
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(movie.id);
        }}
        className="absolute top-3 right-3 z-10 p-1.5 bg-cinema-bg/60 backdrop-blur-sm rounded-full transition-colors"
        style={{ display: movie.trending ? "none" : undefined }}
      >
        <Heart
          size={14}
          className={fav ? "text-cinema-red fill-cinema-red" : "text-foreground/70"}
        />
      </motion.button>

      <div className="mt-2 text-left">
        <p className="text-sm font-body font-semibold text-foreground truncate">{movie.title}</p>
        <div className="flex items-center gap-1 mt-0.5">
          {movie.rating && (
            <>
              <Star size={12} className="text-cinema-gold fill-cinema-gold" />
              <span className="text-xs text-cinema-gold font-mono">{movie.rating}</span>
              <span className="text-[10px] text-cinema-muted">({movie.votes})</span>
            </>
          )}
        </div>
        <div className="flex gap-1 mt-1 flex-wrap">
          {movie.genre.slice(0, 2).map(g => (
            <span key={g} className="text-[9px] bg-cinema-elevated text-cinema-muted px-1.5 py-0.5 rounded font-body">{g}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
