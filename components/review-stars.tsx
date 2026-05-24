import { Star } from "lucide-react";

export function ReviewStars({ rating, count }: { rating: number; count?: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
      <div className="flex text-gold">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className="h-3.5 w-3.5"
            fill={index < Math.round(rating) ? "currentColor" : "none"}
          />
        ))}
      </div>
      {count !== undefined && <span className="text-xs text-muted">({count})</span>}
    </div>
  );
}
