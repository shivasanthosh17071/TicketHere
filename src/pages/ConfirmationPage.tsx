import { useNavigate } from "react-router-dom";
import { useBooking } from "@/context/BookingContext";
import { Check, Download, Home } from "lucide-react";
import { useEffect, useState } from "react";

const ConfirmationPage = () => {
  const navigate = useNavigate();
  const { selectedMovie, selectedTheater, selectedDate, selectedTime, selectedFormat, selectedSeats, getTotal, resetBooking } = useBooking();
  const [showConfetti, setShowConfetti] = useState(true);

  const bookingId = `TKHR${Date.now().toString().slice(-10)}`;

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  if (!selectedMovie || !selectedTheater) {
    navigate("/home");
    return null;
  }

  const handleGoHome = () => {
    resetBooking();
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-cinema-bg flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                backgroundColor: i % 2 === 0 ? "hsl(var(--cinema-red))" : "hsl(var(--cinema-gold))",
                animation: `confetti-fall ${2 + Math.random() * 2}s linear ${Math.random() * 0.5}s forwards`,
                top: "-10px",
              }}
            />
          ))}
        </div>
      )}

      {/* Checkmark */}
      <div className="w-20 h-20 rounded-full border-4 border-cinema-success flex items-center justify-center mb-6" style={{ animation: "fade-in-up 0.5s ease-out" }}>
        <Check size={40} className="text-cinema-success" />
      </div>

      <h1 className="font-display text-4xl md:text-5xl text-foreground tracking-wider mb-2">BOOKING CONFIRMED!</h1>

      {/* Ticket Card */}
      <div className="w-full max-w-sm mt-6" style={{ animation: "fade-in-up 0.5s ease-out 0.2s forwards", opacity: 0 }}>
        <div className="ticket-edge bg-cinema-card" />

        <div className="bg-cinema-card px-5 py-4">
          <div className="flex gap-3">
            <img src={selectedMovie.poster} alt={selectedMovie.title} className="w-16 h-24 rounded-lg object-cover flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <h3 className="font-body font-bold text-foreground text-sm">{selectedMovie.title}</h3>
              <p className="text-[10px] text-cinema-muted font-body mt-1">{selectedDate} • {selectedTime} • {selectedFormat}</p>
              <p className="text-[10px] text-cinema-muted font-body">{selectedTheater.name}</p>
              <p className="text-[10px] text-cinema-muted font-body">Seats: {selectedSeats.join(", ")}</p>
            </div>
          </div>

          <div className="border-t border-dashed border-cinema-border mt-4 pt-3">
            <p className="text-[10px] text-cinema-muted font-body">Booking ID</p>
            <p className="text-sm text-foreground font-mono font-bold">{bookingId}</p>
          </div>

          <div className="flex items-center gap-2 mt-2 text-[9px] text-cinema-muted font-mono">
            <span>{selectedMovie.language}</span>
            <span>•</span>
            <span>{selectedFormat}</span>
            <span>•</span>
            <span>{selectedMovie.certificate}</span>
          </div>

          {/* QR Code placeholder */}
          <div className="flex justify-center mt-4">
            <div className="w-24 h-24 bg-cinema-elevated rounded-lg grid grid-cols-6 grid-rows-6 gap-0.5 p-2">
              {Array.from({ length: 36 }).map((_, i) => (
                <div key={i} className={`rounded-[1px] ${Math.random() > 0.4 ? "bg-foreground" : "bg-cinema-elevated"}`} />
              ))}
            </div>
          </div>
          <p className="text-[8px] text-cinema-muted font-mono text-center mt-1">{bookingId}</p>
        </div>

        <div className="ticket-edge bg-cinema-card" />
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-8 w-full max-w-sm" style={{ animation: "fade-in-up 0.5s ease-out 0.4s forwards", opacity: 0 }}>
        <button className="flex-1 flex items-center justify-center gap-2 bg-cinema-card border border-cinema-border text-foreground py-3 rounded-xl font-body font-medium text-sm hover:border-cinema-red/50 transition-colors">
          <Download size={16} /> Download
        </button>
        <button
          onClick={handleGoHome}
          className="flex-1 flex items-center justify-center gap-2 bg-cinema-red text-primary-foreground py-3 rounded-xl font-body font-bold text-sm hover:bg-cinema-red/90 transition-colors shadow-cinema-glow"
        >
          <Home size={16} /> Go Home
        </button>
      </div>
    </div>
  );
};

export default ConfirmationPage;
