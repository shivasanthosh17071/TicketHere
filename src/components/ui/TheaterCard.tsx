import { Theater } from "@/data/theaters";
import { MapPin, Star, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TheaterCard = ({ theater, movieId }: { theater: Theater; movieId?: number }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-cinema-card border border-cinema-border rounded-xl p-4 transition-all hover:border-cinema-red/30">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-body font-semibold text-foreground text-sm">{theater.name}</h3>
          <div className="flex items-center gap-1 mt-1">
            <MapPin size={12} className="text-cinema-muted" />
            <span className="text-xs text-cinema-muted font-body">{theater.area}</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-[10px] bg-cinema-elevated text-cinema-muted px-2 py-0.5 rounded-full font-mono">{theater.distance}</span>
          <div className="flex items-center gap-0.5">
            <Star size={10} className="text-cinema-gold fill-cinema-gold" />
            <span className="text-[10px] text-cinema-gold font-mono">{theater.rating}</span>
          </div>
        </div>
      </div>
      <div className="flex gap-1.5 mt-2 flex-wrap">
        {theater.amenities.slice(0, 4).map(a => (
          <span key={a} className="text-[9px] bg-cinema-elevated text-cinema-muted px-2 py-0.5 rounded-full font-body">{a}</span>
        ))}
      </div>
      {movieId && (
        <button
          onClick={() => navigate(`/movie/${movieId}/theaters`)}
          className="mt-3 w-full flex items-center justify-center gap-1 bg-cinema-red/10 text-cinema-red py-2 rounded-lg text-sm font-body font-medium hover:bg-cinema-red/20 transition-colors"
        >
          Book Now <ChevronRight size={14} />
        </button>
      )}
    </div>
  );
};

export default TheaterCard;
