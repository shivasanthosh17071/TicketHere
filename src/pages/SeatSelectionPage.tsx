import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useBooking } from "@/context/BookingContext";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";

type SeatStatus = "available" | "selected" | "reserved";

const SeatSelectionPage = () => {
  const navigate = useNavigate();
  const { selectedMovie, selectedTheater, selectedDate, selectedTime, selectedFormat, selectedSeats, setSelectedSeats, getSeatPrice, getSubtotal } = useBooking();

  const rows = "ABCDEFGHIJKL".split("");
  const cols = 10;

  const reservedSeats = useMemo(() => {
    const reserved = new Set<string>();
    ["A-2", "A-5", "B-3", "B-7", "C-1", "C-8", "D-5", "E-3", "E-9", "F-2", "F-6", "G-4", "G-10", "H-1", "H-5", "H-8", "I-3", "I-7", "J-2", "J-6", "K-4", "K-9", "L-1", "L-10"].forEach(s => reserved.add(s));
    return reserved;
  }, []);

  const getSeatStatus = (seatId: string): SeatStatus => {
    if (reservedSeats.has(seatId)) return "reserved";
    if (selectedSeats.includes(seatId)) return "selected";
    return "available";
  };

  const toggleSeat = (seatId: string) => {
    if (reservedSeats.has(seatId)) return;
    setSelectedSeats(
      selectedSeats.includes(seatId)
        ? selectedSeats.filter(s => s !== seatId)
        : [...selectedSeats, seatId]
    );
  };

  const getCategoryLabel = (row: string) => {
    if (row <= "C") return { label: "PREMIUM", price: 250 };
    if (row <= "G") return { label: "EXECUTIVE", price: 200 };
    return { label: "NORMAL", price: 150 };
  };

  if (!selectedMovie || !selectedTheater) {
    navigate("/home");
    return null;
  }

  return (
    <div className="min-h-screen bg-cinema-bg pb-48">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-cinema-bg/90 backdrop-blur-md border-b border-cinema-border">
        <div className="flex items-center gap-3 px-4 h-14">
          <button onClick={() => navigate(-1)}><ArrowLeft size={20} className="text-foreground" /></button>
          <div>
            <p className="text-sm font-body font-semibold text-foreground">{selectedMovie.title}</p>
            <p className="text-[10px] text-cinema-muted font-body">{selectedTheater.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-4 pb-2 text-[10px] text-cinema-muted font-mono">
          <span>{selectedDate}</span>
          <span>•</span>
          <span>{selectedTime}</span>
          <span>•</span>
          <span>{selectedFormat}</span>
        </div>
      </header>

      {/* Screen */}
      <div className="flex flex-col items-center mt-6 mb-4 px-4">
        <svg viewBox="0 0 300 40" className="w-full max-w-sm">
          <path d="M 20 35 Q 150 0 280 35" fill="none" stroke="rgba(229,25,58,0.3)" strokeWidth="2" />
          <text x="150" y="28" textAnchor="middle" className="fill-cinema-muted text-[10px] font-mono">SCREEN</text>
        </svg>
        <div className="w-full max-w-sm h-8 bg-gradient-to-b from-cinema-red/5 to-transparent rounded-b-full" />
      </div>

      {/* Seat Grid */}
      <div className="px-2 overflow-x-auto scrollbar-hide">
        <div className="min-w-[360px] max-w-md mx-auto">
          {rows.map((row, ri) => {
            const cat = getCategoryLabel(row);
            const showLabel = row === "A" || row === "D" || row === "H";
            return (
              <div key={row}>
                {showLabel && (
                  <div className="flex items-center justify-between px-2 mt-3 mb-1">
                    <span className="text-[9px] text-cinema-muted font-mono">{cat.label}</span>
                    <span className="text-[9px] text-cinema-gold font-mono">₹{cat.price}</span>
                  </div>
                )}
                <div className="flex items-center gap-0.5 mb-0.5">
                  <span className="w-5 text-[9px] text-cinema-muted font-mono text-center">{row}</span>
                  <div className="flex-1 flex justify-center gap-0.5">
                    {Array.from({ length: cols }, (_, c) => {
                      const col = c + 1;
                      const seatId = `${row}-${col}`;
                      const status = getSeatStatus(seatId);
                      const isAisle = col === 4 || col === 7;
                      return (
                        <div key={col} className={`flex items-center ${isAisle ? "mr-2" : ""}`}>
                          <motion.button
                            onClick={() => toggleSeat(seatId)}
                            disabled={status === "reserved"}
                            whileTap={status !== "reserved" ? { scale: 0.75 } : undefined}
                            animate={status === "selected" ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                            transition={{ duration: 0.2 }}
                            className={`w-7 h-7 rounded-sm text-[9px] font-mono transition-colors duration-150 ${
                              status === "selected"
                                ? "bg-cinema-red text-primary-foreground shadow-cinema-glow"
                                : status === "reserved"
                                ? "bg-cinema-elevated/50 text-cinema-muted/30 cursor-not-allowed"
                                : "bg-cinema-elevated border border-cinema-border text-cinema-muted hover:border-cinema-red/50 hover:text-foreground"
                            }`}
                          >
                            {col}
                          </motion.button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4 px-4">
        {[
          { color: "bg-cinema-elevated border border-cinema-border", label: "Available" },
          { color: "bg-cinema-red shadow-cinema-glow", label: "Selected" },
          { color: "bg-cinema-elevated/50", label: "Reserved" },
        ].map(l => (
          <div key={l.label} className="flex items-center gap-1.5">
            <div className={`w-4 h-4 rounded-sm ${l.color}`} />
            <span className="text-[10px] text-cinema-muted font-body">{l.label}</span>
          </div>
        ))}
      </div>

      {/* Selected seats panel */}
      {selectedSeats.length > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 bg-cinema-card/95 backdrop-blur-md border-t border-cinema-border p-4 lg:ml-60"
        >
          <div className="max-w-2xl mx-auto">
            <div className="flex gap-2 flex-wrap mb-2">
              {selectedSeats.map(s => (
                <motion.span
                  key={s}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="flex items-center gap-1 bg-cinema-red/20 text-cinema-red text-xs font-mono px-2 py-1 rounded"
                >
                  {s}
                  <button onClick={() => toggleSeat(s)} className="text-cinema-red/60 hover:text-cinema-red">×</button>
                </motion.span>
              ))}
            </div>
            <div className="text-xs text-cinema-muted font-body space-y-0.5">
              {(() => {
                const cats: Record<string, { count: number; price: number }> = {};
                selectedSeats.forEach(s => {
                  const cat = getCategoryLabel(s.charAt(0));
                  if (!cats[cat.label]) cats[cat.label] = { count: 0, price: cat.price };
                  cats[cat.label].count++;
                });
                return Object.entries(cats).map(([label, { count, price }]) => (
                  <div key={label} className="flex justify-between">
                    <span>{count} × {label} ₹{price}</span>
                    <span>₹{count * price}</span>
                  </div>
                ));
              })()}
              <div className="flex justify-between">
                <span>Booking fee</span>
                <span>₹30</span>
              </div>
              <div className="flex justify-between text-foreground font-bold text-sm pt-1 border-t border-cinema-border mt-1">
                <span>Total</span>
                <span>₹{getSubtotal() + 30}</span>
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/checkout")}
              className="w-full mt-3 bg-cinema-red text-primary-foreground py-3 rounded-xl font-body font-bold text-sm hover:bg-cinema-red/90 transition-colors shadow-cinema-glow flex items-center justify-center gap-2"
            >
              <span>Total ₹{getSubtotal() + 30}</span>
              <span>•</span>
              <span>Continue →</span>
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SeatSelectionPage;
