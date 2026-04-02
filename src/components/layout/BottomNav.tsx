import { Home, Search, Ticket, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const tabs = [
  { icon: Home, label: "Home", path: "/home" },
  { icon: Search, label: "Search", path: "/search" },
  { icon: Ticket, label: "Tickets", path: "/tickets" },
  { icon: User, label: "Profile", path: "/profile" },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Hide on booking flow pages
  const hideOn = ["/splash", "/checkout", "/confirmation"];
  if (hideOn.some(p => location.pathname.startsWith(p)) || location.pathname.includes("/seats") || location.pathname.includes("/theaters")) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-cinema-card border-t border-cinema-border lg:hidden">
      <div className="flex items-center justify-around h-16">
        {tabs.map(({ icon: Icon, label, path }) => {
          const active = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex flex-col items-center gap-1 min-w-[60px] py-2 transition-colors ${active ? "text-cinema-red" : "text-cinema-muted"}`}
            >
              <Icon size={22} />
              <span className="text-[10px] font-body font-medium">{label}</span>
              {active && <div className="w-4 h-0.5 bg-cinema-red rounded-full" />}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
