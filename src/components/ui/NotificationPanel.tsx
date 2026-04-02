import { useState, useEffect } from "react";
import { Bell, X, Film, Ticket, Gift, Star, Clock } from "lucide-react";

interface Notification {
  id: number;
  icon: typeof Film;
  title: string;
  message: string;
  time: string;
  read: boolean;
  color: string;
}

const mockNotifications: Notification[] = [
  {
    id: 1,
    icon: Film,
    title: "New Release!",
    message: "Kalki 2898 AD is now showing in IMAX near you.",
    time: "2 min ago",
    read: false,
    color: "text-cinema-red",
  },
  {
    id: 2,
    icon: Gift,
    title: "Special Offer",
    message: "Get 20% off on your next booking. Use code TICKET20.",
    time: "1 hr ago",
    read: false,
    color: "text-cinema-gold",
  },
  {
    id: 3,
    icon: Ticket,
    title: "Booking Reminder",
    message: "Your show for Pushpa 2 starts in 3 hours!",
    time: "3 hrs ago",
    read: false,
    color: "text-cinema-success",
  },
  {
    id: 4,
    icon: Star,
    title: "Rate Your Experience",
    message: "How was Baahubali 2 at PVR Inorbit Mall?",
    time: "1 day ago",
    read: true,
    color: "text-cinema-gold",
  },
  {
    id: 5,
    icon: Clock,
    title: "Coming Soon",
    message: "Ramayana (2025) advance booking opens tomorrow!",
    time: "2 days ago",
    read: true,
    color: "text-cinema-muted",
  },
];

const NotificationPanel = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [animatingId, setAnimatingId] = useState<number | null>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const dismiss = (id: number) => {
    setAnimatingId(id);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
      setAnimatingId(null);
    }, 300);
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Close on escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      {/* Bell trigger - positioned in TopNav via portal-like approach */}
      {/* The actual bell is in TopNav, this panel is triggered globally */}

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] animate-fade-in"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-[380px] bg-cinema-card border-l border-cinema-border z-[70] transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-cinema-border">
          <div className="flex items-center gap-2">
            <Bell size={20} className="text-cinema-red" />
            <h2 className="font-display text-xl text-foreground tracking-wide">NOTIFICATIONS</h2>
            {unreadCount > 0 && (
              <span className="bg-cinema-red text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full animate-scale-in">
                {unreadCount}
              </span>
            )}
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-2 rounded-full hover:bg-cinema-elevated transition-colors"
          >
            <X size={18} className="text-cinema-muted" />
          </button>
        </div>

        {/* Mark all read */}
        {unreadCount > 0 && (
          <div className="px-5 py-2 border-b border-cinema-border">
            <button
              onClick={markAllRead}
              className="text-xs font-body text-cinema-red hover:underline transition-all"
            >
              Mark all as read
            </button>
          </div>
        )}

        {/* Notification List */}
        <div className="overflow-y-auto h-[calc(100%-120px)] scrollbar-hide">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 px-6">
              <Bell size={48} className="text-cinema-muted/30" />
              <p className="text-cinema-muted text-sm font-body text-center">No notifications yet</p>
            </div>
          ) : (
            <div className="py-2">
              {notifications.map((n, index) => {
                const Icon = n.icon;
                return (
                  <div
                    key={n.id}
                    onClick={() => markAsRead(n.id)}
                    className={`relative px-5 py-4 flex gap-3 cursor-pointer transition-all duration-300 hover:bg-cinema-elevated/50 ${
                      animatingId === n.id
                        ? "opacity-0 translate-x-full"
                        : "opacity-100 translate-x-0"
                    } ${!n.read ? "bg-cinema-elevated/30" : ""}`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Unread dot */}
                    {!n.read && (
                      <div className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-cinema-red rounded-full animate-pulse" />
                    )}

                    {/* Icon */}
                    <div className={`shrink-0 w-10 h-10 rounded-full bg-cinema-elevated flex items-center justify-center ${n.color}`}>
                      <Icon size={18} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-body font-semibold ${!n.read ? "text-foreground" : "text-cinema-muted"}`}>
                        {n.title}
                      </p>
                      <p className="text-xs font-body text-cinema-muted mt-0.5 line-clamp-2">
                        {n.message}
                      </p>
                      <p className="text-[10px] font-mono text-cinema-muted/60 mt-1">{n.time}</p>
                    </div>

                    {/* Dismiss */}
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        dismiss(n.id);
                      }}
                      className="shrink-0 p-1 rounded-full hover:bg-cinema-border transition-colors self-start"
                    >
                      <X size={14} className="text-cinema-muted" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Expose toggle function via window for TopNav bell */}
      <NotificationTrigger open={open} setOpen={setOpen} unreadCount={unreadCount} />
    </>
  );
};

// This component syncs the toggle to the window so TopNav can use it
const NotificationTrigger = ({
  open,
  setOpen,
  unreadCount,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  unreadCount: number;
}) => {
  useEffect(() => {
    (window as any).__notificationToggle = () => setOpen(!open);
    (window as any).__notificationCount = unreadCount;
    return () => {
      delete (window as any).__notificationToggle;
      delete (window as any).__notificationCount;
    };
  }, [open, setOpen, unreadCount]);
  return null;
};

export default NotificationPanel;
