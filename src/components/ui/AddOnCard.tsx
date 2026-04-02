interface AddOnCardProps {
  emoji: string;
  name: string;
  price: number;
  added: boolean;
  onToggle: () => void;
}

const AddOnCard = ({ emoji, name, price, added, onToggle }: AddOnCardProps) => (
  <div className="flex items-center justify-between bg-cinema-elevated rounded-xl p-3 border border-cinema-border">
    <div className="flex items-center gap-3">
      <span className="text-2xl">{emoji}</span>
      <div>
        <p className="text-sm font-body font-medium text-foreground">{name}</p>
        <p className="text-xs text-cinema-muted font-mono">₹{price}</p>
      </div>
    </div>
    <button
      onClick={onToggle}
      className={`px-4 py-1.5 rounded-lg text-xs font-body font-bold transition-all ${added ? "bg-cinema-red text-foreground" : "bg-cinema-card text-cinema-muted border border-cinema-border hover:border-cinema-red/50"}`}
      style={added ? { animation: "pulse-glow 2s infinite" } : {}}
    >
      {added ? "Added ✓" : "+ Add"}
    </button>
  </div>
);

export default AddOnCard;
