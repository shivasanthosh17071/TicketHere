import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Film, Ticket, Home } from "lucide-react";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-cinema-bg flex flex-col items-center justify-center px-6 text-center overflow-hidden relative">
      {/* Floating cinema elements */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-cinema-red/10"
          initial={{ y: "100vh", rotate: 0, opacity: 0 }}
          animate={{
            y: "-20vh",
            rotate: 360,
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 6 + i * 1.5,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "linear",
          }}
          style={{
            left: `${10 + i * 11}%`,
          }}
        >
          {i % 3 === 0 ? <Film size={24} /> : i % 3 === 1 ? <Ticket size={20} /> : <span className="text-2xl">🎬</span>}
        </motion.div>
      ))}

      {/* Projector light effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[400px] bg-gradient-to-b from-cinema-gold/5 to-transparent rounded-b-full pointer-events-none" />

      {/* Main content */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10"
      >
        {/* Film reel 404 */}
        <div className="relative mb-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="w-32 h-32 mx-auto border-4 border-cinema-muted/20 rounded-full flex items-center justify-center relative"
          >
            {/* Reel holes */}
            {[0, 60, 120, 180, 240, 300].map(deg => (
              <div
                key={deg}
                className="absolute w-3 h-3 bg-cinema-bg border border-cinema-muted/30 rounded-full"
                style={{
                  transform: `rotate(${deg}deg) translateY(-45px)`,
                }}
              />
            ))}
            <div className="w-8 h-8 bg-cinema-red/20 rounded-full border-2 border-cinema-red/40" />
          </motion.div>
        </div>

        <motion.h1
          className="font-display text-8xl text-foreground tracking-widest mb-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          404
        </motion.h1>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          <p className="font-display text-2xl text-cinema-muted tracking-wide mb-2">
            REEL NOT FOUND
          </p>
          <p className="text-sm text-cinema-muted font-body max-w-xs mx-auto">
            Looks like this scene was left on the cutting room floor. Let's get you back to the show.
          </p>
        </motion.div>

        {/* Ticket stub divider */}
        <div className="my-8 w-64 mx-auto">
          <div className="ticket-edge w-full" />
        </div>

        <motion.div
          className="flex flex-col sm:flex-row gap-3 items-center justify-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={() => navigate("/home")}
            className="flex items-center gap-2 bg-cinema-red text-primary-foreground px-6 py-3 rounded-xl font-body font-bold text-sm hover:bg-cinema-red/90 transition-all shadow-cinema-glow active:scale-95"
          >
            <Home size={16} />
            Back to Home
          </button>
          <button
            onClick={() => navigate("/search")}
            className="flex items-center gap-2 bg-cinema-elevated text-foreground px-6 py-3 rounded-xl font-body font-medium text-sm border border-cinema-border hover:border-cinema-red/40 transition-all active:scale-95"
          >
            <Film size={16} />
            Browse Movies
          </button>
        </motion.div>

        <motion.p
          className="mt-10 text-[10px] text-cinema-muted/50 font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Route: {location.pathname}
        </motion.p>
      </motion.div>
    </div>
  );
};

export default NotFound;
