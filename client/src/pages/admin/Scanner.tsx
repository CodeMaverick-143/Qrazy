import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Html5QrcodeScanner } from "html5-qrcode";
import { ShieldCheck, Info, XCircle, SpinnerGap } from "@phosphor-icons/react";

const Scanner: React.FC = () => {
  const { session, dbUser } = useAuth();
  const [scanResult, setScanResult] = useState<{
    success: boolean;
    pass?: { id: string };
    error?: string;
  } | null>(null);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false
    );

    scanner.render(onScanSuccess, onScanError);

    async function onScanSuccess(decodedText: string) {
      if (scanning) return;
      setScanning(true);

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/passes/scan`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.access_token}`,
          },
          body: JSON.stringify({ passId: decodedText, clubId: dbUser?.clubId }),
        });

        const data = await response.json();
        setScanResult(data);
      } catch {
        setScanResult({ success: false, error: "Network error occurred" });
      } finally {
        setScanning(false);
        setTimeout(() => setScanResult(null), 5000);
      }
    }

    function onScanError() {
      
    }

    return () => {
      scanner.clear().catch(console.error);
    };
  }, [session, dbUser, scanning]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 flex flex-col items-center">
      <header className="text-center mb-10 w-full">
        <h1 className="text-3xl font-black text-white tracking-tight uppercase mb-2">
          Gate <span className="text-neon-slime italic">Scanner</span>
        </h1>
        <div className="h-1 w-20 bg-neon-slime mx-auto" />
      </header>

      <div className="w-full bg-zinc-900/50 border border-white/5 rounded-3xl overflow-hidden p-6 relative">
        <div id="reader" className="overflow-hidden rounded-2xl border-2 border-white/5" />

        {scanning && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-50">
            <SpinnerGap className="text-neon-slime animate-spin" size={64} />
          </div>
        )}

        {scanResult && (
          <div
            className={`mt-8 p-6 rounded-2xl border animate-in zoom-in-95 duration-200 ${
              scanResult.success
                ? "bg-green-500/10 border-green-500/20"
                : "bg-red-500/10 border-red-500/20"
            }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`p-3 rounded-xl ${scanResult.success ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"}`}
              >
                {scanResult.success ? (
                  <ShieldCheck size={32} weight="fill" />
                ) : (
                  <XCircle size={32} weight="fill" />
                )}
              </div>
              <div>
                <h3
                  className={`text-xl font-bold ${scanResult.success ? "text-green-500" : "text-red-500"}`}
                >
                  {scanResult.success ? "Access Granted" : "Access Denied"}
                </h3>
                <p className="text-zinc-400 font-mono text-sm mt-1">
                  {scanResult.success ? `Ticket ID: ${scanResult.pass?.id}` : scanResult.error}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-10 flex gap-4 text-zinc-500 bg-white/5 px-6 py-4 rounded-full border border-white/5">
        <Info size={20} />
        <p className="text-xs uppercase font-mono tracking-wider">
          Ensure the QR code is centered and well lit
        </p>
      </div>
    </div>
  );
};

export default Scanner;
