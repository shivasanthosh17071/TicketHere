import { Film, Ticket, Star, Award, MapPin, ChevronRight, Settings, LogOut, Bookmark, Heart, Sun, Moon } from "lucide-react";
import TopNav from "@/components/layout/TopNav";
import BottomNav from "@/components/layout/BottomNav";
import Sidebar from "@/components/layout/Sidebar";
import { useBooking } from "@/context/BookingContext";
import { useTheme } from "@/context/ThemeContext";
import { useFavorites } from "@/context/FavoritesContext";
import { movies } from "@/data/movies";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { icon: Bookmark, label: "Saved Movies" },
  { icon: Star, label: "My Reviews" },
  { icon: Settings, label: "Notification Settings" },
  { icon: Settings, label: "Language Preference" },
  { icon: Settings, label: "Help & Support" },
  { icon: Film, label: "About Ticket Here" },
];

const ProfilePage = () => {
  const { city } = useBooking();
  const { theme, toggleTheme } = useTheme();
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const navigate = useNavigate();

  const favoriteMovies = movies.filter(m => isFavorite(m.id));

  return (
    <div className="min-h-screen bg-cinema-bg">
      <TopNav />
      <Sidebar />
      <main className="lg:ml-60 pb-20 lg:pb-8">
        <div className="px-4 pt-6">
          {/* Avatar */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-cinema-red flex items-center justify-center text-primary-foreground font-display text-3xl">
              RK
            </div>
            <h2 className="font-body font-bold text-foreground text-lg mt-3">Raj Kumar</h2>
            <p className="text-xs text-cinema-muted font-body">raj.kumar@email.com</p>
            <div className="flex items-center gap-1 mt-1">
              <MapPin size={12} className="text-cinema-red" />
              <span className="text-xs text-cinema-muted font-body">{city}</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            {[
              { icon: Film, label: "Movies", value: "12" },
              { icon: Ticket, label: "Tickets", value: "19" },
              { icon: Award, label: "Points", value: "840" },
            ].map(s => (
              <div key={s.label} className="bg-cinema-card border border-cinema-border rounded-xl p-3 text-center">
                <s.icon size={20} className="text-cinema-red mx-auto" />
                <p className="text-lg font-body font-bold text-foreground mt-1">{s.value}</p>
                <p className="text-[10px] text-cinema-muted font-body">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Favorites / Wishlist */}
          {favoriteMovies.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-body font-semibold text-foreground mb-3 flex items-center gap-2">
                <Heart size={14} className="text-cinema-red" />
                My Wishlist ({favoriteMovies.length})
              </h3>
              <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
                {favoriteMovies.map(m => (
                  <button
                    key={m.id}
                    onClick={() => navigate(`/movie/${m.id}`)}
                    className="flex-shrink-0 w-[100px] group"
                  >
                    <div className="h-[150px] rounded-lg overflow-hidden relative">
                      <img src={m.poster} alt={m.title} className="w-full h-full object-cover" />
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleFavorite(m.id); }}
                        className="absolute top-1 right-1 p-1 bg-cinema-bg/60 rounded-full"
                      >
                        <Heart size={12} className="text-cinema-red fill-cinema-red" />
                      </button>
                    </div>
                    <p className="text-[10px] font-body text-foreground mt-1 truncate">{m.title}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Preferences */}
          <div className="mt-6">
            <h3 className="text-sm font-body font-semibold text-foreground mb-3">Preferences</h3>
            <div className="bg-cinema-card border border-cinema-border rounded-xl p-3">
              <div className="mb-2">
                <p className="text-[10px] text-cinema-muted font-body mb-1">Favorite Genres</p>
                <div className="flex gap-1.5 flex-wrap">
                  {["Telugu Action", "Sci-Fi", "Thriller"].map(g => (
                    <span key={g} className="text-[10px] bg-cinema-red/10 text-cinema-red px-2 py-0.5 rounded-full font-body">{g}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] text-cinema-muted font-body mb-1">Preferred Formats</p>
                <div className="flex gap-1.5">
                  {["IMAX", "3D"].map(f => (
                    <span key={f} className="text-[10px] bg-cinema-gold/10 text-cinema-gold px-2 py-0.5 rounded-full font-body">{f}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Menu */}
          <div className="mt-6 space-y-1">
            {menuItems.map(item => (
              <button key={item.label} className="w-full flex items-center justify-between bg-cinema-card border border-cinema-border rounded-xl px-4 py-3 hover:border-cinema-red/30 transition-colors">
                <div className="flex items-center gap-3">
                  <item.icon size={16} className="text-cinema-muted" />
                  <span className="text-sm font-body text-foreground">{item.label}</span>
                </div>
                <ChevronRight size={16} className="text-cinema-muted" />
              </button>
            ))}

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="w-full flex items-center justify-between bg-cinema-card border border-cinema-border rounded-xl px-4 py-3 hover:border-cinema-red/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                {theme === "dark" ? <Sun size={16} className="text-cinema-gold" /> : <Moon size={16} className="text-cinema-muted" />}
                <span className="text-sm font-body text-foreground">{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
              </div>
              <div className={`w-10 h-5 rounded-full relative transition-colors ${theme === "dark" ? "bg-cinema-elevated" : "bg-cinema-red"}`}>
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-foreground transition-transform ${theme === "light" ? "translate-x-5" : "translate-x-0.5"}`} />
              </div>
            </button>

            {/* Sign out */}
            <button className="w-full flex items-center gap-3 bg-cinema-card border border-cinema-red/20 rounded-xl px-4 py-3 hover:border-cinema-red/50 transition-colors mt-2">
              <LogOut size={16} className="text-cinema-red" />
              <span className="text-sm font-body text-cinema-red">Sign Out</span>
            </button>
          </div>

          {/* Dev credit */}
          <div className="mt-8 pb-4 text-center">
            <p className="text-[10px] font-mono text-cinema-muted">
              App developed by <span className="text-cinema-red font-semibold">Santhosh</span>
            </p>
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  );
};

export default ProfilePage;
