import { Star } from "lucide-react";

const StarRating = ({ rating, size = 14 }: { rating: number; size?: number }) => {
  const stars = Math.round(rating / 2);
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} size={size} className={i <= stars ? "text-cinema-gold fill-cinema-gold" : "text-cinema-muted"} />
      ))}
      <span className="text-cinema-gold font-mono text-xs ml-1">{rating}</span>
    </div>
  );
};

export default StarRating;
