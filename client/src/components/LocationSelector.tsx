import { useState } from "react";
import { MapPin, CaretDown } from "@phosphor-icons/react";

const CITIES = ["MUMBAI", "BANGALORE", "DELHI", "GOA", "PUNE"];

interface LocationSelectorProps {
  selectedCity: string;
  onCityChange: (city: string) => void;
}

export default function LocationSelector({ selectedCity, onCityChange }: LocationSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 hover:border-neon-slime/50 transition-all group"
      >
        <MapPin className="text-neon-slime" weight="fill" />
        <span className="font-mono text-xs text-white uppercase tracking-widest">
          {selectedCity}
        </span>
        <CaretDown className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-void-black border border-white/10 z-50 shadow-2xl backdrop-blur-xl bg-opacity-95">
          {CITIES.map((city) => (
            <button
              key={city}
              onClick={() => {
                onCityChange(city);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-3 font-mono text-xs uppercase tracking-widest transition-colors hover:bg-neon-slime hover:text-void-black ${
                selectedCity === city ? "text-neon-slime" : "text-brand-gray/60"
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
