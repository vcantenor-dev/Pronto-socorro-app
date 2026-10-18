import React, { useState } from 'react';
import { PhoneCall, ShieldAlert, Zap, ArrowLeft, HeartPulse, Check, AlertOctagon } from 'lucide-react';
import { CPRMetronome } from '../CPRMetronome';
import { CPRVisualGuide } from '../CPRVisualGuide';
import { MedicalDisclaimer } from '../MedicalDisclaimer';

interface Props {
  onCallSamu: () => void;
  onBack?: () => void;
}

export const CPRGuide: React.FC<Props> = ({ onCallSamu, onBack }) => {
  const [activeMode, setActiveMode] = useState<'real' | 'training'>('training');

  return (
    <div className="space-y-4 pb-6">
      {/* Header bar */}
      <div className="flex items-center justify-between">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 rounded-xl text-sm font-bold flex items-center gap-1.5 border border-slate-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" /> Voltar
          </button>
        )}
        <div className="flex-1 text-right">
          <span className="text-xs font-black uppercase text-rose-300 bg-rose-950 px-3 py-1 rounded-full border border-rose-800">
            Treinamento & Emergência
          </span>
        </div>
      </div>

      {/* Main Title & Mode Selector */}
      <div className="bg-gradient-to-r from-red-600 to-rose-700 text-white rounded-3xl p-5 shadow-2xl space-y-3.5">
        <div className="flex items-center gap-3">
          <HeartPulse className="w-9 h-9 text-white animate-pulse shrink-0" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight leading-tight">
              Treinamento de RCP
            </h1>
            <p className="text-sm sm:text-base text-red-100 font-extrabold">
              Massagem Cardíaca (110 compressões por minuto)
            </p>
          </div>
        </div>

        {/* Mode Toggle: Emergência vs Treinamento */}
        <div className="grid grid-cols-2 gap-2 bg-black/40 p-1.5 rounded-2xl border border-white/20">
          <button
            type="button"
            onClick={() => setActiveMode('training')}
            className={`py-3 px-3 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wide transition-all ${
              activeMode === 'training'
                ? 'bg-white text-red-700 shadow-md scale-102'
                : 'text-red-100 hover:text-white'
            }`}
          >
            🎓 Modo Treino
          </button>
          <button
            type="button"
            onClick={() => setActiveMode('real')}
            className={`py-3 px-3 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wide transition-all ${
              activeMode === 'real'
                ? 'bg-red-950 text-white shadow-md ring-2 ring-red-400'
                : 'text-red-100 hover:text-white'
            }`}
          >
            🚨 Emergência Real
          </button>
        </div>
      </div>

      {/* Fast SAMU 192 Bar */}
      <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-4 flex items-center justify-between gap-3 shadow-lg">
        <div>
          <span className="text-xs font-black text-amber-400 uppercase">Passo 1</span>
          <p className="text-base sm:text-lg font-black text-white">Ligue 192 no viva-voz</p>
        </div>
        <button
          type="button"
          onClick={onCallSamu}
          className="px-5 py-3.5 bg-red-600 hover:bg-red-500 active:bg-red-700 text-white rounded-2xl font-black text-sm sm:text-base flex items-center gap-2 shadow-lg shadow-red-600/40 shrink-0 transition-transform active:scale-95"
        >
          <PhoneCall className="w-5 h-5" /> Ligar 192
        </button>
      </div>

      {/* DETAILED VISUAL GUIDE: ONDE APERTAR + COMO SEGURAR A MÃO + POSTURA */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 px-1">
          <span className="w-7 h-7 bg-red-600 text-white rounded-full flex items-center justify-center font-black text-sm">
            2
          </span>
          <h2 className="text-base sm:text-lg font-black text-white uppercase tracking-tight">
            Posição das Mãos e Local no Peito
          </h2>
        </div>

        <CPRVisualGuide />
      </div>

      {/* STEP 3: THE INTERACTIVE METRONOME */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 bg-red-600 text-white rounded-full flex items-center justify-center font-black text-sm">
              3
            </span>
            <h2 className="text-base sm:text-lg font-black text-white uppercase tracking-tight">
              Empurre forte e rápido (110 BPM)
            </h2>
          </div>
          <span className="text-xs font-black text-red-400 uppercase bg-red-950 px-2 py-0.5 rounded-md border border-red-800">
            Afunde 5 a 6 cm
          </span>
        </div>

        {/* CPR Metronome Component with Audio & Visual */}
        <CPRMetronome targetBpm={110} />
      </div>

      {/* QUICK RULES (LARGE TEXT) */}
      <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-4 sm:p-5 space-y-3">
        <h3 className="text-sm sm:text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
          <Check className="w-5 h-5 text-emerald-400" />
          <span>Regras Essenciais:</span>
        </h3>
        <div className="space-y-2 text-sm sm:text-base font-bold">
          <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex items-center gap-2.5 text-slate-100">
            <span className="text-emerald-400 font-black text-lg">✓</span>
            <span>Deixe o peito voltar completamente após cada aperto.</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex items-center gap-2.5 text-slate-100">
            <span className="text-emerald-400 font-black text-lg">✓</span>
            <span>Troque com outra pessoa a cada 2 minutos para não cansar.</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex items-center gap-2.5 text-rose-200">
            <span className="text-rose-400 font-black text-lg">✕</span>
            <span>NÃO pare as compressões até o SAMU 192 chegar ao local.</span>
          </div>
        </div>
      </div>

      {/* DEA Alert */}
      <div className="bg-emerald-950/60 border-2 border-emerald-500/70 rounded-3xl p-4 text-emerald-100 flex items-center justify-between gap-3 shadow-lg">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-emerald-400" />
            <p className="text-sm sm:text-base font-black text-emerald-300">Tem um DEA por perto?</p>
          </div>
          <p className="text-xs sm:text-sm text-emerald-200 leading-snug font-medium">
            Abra a tampa e ligue o aparelho. Ele fala as instruções em voz alta e é 100% automático.
          </p>
        </div>
      </div>

      <MedicalDisclaimer compact />
    </div>
  );
};
