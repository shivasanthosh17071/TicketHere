import { Home, Search, Ticket, User, Film, Sun, Moon } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";

const links = [
  { icon: Home, label: "Home", path: "/home" },
  { icon: Search, label: "Search", path: "/search" },
  { icon: Ticket, label: "My Tickets", path: "/tickets" },
  { icon: User, label: "Profile", path: "/profile" },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <aside className="hidden lg:flex flex-col w-60 h-screen fixed left-0 top-0 bg-cinema-card border-r border-cinema-border z-40">
      <div className="flex items-center gap-2 px-6 py-6 cursor-pointer" onClick={() => navigate("/home")}>
        <Film size={28} className="text-cinema-red" />
        <span className="font-display text-2xl text-foreground tracking-wider">TICKET HERE</span>
      </div>
      <nav className="flex-1 flex flex-col gap-1 px-3 mt-4">
        {links.map(({ icon: Icon, label, path }) => {
          const active = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-body font-medium transition-all ${active ? "bg-cinema-red/10 text-cinema-red" : "text-cinema-muted hover:text-foreground hover:bg-cinema-elevated"}`}
            >
              <Icon size={20} />
              {label}
            </button>
          );
        })}
      </nav>
      <div className="px-3 pb-2">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-body font-medium text-cinema-muted hover:text-foreground hover:bg-cinema-elevated transition-all w-full"
        >
          {theme === "dark" ? <Sun size={20} className="text-cinema-gold" /> : <Moon size={20} />}
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
      <div className="px-6 py-4 text-[10px] text-cinema-muted font-mono space-y-0.5">
        <p>© 2024 Ticket Here</p>
        <p>Developed by <span className="text-cinema-red">Santhosh</span></p>
      </div>
    </aside>
  );
};

export default Sidebar;
