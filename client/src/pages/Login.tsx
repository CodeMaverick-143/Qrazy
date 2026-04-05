import { useState } from "react";
import { supabase } from "../lib/supabase";
import {
  ShieldCheck,
  GoogleLogo,
  EnvelopeSimple,
  SpinnerGap,
  ArrowRight,
  Fingerprint,
} from "@phosphor-icons/react";

function Login() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin + "/verify-magic-link",
      },
    });

    if (error) {
      if (error.message.includes("provider is not enabled") || error.message.includes("Unsupported provider")) {
        setError("Developer Action Required: Enable the Email OTP provider in the Supabase Auth Dashboard.");
      } else {
        setError(error.message);
      }
    } else {
      setMessage("Secure access link dispatched. Check your inbox.");
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });

    if (error) {
      if (error.message.includes("provider is not enabled") || error.message.includes("Unsupported provider")) {
        setError("Developer Action Required: Configure the Google OAuth provider in the Supabase Dashboard.");
      } else {
        setError(error.message);
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-slime/5 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-hot-pink/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-md w-full relative">
        {}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-4 bg-void-black border-2 border-neon-slime shadow-slime-glow mb-6 transform -rotate-2">
            <Fingerprint size={48} className="text-neon-slime" weight="duotone" />
          </div>
          <h1 className="text-5xl font-display font-black text-white italic tracking-tighter uppercase mb-2">
            Infiltrate <span className="text-neon-slime">Qrazy</span>
          </h1>
          <p className="font-mono text-[10px] text-brand-gray/40 uppercase tracking-[0.3em] flex items-center justify-center gap-2">
            <ShieldCheck size={14} className="text-neon-slime" />
            Encrypted Authentication Protocol 2.4.0
          </p>
        </div>

        {}
        <div className="glass-panel border-white/5 relative overflow-hidden group">
          {}
          <div className="flex border-b border-white/5">
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-1 py-4 font-mono text-[10px] uppercase font-black tracking-widest transition-all ${activeTab === "login" ? "text-neon-slime bg-neon-slime/5" : "text-brand-gray/40 hover:text-white"}`}
            >
              Existing Member
            </button>
            <button
              onClick={() => setActiveTab("signup")}
              className={`flex-1 py-4 font-mono text-[10px] uppercase font-black tracking-widest transition-all ${activeTab === "signup" ? "text-hot-pink bg-hot-pink/5" : "text-brand-gray/40 hover:text-white"}`}
            >
              New Recruit
            </button>
          </div>

          <div className="p-8">
            {activeTab === "signup" && (
              <div className="mb-8 p-4 bg-hot-pink/5 border border-hot-pink/20">
                <p className="font-mono text-[9px] text-hot-pink uppercase tracking-wider leading-relaxed">
                  Welcome, recruit. Enter your email protocol below. We will establish your
                  credentials upon first entry. No password required.
                </p>
              </div>
            )}

            <div className="space-y-6">
              {}
              <button
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full flex items-center justify-between group/auth p-4 bg-white hover:bg-neon-slime transition-all active:scale-[0.98] disabled:opacity-50"
              >
                <div className="flex items-center gap-4">
                  <GoogleLogo size={24} weight="bold" className="text-void-black" />
                  <span className="font-display font-black text-void-black uppercase tracking-tight">
                    Identity via Google
                  </span>
                </div>
                <ArrowRight
                  size={20}
                  className="text-void-black transition-transform group-hover/auth:translate-x-1"
                />
              </button>

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/5"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-void-black px-4 font-mono text-[8px] text-brand-gray/20 uppercase tracking-[0.5em]">
                    Network Bridge
                  </span>
                </div>
              </div>

              {}
              <form onSubmit={handleMagicLink} className="space-y-4">
                <div className="space-y-2">
                  <label className="flex items-center justify-between px-1">
                    <span className="font-mono text-[10px] text-brand-gray/40 uppercase tracking-widest">
                      Email Vector
                    </span>
                    <EnvelopeSimple size={14} className="text-brand-gray/20" />
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="USER@NETWORK.CORE"
                    className="w-full bg-void-black border border-white/10 p-4 font-mono text-sm text-white focus:outline-none focus:border-neon-slime focus:shadow-slime-glow-soft transition-all placeholder:text-white/5 uppercase"
                  />
                </div>

                {error && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 font-mono text-[10px] uppercase">
                    System Error: {error}
                  </div>
                )}

                {message && (
                  <div className="p-3 bg-neon-slime/10 border border-neon-slime/20 text-neon-slime font-mono text-[10px] uppercase animate-pulse">
                    {message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-secondary w-full py-4 flex items-center justify-center gap-3 border-white/10 hover:border-neon-slime disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <SpinnerGap size={20} className="animate-spin" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Initialize Link</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {}
          <div className="p-6 bg-white/5 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-neon-slime" />
              <span className="font-mono text-[9px] text-brand-gray/40 uppercase tracking-widest">
                SSL Secured Link
              </span>
            </div>
            <span className="font-mono text-[9px] text-brand-gray/20 uppercase">
              No Data Shared with Third Parties
            </span>
          </div>
        </div>

        {}
        <div className="mt-8 flex justify-center gap-8 opacity-20 grayscale">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
            className="h-4"
            alt="PayPal"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_logo%2C_revised_2016.svg"
            className="h-4"
            alt="Stripe"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
            className="h-4"
            alt="Visa"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
