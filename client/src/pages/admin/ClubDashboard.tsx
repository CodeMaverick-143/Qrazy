import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Users, Ticket, TrendUp, Calendar, CaretRight, PlusCircle } from "@phosphor-icons/react";

const ClubDashboard: React.FC = () => {
  const { dbUser } = useAuth();
  const [stats, setStats] = useState({ totalSales: 0, totalEntries: 0, activeEvents: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      if (!dbUser?.clubId) return;
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/scans/stats?clubId=${dbUser.clubId}`
        );
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (err) {
        console.error("Failed to fetch stats", err);
      }
    };
    fetchStats();
  }, [dbUser]);

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 w-full">
      <header className="mb-12">
        <h1 className="text-4xl font-black text-white tracking-tight uppercase">
          Admin <span className="text-neon-slime italic">Dashboard</span>
        </h1>
        <p className="text-zinc-500 mt-2 font-mono text-sm uppercase tracking-widest">
          Manage your club occupancy and pass validation
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          { label: "Total Sales", value: `₹${stats.totalSales}`, icon: Ticket },
          { label: "Total Entries", value: stats.totalEntries, icon: Users },
          { label: "Active Events", value: stats.activeEvents, icon: Calendar },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-zinc-900/50 border border-white/5 p-8 rounded-2xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <stat.icon size={80} weight="fill" className="text-neon-slime" />
            </div>
            <div className="relative z-10">
              <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest mb-2">
                {stat.label}
              </p>
              <p className="text-4xl font-black text-white tracking-tighter">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-zinc-900/50 border border-white/5 p-8 rounded-3xl group cursor-pointer hover:border-neon-slime/20 transition-all">
          <div className="flex items-center justify-between mb-8">
            <div className="p-4 bg-neon-slime/10 rounded-2xl text-neon-slime">
              <TrendUp size={32} weight="duotone" />
            </div>
            <CaretRight
              size={24}
              className="text-zinc-600 group-hover:text-neon-slime transition-colors"
            />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Gate Scanner</h3>
          <p className="text-zinc-500 text-sm leading-relaxed">
            Launch the QR scanner to verify entries at your club entrance in real-time.
          </p>
        </div>

        <div className="bg-zinc-900/50 border border-white/5 p-8 rounded-3xl group cursor-pointer hover:border-neon-slime/20 transition-all">
          <div className="flex items-center justify-between mb-8">
            <div className="p-4 bg-neon-slime/10 rounded-2xl text-neon-slime">
              <PlusCircle size={32} weight="duotone" />
            </div>
            <CaretRight
              size={24}
              className="text-zinc-600 group-hover:text-neon-slime transition-colors"
            />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Event Management</h3>
          <p className="text-zinc-500 text-sm leading-relaxed">
            Create and edit events, configure pass quantities, and set pricing.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClubDashboard;
