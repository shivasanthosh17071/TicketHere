import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Building2, Armchair } from "lucide-react";
import { useBooking } from "@/context/BookingContext";
import AddOnCard from "@/components/ui/AddOnCard";
import { useState } from "react";
import { motion } from "framer-motion";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { selectedMovie, selectedTheater, selectedDate, selectedTime, selectedFormat, selectedSeats, addOns, toggleAddOn, getSubtotal, getAddOnsTotal, getTotal, bookingFee, convenienceFee } = useBooking();
  const [paymentMethod, setPaymentMethod] = useState("upi");

  if (!selectedMovie || !selectedTheater) {
    navigate("/home");
    return null;
  }

  return (
    <div className="min-h-screen bg-cinema-bg pb-28">
      <header className="sticky top-0 z-40 bg-cinema-bg/90 backdrop-blur-md border-b border-cinema-border">
        <div className="flex items-center gap-3 px-4 h-14">
          <button onClick={() => navigate(-1)}><ArrowLeft size={20} className="text-foreground" /></button>
          <p className="text-sm font-body font-semibold text-foreground">Checkout</p>
        </div>
      </header>

      <div className="px-4 mt-4 max-w-lg mx-auto space-y-4">
        {/* Booking Summary */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-cinema-card border border-cinema-border rounded-xl p-4"
        >
          <div className="flex gap-3">
            <img src={selectedMovie.poster} alt={selectedMovie.title} className="w-20 h-28 rounded-lg object-cover flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <h3 className="font-body font-bold text-foreground text-sm">{selectedMovie.title}</h3>
              <div className="flex gap-1.5 mt-1">
                <span className="text-[9px] bg-cinema-elevated text-cinema-muted px-1.5 py-0.5 rounded font-mono">{selectedMovie.language}</span>
                <span className="text-[9px] bg-cinema-elevated text-cinema-muted px-1.5 py-0.5 rounded font-mono">{selectedFormat}</span>
                <span className="text-[9px] bg-cinema-elevated text-cinema-muted px-1.5 py-0.5 rounded font-mono">{selectedMovie.certificate}</span>
              </div>
              <div className="mt-2 space-y-1 text-xs text-cinema-muted font-body">
                <div className="flex items-center gap-1"><Calendar size={11} /> {selectedDate}</div>
                <div className="flex items-center gap-1"><Clock size={11} /> {selectedTime}</div>
                <div className="flex items-center gap-1"><Building2 size={11} /> {selectedTheater.name}</div>
                <div className="flex items-center gap-1"><Armchair size={11} /> {selectedSeats.join(", ")}</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Order Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-cinema-card border border-cinema-border rounded-xl p-4"
        >
          <h3 className="font-body font-semibold text-foreground text-sm mb-3">Order Summary</h3>
          <div className="space-y-2 text-xs font-body">
            <div className="flex justify-between text-cinema-muted">
              <span>Tickets ({selectedSeats.length})</span>
              <span>₹{getSubtotal()}</span>
            </div>
            <div className="flex justify-between text-cinema-muted">
              <span>Booking fee</span>
              <span>₹{bookingFee}</span>
            </div>
            <div className="flex justify-between text-cinema-muted">
              <span>Convenience fee</span>
              <span>₹{convenienceFee}</span>
            </div>
            {getAddOnsTotal() > 0 && (
              <div className="flex justify-between text-cinema-muted">
                <span>Add-ons</span>
                <span>₹{getAddOnsTotal()}</span>
              </div>
            )}
            <motion.div
              key={getTotal()}
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="flex justify-between text-foreground font-bold text-base pt-2 border-t border-cinema-border"
            >
              <span>Total</span>
              <span>₹{getTotal()}</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Add-ons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="font-body font-semibold text-foreground text-sm mb-3">Add-Ons</h3>
          <div className="space-y-2">
            {addOns.map((a, i) => (
              <motion.div
                key={a.id}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + i * 0.05 }}
              >
                <AddOnCard emoji={a.emoji} name={a.name} price={a.price} added={a.added} onToggle={() => toggleAddOn(a.id)} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Payment */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <h3 className="font-body font-semibold text-foreground text-sm mb-3">Payment Method</h3>
          <div className="flex gap-2 mb-3">
            {["upi", "cards", "netbanking", "wallets"].map(m => (
              <motion.button
                key={m}
                whileTap={{ scale: 0.93 }}
                onClick={() => setPaymentMethod(m)}
                className={`px-3 py-1.5 rounded-lg text-xs font-body capitalize transition-all ${m === paymentMethod ? "bg-cinema-red text-primary-foreground" : "bg-cinema-elevated text-cinema-muted border border-cinema-border"}`}
              >
                {m}
              </motion.button>
            ))}
          </div>
          {paymentMethod === "upi" && (
            <div className="bg-cinema-card border border-cinema-border rounded-xl p-3">
              <input
                type="text"
                placeholder="Enter UPI ID (e.g. name@upi)"
                className="w-full bg-cinema-elevated border border-cinema-border rounded-lg px-3 py-2.5 text-sm font-body text-foreground placeholder:text-cinema-muted focus:outline-none focus:border-cinema-red/50"
              />
            </div>
          )}
          {paymentMethod === "wallets" && (
            <div className="flex gap-2 flex-wrap">
              {["PhonePe", "Google Pay", "Paytm"].map(w => (
                <motion.button key={w} whileTap={{ scale: 0.95 }} className="px-4 py-2 bg-cinema-card border border-cinema-border rounded-xl text-xs font-body text-cinema-muted hover:border-cinema-red/50 hover:text-foreground transition-colors">
                  {w}
                </motion.button>
              ))}
            </div>
          )}
          {paymentMethod === "cards" && (
            <div className="bg-cinema-card border border-cinema-border rounded-xl p-3">
              <input
                type="text"
                placeholder="Card Number"
                className="w-full bg-cinema-elevated border border-cinema-border rounded-lg px-3 py-2.5 text-sm font-body text-foreground placeholder:text-cinema-muted focus:outline-none focus:border-cinema-red/50"
              />
            </div>
          )}
        </motion.div>
      </div>

      {/* Pay CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-cinema-card/95 backdrop-blur-md border-t border-cinema-border p-4 lg:ml-60">
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => navigate("/confirmation")}
          className="w-full max-w-lg mx-auto block bg-cinema-red text-primary-foreground py-3.5 rounded-xl font-body font-bold text-sm hover:bg-cinema-red/90 transition-colors shadow-cinema-glow"
        >
          Pay ₹{getTotal()}
        </motion.button>
      </div>
    </div>
  );
};

export default CheckoutPage;
