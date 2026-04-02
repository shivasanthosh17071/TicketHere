const LanguageTabs = ({ selected, onSelect }: { selected: string; onSelect: (l: string) => void }) => {
  const langs = ["All", "Telugu", "Hindi", "English", "Tamil", "Malayalam", "Kannada"];
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide py-2">
      {langs.map(l => (
        <button
          key={l}
          onClick={() => onSelect(l)}
          className={`px-4 py-1.5 rounded-full text-sm font-body font-medium whitespace-nowrap transition-all ${l === selected ? "bg-cinema-red text-foreground" : "bg-cinema-elevated text-cinema-muted hover:text-foreground"}`}
        >
          {l}
        </button>
      ))}
    </div>
  );
};

export default LanguageTabs;
