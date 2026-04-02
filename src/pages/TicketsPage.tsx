import { useState } from "react";
import { Ticket, Film, Star } from "lucide-react";
import TopNav from "@/components/layout/TopNav";
import BottomNav from "@/components/layout/BottomNav";
import Sidebar from "@/components/layout/Sidebar";
import { movies } from "@/data/movies";

const tabs = ["Upcoming", "Past", "Cancelled"];

const getMoviePoster = (title: string) => {
  const movie = movies.find(m => m.title.toLowerCase().includes(title.toLowerCase()));
  return movie?.poster || "https://picsum.photos/seed/default/300/450";
};

const mockTickets = {
  upcoming: [
    { id: 1, movie: "Kalki 2898 AD", poster: getMoviePoster("Kalki"), date: "Apr 5, 2026", time: "18:30", theater: "PVR Cinemas – Inorbit Mall", seats: "D-3, D-4", format: "IMAX", daysAway: 3 },
    { id: 2, movie: "Pushpa 2: The Rule", poster: getMoviePoster("Pushpa"), date: "Apr 8, 2026", time: "21:00", theater: "Prasads Multiplex", seats: "E-5, E-6", format: "3D", daysAway: 6 },
  ],
  past: [
    { id: 3, movie: "Baahubali 2", poster: getMoviePoster("Baahubali 2"), date: "Mar 15, 2026", time: "15:00", theater: "IMAX at AMB Cinemas", seats: "B-4, B-5", format: "IMAX" },
  ],
  cancelled: [
    { id: 4, movie: "Animal", poster: getMoviePoster("Animal"), date: "Feb 20, 2026", time: "12:00", theater: "Cinepolis – Nexus", seats: "G-7", format: "2D", refundStatus: "Refunded" },
  ],
};

const TicketsPage = () => {
  const [activeTab, setActiveTab] = useState("Upcoming");

  const currentTickets = activeTab === "Upcoming" ? mockTickets.upcoming
    : activeTab === "Past" ? mockTickets.past
    : mockTickets.cancelled;

  return (
    <div className="min-h-screen bg-cinema-bg">
      <TopNav />
      <Sidebar />
      <main className="lg:ml-60 pb-20 lg:pb-8">
        <div className="px-4 pt-4">
          <h1 className="font-display text-3xl text-foreground tracking-wide">MY TICKETS</h1>
          <div className="flex gap-2 mt-4">
            {tabs.map(t => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`px-4 py-1.5 rounded-full text-sm font-body font-medium transition-all ${t === activeTab ? "bg-cinema-red text-primary-foreground" : "bg-cinema-elevated text-cinema-muted"}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="px-4 mt-4 space-y-3">
          {currentTickets.length === 0 ? (
            <div className="flex flex-col items-center justify-center mt-20">
              <Ticket size={48} className="text-cinema-muted/30 mb-4" />
              <p className="text-cinema-muted font-body text-sm">No {activeTab.toLowerCase()} tickets</p>
              <p className="text-cinema-muted/60 font-body text-xs mt-1">Start by booking a movie!</p>
            </div>
          ) : (
            currentTickets.map(ticket => (
              <div key={ticket.id} className={`bg-cinema-card border border-cinema-border rounded-xl p-4 ${activeTab === "Past" ? "opacity-60" : ""}`}>
                <div className="flex gap-3">
                  <img src={ticket.poster} alt={ticket.movie} className="w-16 h-24 rounded-lg object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-body font-bold text-foreground text-sm">{ticket.movie}</h3>
                    <p className="text-[10px] text-cinema-muted font-body mt-1">{ticket.date} • {ticket.time}</p>
                    <p className="text-[10px] text-cinema-muted font-body">{ticket.theater}</p>
                    <p className="text-[10px] text-cinema-muted font-body">Seats: {ticket.seats} • {ticket.format}</p>

                    {activeTab === "Upcoming" && "daysAway" in ticket && (
                      <span className={`inline-block mt-2 text-[10px] font-body font-bold px-2 py-0.5 rounded ${(ticket as any).daysAway <= 1 ? "bg-cinema-gold/20 text-cinema-gold" : "bg-cinema-elevated text-cinema-muted"}`}>
                        {(ticket as any).daysAway <= 1 ? "Today!" : `${(ticket as any).daysAway} days away`}
                      </span>
                    )}

                    {activeTab === "Cancelled" && "refundStatus" in ticket && (
                      <div className="flex gap-2 mt-2">
                        <span className="text-[10px] bg-cinema-red/20 text-cinema-red px-2 py-0.5 rounded font-body font-bold">Cancelled</span>
                        <span className="text-[10px] bg-cinema-success/20 text-cinema-success px-2 py-0.5 rounded font-body">{(ticket as any).refundStatus}</span>
                      </div>
                    )}

                    {activeTab === "Past" && (
                      <div className="flex items-center gap-1 mt-2">
                        <Star size={12} className="text-cinema-gold" />
                        <span className="text-[10px] text-cinema-gold font-body">Rate Movie</span>
                      </div>
                    )}
                  </div>
                </div>
                {activeTab === "Upcoming" && (
                  <button className="w-full mt-3 bg-cinema-red/10 text-cinema-red py-2 rounded-lg text-xs font-body font-medium hover:bg-cinema-red/20 transition-colors">
                    View Ticket
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </main>
      <BottomNav />
    </div>
  );
};

export default TicketsPage;
