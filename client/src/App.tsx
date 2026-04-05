import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { SpinnerGap, WarningDiamond } from "@phosphor-icons/react";
import { useAuth } from "./context/AuthContext";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const MagicLinkSent = lazy(() => import("./pages/MagicLinkSent"));
const VerifyMagicLink = lazy(() => import("./pages/VerifyMagicLink"));
const Clubs = lazy(() => import("./pages/Clubs"));
const Events = lazy(() => import("./pages/Events"));
const EventDetails = lazy(() => import("./pages/EventDetails"));
const Profile = lazy(() => import("./pages/Profile"));
const ClubDashboard = lazy(() => import("./pages/admin/ClubDashboard"));
const Scanner = lazy(() => import("./pages/admin/Scanner"));

import { ToastProvider } from "./context/ToastContext";
import CyberBackground from "./components/CyberBackground";
import ProtectedRoute from "./components/ProtectedRoute";

const PageLoader = () => (
  <div className="flex-grow flex flex-col items-center justify-center bg-void-black relative overflow-hidden">
    <div className="scanline" />
    <div className="relative mb-8">
      <SpinnerGap className="text-neon-slime animate-spin" size={80} />
      <div className="absolute inset-0 blur-2xl bg-neon-slime/20 animate-pulse" />
    </div>
    <div className="space-y-2 text-center">
      <div className="text-neon-slime font-mono text-[10px] uppercase tracking-[0.5em] animate-pulse">
        System_Initialization_In_Progress
      </div>
      <div className="flex gap-1 justify-center">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="w-12 h-[2px] bg-white/10 overflow-hidden">
            <div
              className="h-full bg-neon-slime animate-[scanline_2s_linear_infinite]"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ConnectivityWarning = () => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-void-black/95 backdrop-blur-xl animate-in fade-in duration-500">
    <div className="max-w-md w-full mx-4 p-8 border border-red-500/30 bg-red-500/5 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500 to-transparent animate-[scanline_3s_linear_infinite]" />
      <div className="relative flex flex-col items-center text-center gap-6">
        <div className="relative">
          <WarningDiamond className="text-red-500 animate-pulse" size={64} weight="duotone" />
          <div className="absolute inset-0 blur-2xl bg-red-500/20 animate-pulse" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-display font-black text-white italic uppercase tracking-wider">
            Infrastructure Offline
          </h2>
          <p className="text-brand-gray/60 font-mono text-xs leading-relaxed uppercase tracking-widest">
            The neural link to Supabase has been severed. This usually indicates the project is currently 
            <span className="text-red-400"> PAUSED</span> or the DNS record has expired.
          </p>
        </div>
        <div className="w-full h-px bg-white/5" />
        <div className="text-[10px] font-mono text-red-500/50 uppercase tracking-[0.3em]">
          Protocol Status: ERR_NAME_NOT_RESOLVED
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="px-8 py-3 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-red-500/50 transition-all text-[10px] font-mono text-white uppercase tracking-[0.2em]"
        >
          Re-initialize Session
        </button>
      </div>
    </div>
  </div>
);

function App() {
  const { connectionError } = useAuth();
  return (
    <ToastProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-void-black flex flex-col relative overflow-hidden">
          {connectionError && <ConnectivityWarning />}
          <CyberBackground />
          <div className="scanline" />
          <Navbar />
          <main className="flex-grow pt-20 flex flex-col">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/magic-link-sent" element={<MagicLinkSent />} />
                <Route path="/verify-magic-link" element={<VerifyMagicLink />} />
                <Route path="/clubs" element={<Clubs />} />
                <Route path="/events" element={<Events />} />
                <Route path="/event/:id" element={<EventDetails />} />
                <Route path="/profile" element={<Profile />} />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute allowedRole="CLUB_ADMIN">
                      <ClubDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/scan"
                  element={
                    <ProtectedRoute allowedRole="CLUB_ADMIN">
                      <Scanner />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
