import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, BatteryMedium, Signal, Smartphone, Maximize2, Minimize2, PhoneCall } from 'lucide-react';
import { OfflineStatusIndicator } from './OfflineStatusIndicator';
import { useNetworkStatus } from '../utils/useNetworkStatus';

interface Props {
  children: React.ReactNode;
  activeEmergency?: boolean;
  onQuickCallSamu?: () => void;
  footer?: React.ReactNode;
}

export const AndroidFrame: React.FC<Props> = ({
  children,
  activeEmergency = false,
  onQuickCallSamu,
  footer,
}) => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [isFramed, setIsFramed] = useState<boolean>(true);
  const { isOnline } = useNetworkStatus();

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      );
    };
    update();
    const interval = setInterval(update, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-0 sm:p-4 selection:bg-red-500 selection:text-white font-sans">
      {/* Top Desktop Controls Bar */}
      <div className="hidden sm:flex items-center justify-between w-full max-w-md mb-2 px-2 text-xs text-slate-400">
        <div className="flex items-center gap-1.5">
          <Smartphone className="w-3.5 h-3.5 text-red-400" />
          <span className="font-bold text-slate-300">Android 14 • PRONTO SOCORRO</span>
        </div>

        <button
          type="button"
          onClick={() => setIsFramed(!isFramed)}
          className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white bg-slate-900 border border-slate-800 px-2 py-1 rounded-lg"
          title="Alternar moldura mobile"
        >
          {isFramed ? <Maximize2 className="w-3 h-3" /> : <Minimize2 className="w-3 h-3" />}
          <span>{isFramed ? 'Expandir' : 'Moldura'}</span>
        </button>
      </div>

      {/* Main Container / Mobile Phone Shell */}
      <div
        className={`w-full transition-all duration-200 overflow-hidden flex flex-col bg-slate-950 ${
          isFramed
            ? 'sm:max-w-[430px] sm:min-h-[860px] sm:max-h-[92vh] sm:rounded-[44px] sm:border-[8px] sm:border-slate-800 sm:shadow-2xl sm:shadow-black/90'
            : 'max-w-2xl min-h-screen sm:rounded-2xl sm:border border-slate-800'
        }`}
      >
        {/* Android Status Bar */}
        <div className="w-full bg-slate-950/95 backdrop-blur-md px-6 pt-3 pb-2 flex items-center justify-between text-xs text-slate-300 font-medium select-none shrink-0 border-b border-slate-900/60 z-30">
          <span className="font-bold text-[13px] tracking-tight text-white">{currentTime || '12:00'}</span>

          {/* Punch Hole Camera (decorative on desktop frame) */}
          <div className="hidden sm:block w-3.5 h-3.5 rounded-full bg-black border border-slate-800 shrink-0 mx-auto -mr-6" />

          <div className="flex items-center gap-2 text-slate-300 text-[11px]">
            <Signal className="w-3.5 h-3.5" />
            {isOnline ? (
              <Wifi className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <WifiOff className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            )}
            <div className="flex items-center gap-0.5">
              <span>94%</span>
              <BatteryMedium className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
        </div>

        {/* PROMINENT OFFLINE READY INDICATOR (100% DISPONÍVEL SEM INTERNET) */}
        <div className="w-full px-4 pt-2.5 pb-1 bg-slate-950/95 shrink-0 z-20">
          <OfflineStatusIndicator />
        </div>

        {/* Global Emergency Hot Banner when emergency active */}
        {activeEmergency && onQuickCallSamu && (
          <div className="bg-red-600 text-white px-4 py-2 flex items-center justify-between text-xs font-black shrink-0 shadow-md">
            <span className="flex items-center gap-1.5 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-white" />
              EMERGÊNCIA EM ANDAMENTO
            </span>
            <button
              type="button"
              onClick={onQuickCallSamu}
              className="bg-black/30 hover:bg-black/50 px-2.5 py-1 rounded-lg text-white flex items-center gap-1 text-[11px]"
            >
              <PhoneCall className="w-3 h-3" /> 192 SAMU
            </button>
          </div>
        )}

        {/* Content Viewport with Smooth Scrolling */}
        <main className="flex-1 overflow-y-auto px-4 py-3 sm:px-5 sm:py-4 scrollbar-thin scrollbar-thumb-slate-800">
          {children}
        </main>

        {/* Optional Fixed Bottom Navigation / Tab Bar */}
        {footer}

        {/* Android Gesture Navigation Bar Pill */}
        <div className="w-full py-2.5 flex items-center justify-center bg-slate-950 shrink-0">
          <div className="w-32 h-1 bg-slate-700/80 rounded-full" />
        </div>
      </div>
    </div>
  );
};
