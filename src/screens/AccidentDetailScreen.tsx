import React, { useState } from 'react';
import {
  ArrowLeft,
  PhoneCall,
  CheckCircle2,
  XCircle,
  HeartPulse,
} from 'lucide-react';
import { AccidentKey } from '../types';
import { ACCIDENTS_DATA, ChokingAgeGroup } from '../data/accidentsData';
import { MedicalDisclaimer } from '../components/MedicalDisclaimer';

interface Props {
  accidentKey: AccidentKey;
  onCallSamu: () => void;
  onOpenCPR: () => void;
  onBack: () => void;
}

export const AccidentDetailScreen: React.FC<Props> = ({
  accidentKey,
  onCallSamu,
  onOpenCPR,
  onBack,
}) => {
  const data = ACCIDENTS_DATA[accidentKey] || ACCIDENTS_DATA.severe_bleeding;

  const [activeChokingTab, setActiveChokingTab] = useState<'adult' | 'infant' | 'unconscious'>('adult');

  const currentChokingGroup: ChokingAgeGroup | undefined = data.chokingAgeGroups?.find(
    (g) => g.id === activeChokingTab
  );

  return (
    <div className="space-y-3.5 pb-6">
      {/* Top Bar with Big Action Buttons */}
      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={onBack}
          className="px-3.5 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-100 rounded-2xl text-xs sm:text-sm font-black flex items-center gap-1.5 border border-slate-800 transition-colors shrink-0"
        >
          <ArrowLeft className="w-5 h-5" /> Voltar
        </button>

        {/* Big Emergency Phone Button */}
        <button
          type="button"
          onClick={onCallSamu}
          className="px-5 py-3 bg-red-600 hover:bg-red-500 active:bg-red-700 text-white rounded-2xl font-black text-sm sm:text-base flex items-center gap-2 shadow-xl shadow-red-600/50 transition-transform active:scale-95 shrink-0"
        >
          <PhoneCall className="w-5 h-5 animate-pulse" />
          <span>LIGAR 192 SAMU</span>
        </button>
      </div>

      {/* Main Title Banner with Quick Action */}
      <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-4 sm:p-5 space-y-2.5 shadow-xl">
        <div className="flex items-center gap-3">
          <span className="text-4xl shrink-0">{data.emoji}</span>
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-black text-white leading-tight">
              {data.title}
            </h1>
          </div>
        </div>

        {/* Quick Action Alert */}
        <div className="bg-amber-950/70 border-2 border-amber-500/80 rounded-2xl p-3 text-sm sm:text-base text-amber-200 font-black leading-snug">
          👉 {data.quickActionSummary}
        </div>
      </div>

      {/* Choking Quick Toggle (Only for Choking) */}
      {data.key === 'choking' && data.chokingAgeGroups && (
        <div className="grid grid-cols-3 gap-1.5">
          {data.chokingAgeGroups.map((g) => (
            <button
              key={g.id}
              type="button"
              onClick={() => setActiveChokingTab(g.id)}
              className={`py-3 px-1 rounded-2xl text-center font-black text-xs sm:text-sm transition-all border ${
                activeChokingTab === g.id
                  ? g.id === 'unconscious'
                    ? 'bg-red-600 text-white border-red-300 shadow-md ring-2 ring-red-400'
                    : 'bg-amber-500 text-slate-950 border-amber-300 shadow-md ring-2 ring-amber-300'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:text-white'
              }`}
            >
              {g.title.split(' ')[0]}
            </button>
          ))}
        </div>
      )}

      {/* SECTION 1: FAÇA ISSO AGORA (PASSOS DIRETOS EM FONTE GIGANTE) */}
      <div className="bg-slate-900 border-2 border-emerald-500/60 rounded-3xl p-4 sm:p-5 space-y-3 shadow-xl">
        <h2 className="text-base sm:text-lg font-black text-emerald-400 uppercase tracking-wide flex items-center gap-2">
          <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
          <span>Faça isso agora:</span>
        </h2>

        <div className="space-y-2.5">
          {(data.key === 'choking' && currentChokingGroup
            ? currentChokingGroup.steps
            : data.steps
          ).map((step, idx) => (
            <div
              key={idx}
              className="p-3.5 sm:p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-start gap-3"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 flex items-center justify-center font-black text-base shrink-0 mt-0.5">
                {idx + 1}
              </div>
              <div className="space-y-0.5 min-w-0">
                <p className="text-base sm:text-lg font-black text-white leading-snug">
                  {step.title}
                </p>
                <p className="text-sm sm:text-base text-slate-200 font-bold leading-snug">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: NÃO FAÇA ISSO (DIRETO E SEM ENROLAÇÃO) */}
      <div className="bg-amber-950/30 border-2 border-amber-600/60 rounded-3xl p-4 sm:p-5 space-y-2.5 shadow-lg">
        <h2 className="text-base sm:text-lg font-black text-amber-300 uppercase tracking-wide flex items-center gap-2">
          <XCircle className="w-6 h-6 text-amber-400 shrink-0" />
          <span>NÃO faça isso:</span>
        </h2>

        <div className="space-y-2 text-sm sm:text-base font-bold text-amber-100">
          {(data.key === 'choking' && currentChokingGroup
            ? currentChokingGroup.prohibitions
            : data.prohibitions
          ).map((item, idx) => (
            <div key={idx} className="flex items-start gap-2.5 bg-slate-950/90 p-3 rounded-xl border border-amber-800/50">
              <span className="text-red-400 font-black text-lg leading-none shrink-0">✕</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* INSTANT ESCALATION TO CPR (FOR ALL ACCIDENTS) */}
      <button
        type="button"
        onClick={onOpenCPR}
        className="w-full py-4 px-4 bg-gradient-to-r from-red-600 via-rose-600 to-rose-700 hover:from-red-500 active:scale-98 text-white rounded-3xl font-black text-base sm:text-lg uppercase tracking-wide flex items-center justify-center gap-2.5 shadow-2xl shadow-red-600/60 border-2 border-red-300 transition-transform"
      >
        <HeartPulse className="w-7 h-7 text-white animate-bounce shrink-0" />
        <span>Vítima Desmaiou e Não Respira? Abrir RCP</span>
      </button>

      <MedicalDisclaimer compact />
    </div>
  );
};
