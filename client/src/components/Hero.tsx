import { motion } from "framer-motion";
import { CaretRight, ShieldCheck, Lightning, QrCode } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import heroImg from "../assets/hero.png";

const heroNoise = Array.from({ length: 64 }).map(() => Math.random() > 0.5);

export default function Hero() {
  return (
    <div className="relative isolate bg-void-black overflow-hidden min-h-[90vh] flex items-center">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,255,102,0.15),transparent_50%)]" />
        <div className="absolute inset-0 opacity-[0.03] [mask-image:radial-gradient(ellipse_at_center,black,transparent)]">
          <div className="grid grid-cols-8 gap-1 p-4">
            {heroNoise.map((active, i) => (
              <div
                key={i}
                className={`aspect-square rounded-sm ${active ? "bg-neon-slime" : "bg-transparent"}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-slime/10 border border-neon-slime/20 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-slime opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-slime"></span>
              </span>
              <span className="text-xs font-mono uppercase tracking-widest text-neon-slime">
                Live_Network_Active
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-8">
              THE FUTURE OF
              <span className="block text-neon-slime italic drop-shadow-[0_0_15px_rgba(0,255,102,0.5)]">
                NIGHTLIFE
              </span>
            </h1>

            <p className="text-xl text-zinc-400 font-medium leading-relaxed mb-12 max-w-lg border-l-2 border-neon-slime/30 pl-6">
              Verified club passes. Secure QR-only entry. No screenshots. No scams. Join the Qrazy
              network today.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/events"
                className="group relative px-8 py-4 bg-neon-slime text-black font-bold uppercase tracking-wider overflow-hidden transition-transform active:scale-95"
              >
                <div className="absolute inset-0 w-1/2 h-full bg-white/20 -skew-x-12 translate-x-[-150%] group-hover:translate-x-[300%] transition-transform duration-700" />
                <span className="relative flex items-center gap-2">
                  Find Events <CaretRight weight="bold" />
                </span>
              </Link>
              <Link
                to="/clubs"
                className="px-8 py-4 bg-transparent border-2 border-white/10 text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-all flex items-center gap-2 active:scale-95"
              >
                List Your Club
              </Link>
            </div>

            <div className="mt-16 grid grid-cols-3 gap-8">
              {[
                { icon: ShieldCheck, label: "Verified" },
                { icon: Lightning, label: "Instant" },
                { icon: QrCode, label: "Secure" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <item.icon className="text-neon-slime" size={24} />
                  <span className="text-xs font-mono uppercase text-zinc-500 tracking-tighter">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="scanline z-20 pointer-events-none" />
            <div className="absolute inset-0 bg-neon-slime/20 blur-[120px] rounded-full animate-pulse" />
            <div className="relative border border-white/10 bg-black/40 backdrop-blur-xl p-4 rounded-2xl overflow-hidden group">
              <img
                src={heroImg}
                alt="Qrazy App UI"
                className="rounded-xl w-full grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
