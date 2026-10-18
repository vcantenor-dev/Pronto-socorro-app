import React from 'react';
import {
  ArrowLeft,
  PhoneCall,
  ChevronRight,
  HeartPulse,
} from 'lucide-react';
import { AccidentKey } from '../types';
import { ACCIDENTS_DATA } from '../data/accidentsData';
import { MedicalDisclaimer } from '../components/MedicalDisclaimer';

interface Props {
  onSelectAccident: (key: AccidentKey) => void;
  onOpenCPR: () => void;
  onCallSamu: () => void;
  onBack: () => void;
}

export const AccidentsScreen: React.FC<Props> = ({
  onSelectAccident,
  onOpenCPR,
  onCallSamu,
  onBack,
}) => {
  const accidentsList = Object.values(ACCIDENTS_DATA);

  return (
    <div className="space-y-3.5 pb-4">
      {/* Top Header: Simple and Direct */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="p-2.5 text-slate-100 hover:text-white rounded-xl bg-slate-900 border border-slate-800 transition-colors flex items-center gap-1.5 font-bold text-xs"
          title="Voltar"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar</span>
        </button>

        <h1 className="text-base sm:text-lg font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
          <span>🚑</span>
          <span>Acidentes</span>
        </h1>

        <button
          type="button"
          onClick={onCallSamu}
          className="px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-sm font-black flex items-center gap-1.5 shadow-md shadow-red-600/40 active:scale-95 transition-transform"
          title="Ligar 192 SAMU"
        >
          <PhoneCall className="w-4 h-4" /> 192
        </button>
      </div>

      {/* TOP PRIORITY EMERGENCY CARD: CPR (INSTANT ACCESS) */}
      <button
        type="button"
        onClick={onOpenCPR}
        className="w-full text-left p-4 sm:p-5 bg-gradient-to-r from-red-600 via-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 active:scale-98 text-white rounded-3xl shadow-xl shadow-red-600/40 border-2 border-red-300 flex items-center justify-between gap-3 transition-transform animate-pulse"
      >
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
            <HeartPulse className="w-7 h-7 text-white" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-black uppercase bg-black/40 px-2.5 py-0.5 rounded-full text-red-100 border border-white/20">
              URGÊNCIA MÁXIMA
            </span>
            <p className="text-lg sm:text-xl font-black text-white leading-tight mt-0.5 truncate">
              Vítima Não Respira? (RCP)
            </p>
            <p className="text-xs sm:text-sm text-red-100 font-bold truncate">
              Iniciar massagem cardíaca agora com metrônomo
            </p>
          </div>
        </div>
        <ChevronRight className="w-6 h-6 text-white shrink-0" />
      </button>

      {/* SUBTITLE */}
      <p className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-300 px-1 pt-1">
        Toque no que aconteceu:
      </p>

      {/* 7 DIRECT PANIC-PROOF ACCIDENT BUTTONS (HUGE, ZERO FLUFF) */}
      <div className="space-y-2.5">
        {accidentsList.map((accident) => (
          <button
            key={accident.key}
            type="button"
            onClick={() => onSelectAccident(accident.key)}
            className="w-full text-left p-4 sm:p-4.5 bg-slate-900 hover:bg-slate-850 active:bg-slate-800 border-2 border-slate-800 hover:border-slate-700 rounded-3xl transition-all shadow-md active:scale-98 flex items-center justify-between gap-3 group"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <span className="text-3xl sm:text-4xl shrink-0 group-hover:scale-110 transition-transform">
                {accident.emoji}
              </span>
              <div className="min-w-0">
                <h2 className="text-base sm:text-lg font-black text-white group-hover:text-amber-300 transition-colors leading-snug truncate">
                  {accident.title}
                </h2>
                <p className="text-xs sm:text-sm text-amber-300 font-bold leading-normal truncate">
                  👉 {accident.quickActionSummary}
                </p>
              </div>
            </div>

            <ChevronRight className="w-6 h-6 text-slate-500 group-hover:text-amber-400 shrink-0 transition-colors" />
          </button>
        ))}
      </div>

      <MedicalDisclaimer compact />
    </div>
  );
};
