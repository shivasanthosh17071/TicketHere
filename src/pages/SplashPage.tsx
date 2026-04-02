import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Film } from "lucide-react";

const SplashPage = () => {
  const navigate = useNavigate();
  const title = "TICKET HERE";
  const [visibleLetters, setVisibleLetters] = useState(0);
  const [showTagline, setShowTagline] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLetters(p => {
        if (p >= title.length) { clearInterval(interval); return p; }
        return p + 1;
      });
    }, 120);
    const tagTimer = setTimeout(() => setShowTagline(true), title.length * 120 + 300);
    const navTimer = setTimeout(() => navigate("/home"), 3000);
    return () => { clearInterval(interval); clearTimeout(tagTimer); clearTimeout(navTimer); };
  }, [navigate]);

  return (
    <div className="fixed inset-0 bg-cinema-bg flex flex-col items-center justify-center cursor-pointer" onClick={() => navigate("/home")}>
      <Film size={48} className="text-cinema-red mb-6" style={{ animation: "pulse-glow 2s infinite" }} />
      <h1 className="font-display text-6xl md:text-8xl tracking-widest text-foreground flex">
        {title.split("").map((letter, i) => (
          <span
            key={i}
            className={letter === " " ? "w-4" : ""}
            style={{
              opacity: i < visibleLetters ? 1 : 0,
              transform: i < visibleLetters ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.3s ease-out",
            }}
          >
            {letter}
          </span>
        ))}
      </h1>
      <div className="h-8 mt-4">
        {showTagline && (
          <p className="text-cinema-muted font-body text-lg tracking-wide" style={{ animation: "fade-in-up 0.5s ease-out forwards" }}>
            Book. Watch. Experience.
          </p>
        )}
      </div>
      <p className="absolute bottom-8 text-[10px] text-cinema-muted font-mono">Powered by Ticket Here</p>
    </div>
  );
};

export default SplashPage;
