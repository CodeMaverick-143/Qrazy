import { useEffect, useState } from "react";
import { MagnifyingGlass, SpinnerGap, Sparkle } from "@phosphor-icons/react";
import ClubCard from "../components/ClubCard";
import LocationSelector from "../components/LocationSelector";
import GenreFilter from "../components/GenreFilter";
import VibeMeter from "../components/VibeMeter";
import type { Club } from "../types";

export default function Clubs() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("MUMBAI");
  const [selectedGenre, setSelectedGenre] = useState("ALL");

  useEffect(() => {
    const fetchClubs = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/clubs`);
        if (response.ok) {
          const data = await response.json();
          setClubs(data);
        } else {
          console.error("Failed to fetch clubs:", response.status);
        }
      } catch (error) {
        console.error("Failed to fetch clubs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchClubs();
  }, [selectedCity, selectedGenre]);

  const filteredClubs = clubs.filter((club) => {
    const matchesSearch =
      club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity === "ALL" || club.city.toUpperCase() === selectedCity;

    return matchesSearch && matchesCity;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 border border-neon-slime/20 bg-neon-slime/5">
            <Sparkle weight="fill" className="text-neon-slime animate-pulse" />
            <span className="text-neon-slime font-mono text-[10px] uppercase tracking-widest">
              Protocol Discovery Active
            </span>
          </div>
          <h1 className="text-5xl md:text-8xl font-display font-black text-white italic tracking-tighter uppercase leading-none">
            DISCOVER <span className="text-neon-slime glitch">CHAOS</span>
          </h1>
        </div>
        <LocationSelector selectedCity={selectedCity} onCityChange={setSelectedCity} />
      </div>

      {}
      <div className="sticky top-20 z-40 bg-void-black/80 backdrop-blur-md border-b border-white/5 py-6 mb-12">
        <div className="flex flex-col lg:flex-row gap-6 items-center">
          <div className="relative flex-grow w-full">
            <MagnifyingGlass
              className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray/40"
              size={24}
            />
            <input
              type="text"
              placeholder="SEARCH CLUBS, PROMOTERS, OR VIBES..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 focus:border-neon-slime/50 outline-none py-4 pl-14 pr-4 transition-all font-mono text-sm text-white uppercase"
            />
          </div>
          <div className="w-full lg:w-auto shrink-0 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
            <GenreFilter selectedGenre={selectedGenre} onGenreChange={setSelectedGenre} />
          </div>
        </div>
      </div>

      {}
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-xs font-mono font-black text-brand-gray/40 uppercase tracking-[0.3em]">
          Live In Demand • {selectedCity} sector
        </h2>
        <div className="h-px flex-grow mx-8 bg-gradient-to-r from-white/5 via-white/10 to-transparent" />
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 gap-6">
          <div className="relative">
            <SpinnerGap className="text-neon-slime animate-spin" size={64} />
            <div className="absolute inset-0 blur-2xl bg-neon-slime/20 animate-pulse" />
          </div>
          <span className="font-mono text-xs text-brand-gray/40 uppercase tracking-[0.4em] animate-pulse">
            Syncing Reality...
          </span>
        </div>
      ) : filteredClubs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredClubs.map((club) => (
            <div key={club.id} className="group relative">
              <ClubCard
                id={club.id}
                name={club.name}
                location={club.city}
                description={club.events?.[0]?.title || "Upcoming residency and chaos."}
                rating={4.5}
                isVerified={club.verified}
                image={
                  club.image ||
                  `https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&q=80&w=800`
                }
              />
              <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <VibeMeter vibe={Math.random() > 0.5 ? "hot" : "vibe"} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-32 border border-dashed border-white/10 bg-white/5">
          <p className="text-brand-gray/40 font-mono uppercase tracking-[0.3em] text-sm mb-4">
            No signals detected in this sector.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedGenre("ALL");
            }}
            className="text-neon-slime font-mono text-[10px] font-black uppercase tracking-widest border border-neon-slime/20 px-6 py-2 hover:bg-neon-slime hover:text-void-black transition-all"
          >
            Reset Protocol
          </button>
        </div>
      )}
    </div>
  );
}
