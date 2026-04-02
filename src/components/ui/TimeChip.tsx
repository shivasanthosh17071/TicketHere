const TimeChip = ({ time, selected, filling, onClick }: { time: string; selected: boolean; filling?: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`relative px-4 py-2 rounded-lg text-sm font-mono transition-all min-w-[70px] ${selected ? "bg-cinema-red text-foreground shadow-cinema-glow" : "bg-cinema-elevated text-cinema-muted border border-cinema-border hover:border-cinema-red/50 hover:text-foreground"}`}
  >
    {time}
    {filling && !selected && (
      <span className="absolute -top-1 -right-1 text-[8px] bg-cinema-gold text-cinema-bg px-1 rounded font-body font-bold">FAST</span>
    )}
  </button>
);

export default TimeChip;
