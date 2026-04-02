import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, MapPin } from "lucide-react";
import { movies } from "@/data/movies";
import { theaters } from "@/data/theaters";
import { showtimes } from "@/data/theaters";
import { useBooking } from "@/context/BookingContext";
import { useState, useMemo } from "react";
import TimeChip from "@/components/ui/TimeChip";

const TheaterSelectionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = movies.find(m => m.id === Number(id));
  const { setSelectedMovie, setSelectedTheater, setSelectedDate, setSelectedTime, setSelectedFormat } = useBooking();

  const dates = useMemo(() => {
    const d = [];
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      d.push({
        label: i === 0 ? "Today" : days[date.getDay()],
        date: date.getDate(),
        month: months[date.getMonth()],
        full: date.toISOString().split("T")[0],
      });
    }
    return d;
  }, []);

  const [selectedDate, setSelDate] = useState(dates[0].full);
  const [selectedTimeSlot, setSelTime] = useState("");
  const [selectedTheaterId, setSelTheater] = useState<number | null>(null);
  const [selFormat, setSelFormat] = useState("");

  if (!movie) return <div className="min-h-screen bg-cinema-bg flex items-center justify-center text-foreground">Movie not found</div>;

  const handleContinue = () => {
    if (!selectedTimeSlot || !selectedTheaterId) return;
    const theater = theaters.find(t => t.id === selectedTheaterId)!;
    setSelectedMovie(movie);
    setSelectedTheater(theater);
    setSelectedDate(selectedDate);
    setSelectedTime(selectedTimeSlot);
    setSelectedFormat(selFormat);
    navigate(`/movie/${movie.id}/seats`);
  };

  const peakTimes = ["18:30", "21:00"];

  return (
    <div className="min-h-screen bg-cinema-bg pb-24">
      <header className="sticky top-0 z-40 bg-cinema-bg/90 backdrop-blur-md border-b border-cinema-border">
        <div className="flex items-center gap-3 px-4 h-14">
          <button onClick={() => navigate(-1)}><ArrowLeft size={20} className="text-foreground" /></button>
          <div className="flex-1">
            <p className="text-sm font-body font-semibold text-foreground">Select Theater</p>
          </div>
        </div>
      </header>

      {/* Movie strip */}
      <div className="px-4 py-3 flex items-center gap-3 border-b border-cinema-border">
        <img src={movie.poster} alt={movie.title} className="w-12 h-16 rounded-lg object-cover" />
        <div>
          <p className="text-sm font-body font-semibold text-foreground">{movie.title}</p>
          <div className="flex gap-1.5 mt-1">
            {movie.formats.map(f => (
              <span key={f} className="text-[9px] bg-cinema-elevated text-cinema-muted px-2 py-0.5 rounded font-mono">{f}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Date picker */}
      <div className="px-4 py-3 flex gap-2 overflow-x-auto scrollbar-hide">
        {dates.map(d => (
          <button
            key={d.full}
            onClick={() => setSelDate(d.full)}
            className={`flex flex-col items-center min-w-[60px] px-3 py-2 rounded-xl transition-all ${d.full === selectedDate ? "bg-cinema-red text-foreground" : "bg-cinema-card text-cinema-muted border border-cinema-border"}`}
          >
            <span className="text-[10px] font-body font-medium">{d.label}</span>
            <span className="text-lg font-body font-bold">{d.date}</span>
            <span className="text-[10px] font-body">{d.month}</span>
          </button>
        ))}
      </div>

      {/* Theater list */}
      <div className="px-4 space-y-4 mt-2">
        {theaters.map(theater => (
          <div key={theater.id} className="bg-cinema-card border border-cinema-border rounded-xl p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-body font-semibold text-foreground">{theater.name}</h3>
                <div className="flex items-center gap-1 mt-1">
                  <MapPin size={11} className="text-cinema-muted" />
                  <span className="text-[11px] text-cinema-muted font-body">{theater.area}</span>
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
            <div className="flex gap-1 mt-2 flex-wrap">
              {theater.amenities.slice(0, 3).map(a => (
                <span key={a} className="text-[8px] bg-cinema-elevated text-cinema-muted px-1.5 py-0.5 rounded-full font-body">{a}</span>
              ))}
            </div>

            {/* Showtimes by format */}
            {movie.formats.includes("2D") && (
              <div className="mt-3">
                <p className="text-[10px] text-cinema-muted font-body font-medium mb-1.5">2D Regular</p>
                <div className="flex gap-2 flex-wrap">
                  {showtimes.regular2D.map(t => (
                    <TimeChip
                      key={t}
                      time={t}
                      selected={selectedTimeSlot === t && selectedTheaterId === theater.id && selFormat === "2D"}
                      filling={peakTimes.includes(t)}
                      onClick={() => { setSelTime(t); setSelTheater(theater.id); setSelFormat("2D"); }}
                    />
                  ))}
                </div>
              </div>
            )}
            {movie.formats.includes("IMAX") && theater.amenities.some(a => a.includes("IMAX")) && (
              <div className="mt-3">
                <p className="text-[10px] text-cinema-muted font-body font-medium mb-1.5">IMAX</p>
                <div className="flex gap-2 flex-wrap">
                  {showtimes.imax.map(t => (
                    <TimeChip
                      key={t}
                      time={t}
                      selected={selectedTimeSlot === t && selectedTheaterId === theater.id && selFormat === "IMAX"}
                      filling={peakTimes.includes(t)}
                      onClick={() => { setSelTime(t); setSelTheater(theater.id); setSelFormat("IMAX"); }}
                    />
                  ))}
                </div>
              </div>
            )}
            {movie.formats.includes("3D") && (
              <div className="mt-3">
                <p className="text-[10px] text-cinema-muted font-body font-medium mb-1.5">3D Premium</p>
                <div className="flex gap-2 flex-wrap">
                  {showtimes.premium3D.map(t => (
                    <TimeChip
                      key={t}
                      time={t}
                      selected={selectedTimeSlot === t && selectedTheaterId === theater.id && selFormat === "3D"}
                      filling={peakTimes.includes(t)}
                      onClick={() => { setSelTime(t); setSelTheater(theater.id); setSelFormat("3D"); }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      {selectedTimeSlot && selectedTheaterId && (
        <div className="fixed bottom-0 left-0 right-0 bg-cinema-card/95 backdrop-blur-md border-t border-cinema-border p-4 lg:ml-60" style={{ animation: "slide-up 0.3s ease-out" }}>
          <button onClick={handleContinue} className="w-full bg-cinema-red text-foreground py-3 rounded-xl font-body font-bold text-sm hover:bg-cinema-red/90 transition-colors shadow-cinema-glow">
            Select Seats →
          </button>
        </div>
      )}
    </div>
  );
};

export default TheaterSelectionPage;
