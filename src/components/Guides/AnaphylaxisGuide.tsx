import React from 'react';
import { PhoneCall, ShieldAlert, ArrowLeft, AlertOctagon, CheckCircle2, AlertTriangle } from 'lucide-react';
import { MedicalDisclaimer } from '../MedicalDisclaimer';

interface Props {
  onCallSamu: () => void;
  onOpenCPR: () => void;
  onBack?: () => void;
}

export const AnaphylaxisGuide: React.FC<Props> = ({ onCallSamu, onOpenCPR, onBack }) => {
  return (
    <div className="space-y-5">
      {/* Header bar */}
      <div className="flex items-center justify-between">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-slate-700"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar
          </button>
        )}
        <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wide bg-rose-950 px-2.5 py-1 rounded-full border border-rose-800 ml-auto">
          Condição Cadastrada
        </span>
      </div>

      {/* Main Title Banner */}
      <div className="bg-rose-600 text-white rounded-3xl p-5 shadow-2xl space-y-2">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-7 h-7 text-white" />
          <h1 className="text-2xl font-black uppercase tracking-tight">
            🚨 REAÇÃO ALÉRGICA GRAVE
          </h1>
        </div>
        <p className="text-sm font-semibold bg-black/25 p-3 rounded-2xl border border-white/20 leading-relaxed">
          Piora rápida que afeta a respiração e circulação. Exige acionamento médico imediato.
        </p>
      </div>

      {/* Emergency Call SAMU */}
      <div className="bg-slate-900 border-2 border-rose-500 rounded-3xl p-5 space-y-3 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-black text-rose-400 uppercase">Prioridade Máxima</span>
            <h2 className="text-lg font-black text-white">Acione o SAMU 192</h2>
          </div>
          <button
            type="button"
            onClick={onCallSamu}
            className="px-5 py-3.5 bg-red-600 hover:bg-red-500 text-white rounded-2xl font-black text-sm flex items-center gap-2 shadow-lg shadow-red-600/40"
          >
            <PhoneCall className="w-5 h-5" /> Ligar 192
          </button>
        </div>
        <p className="text-xs text-slate-300">
          Informe: 'Suspeita de anafilaxia / reação alérgica grave com falta de ar ou inchaço'.
        </p>
      </div>

      {/* Warning signs cards */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3 shadow-xl">
        <h2 className="text-sm font-black text-white flex items-center gap-2 uppercase tracking-wide">
          <AlertTriangle className="w-4 h-4 text-rose-400" />
          Sinais de Alerta para Reconhecer:
        </h2>

        <div className="grid grid-cols-2 gap-2.5 text-xs font-bold">
          <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-rose-200">
            🫁 Dificuldade severa para respirar ou chiado
          </div>
          <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-rose-200">
            👄 Inchaço importante (língua, lábios ou garganta)
          </div>
          <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-rose-200">
            🌀 Tontura intensa ou sensação de desmaio
          </div>
          <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-rose-200">
            ⚡ Piora rápida dos sintomas
          </div>
        </div>
      </div>

      {/* Action steps */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3.5 shadow-xl">
        <h2 className="text-base font-black text-white flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          O que fazer:
        </h2>

        <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-xs font-bold text-amber-400">1. Autoinjetor de Epinefrina (Se Houver)</span>
          <p className="text-sm text-slate-100 font-medium">
            Se a pessoa tiver um autoinjetor de epinefrina (adrenalina) prescrito pelo médico dela, ajude-a a utilizá-lo na face lateral da coxa, conforme as instruções do próprio medicamento.
          </p>
        </div>

        <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-xs font-bold text-amber-400">2. Posição</span>
          <p className="text-sm text-slate-100 font-medium">
            Deite a pessoa de costas e eleve ligeiramente as pernas, a menos que ela esteja com muita falta de ar (nesse caso, deixe-a sentada).
          </p>
        </div>

        <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-xs font-bold text-amber-400">3. Não Deixe a Pessoa Sozinha</span>
          <p className="text-sm text-slate-100 font-medium">
            Fique ao lado dela até a ambulância chegar. Não tente dar líquidos ou comprimidos orais se a respiração estiver difícil.
          </p>
        </div>
      </div>

      {/* Escalation to CPR */}
      <div className="bg-red-950/80 border-2 border-red-500 rounded-3xl p-5 space-y-3 shadow-2xl">
        <div className="flex items-center gap-2 text-red-300">
          <AlertOctagon className="w-6 h-6 text-red-400 animate-bounce" />
          <h3 className="text-sm font-black uppercase tracking-wide text-white">
            SE A PESSOA PERDER A CONSCIÊNCIA:
          </h3>
        </div>
        <p className="text-xs font-semibold text-red-200">
          Se a pessoa desmaiar e não estiver respirando normalmente, inicie as compressões cardíacas imediatamente:
        </p>
        <button
          type="button"
          onClick={onOpenCPR}
          className="w-full py-4 bg-red-600 hover:bg-red-500 text-white rounded-2xl font-black text-base uppercase tracking-tight shadow-xl shadow-red-600/40 flex items-center justify-center gap-2"
        >
          🚨 ABRIR GUIA DE PARADA CARDÍACA (RCP)
        </button>
      </div>

      <MedicalDisclaimer compact />
    </div>
  );
};
