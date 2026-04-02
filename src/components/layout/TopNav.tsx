import { MapPin, Bell, Film, ChevronDown, Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "@/context/BookingContext";
import { useTheme } from "@/context/ThemeContext";
import { useState } from "react";

const cities = ["Hyderabad", "Chennai", "Bengaluru", "Mumbai", "Delhi"];

const TopNav = () => {
  const navigate = useNavigate();
  const { city, setCity } = useBooking();
  const { theme, toggleTheme } = useTheme();
  const [showCities, setShowCities] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-cinema-bg/90 backdrop-blur-md border-b border-cinema-border lg:hidden">
      <div className="flex items-center justify-between px-4 h-14">
        <button onClick={() => setShowCities(!showCities)} className="flex items-center gap-1 text-sm font-body">
          <MapPin size={16} className="text-cinema-red" />
          <span className="text-foreground font-medium">{city}</span>
          <ChevronDown size={14} className="text-cinema-muted" />
        </button>
        <button onClick={() => navigate("/home")} className="flex items-center gap-1">
          <Film size={20} className="text-cinema-red" />
          <span className="font-display text-lg tracking-wider text-foreground">TICKET HERE</span>
        </button>
        <div className="flex items-center gap-1">
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-cinema-elevated transition-colors">
            {theme === "dark" ? <Sun size={18} className="text-cinema-gold" /> : <Moon size={18} className="text-cinema-muted" />}
          </button>
          <button className="relative p-2" onClick={() => (window as any).__notificationToggle?.()}>
            <Bell size={20} className="text-foreground" />
            <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-cinema-red rounded-full animate-pulse" />
          </button>
        </div>
      </div>
      {showCities && (
        <div className="absolute top-14 left-0 right-0 bg-cinema-card border-b border-cinema-border p-3 flex gap-2 flex-wrap animate-fade-in-up">
          {cities.map(c => (
            <button
              key={c}
              onClick={() => { setCity(c); setShowCities(false); }}
              className={`px-4 py-2 rounded-full text-sm font-body transition-all ${c === city ? "bg-cinema-red text-primary-foreground" : "bg-cinema-elevated text-cinema-muted hover:text-foreground"}`}
            >
              {c}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

export default TopNav;
