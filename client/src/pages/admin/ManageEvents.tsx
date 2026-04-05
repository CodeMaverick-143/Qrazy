import React from "react";
import { Plus, Calendar, MapPin, Users } from "@phosphor-icons/react";

const ManageEvents: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10 w-full text-white">
      <header className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-black tracking-tight uppercase">
            Manage <span className="text-neon-slime italic">Events</span>
          </h1>
          <p className="text-zinc-500 mt-2 font-mono text-sm uppercase tracking-widest">
            Create and edit your club's nightlife experiences
          </p>
        </div>
        <button className="flex items-center gap-2 bg-neon-slime text-black px-6 py-3 font-bold uppercase tracking-wider rounded-xl hover:scale-105 transition-transform active:scale-95">
          <Plus weight="bold" /> Create Event
        </button>
      </header>

      <div className="grid gap-6">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="bg-zinc-900/50 border border-white/5 p-6 rounded-2xl flex items-center justify-between group hover:border-white/10 transition-colors"
          >
            <div className="flex gap-8 items-center">
              <div className="h-24 w-24 bg-zinc-800 rounded-xl overflow-hidden">
                <div className="h-full w-full bg-gradient-to-tr from-neon-slime/20 to-transparent flex items-center justify-center font-black text-neon-slime opacity-50">
                  EVENT {i}
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold group-hover:text-neon-slime transition-colors">
                  Neon Nights Vol {i + 1}
                </h3>
                <div className="flex gap-4 text-zinc-500 text-sm font-mono uppercase">
                  <span className="flex items-center gap-1">
                    <Calendar /> Oct 2{i}, 2024
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin /> Main Hall
                  </span>
                  <span className="flex items-center gap-1">
                    <Users /> 150/500 Sold
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 border border-white/10 rounded-lg text-sm font-bold uppercase hover:bg-white/5 transition-colors">
                Edit
              </button>
              <button className="px-4 py-2 border border-neon-slime/20 text-neon-slime rounded-lg text-sm font-bold uppercase hover:bg-neon-slime/10 transition-colors">
                View Sales
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageEvents;
