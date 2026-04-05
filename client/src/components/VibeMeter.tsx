interface VibeMeterProps {
  vibe: "hot" | "chill" | "packed" | "vibe";
}

export default function VibeMeter({ vibe }: VibeMeterProps) {
  const config = {
    hot: { color: "bg-hot-pink", label: "HOT", shadow: "shadow-pink-glow" },
    chill: { color: "bg-electric-cyan", label: "CHILL", shadow: "shadow-cyan-glow" },
    packed: { color: "bg-orange-500", label: "PACKED", shadow: "shadow-orange-glow" },
    vibe: { color: "bg-neon-slime", label: "VIBIN", shadow: "shadow-slime-glow" },
  };

  const current = config[vibe] || config.vibe;

  return (
    <div className="inline-flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${current.color} ${current.shadow} animate-pulse`} />
      <span className="font-mono text-[9px] font-black text-brand-gray/60 tracking-widest uppercase">
        {current.label}
      </span>
    </div>
  );
}
