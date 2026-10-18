import React from 'react';
import { PhoneCall, Wind, ArrowLeft, CheckCircle2, AlertTriangle, AlertOctagon } from 'lucide-react';
import { MedicalDisclaimer } from '../MedicalDisclaimer';

interface Props {
  onCallSamu: () => void;
  onOpenCPR: () => void;
  onBack?: () => void;
}

export const AsthmaGuide: React.FC<Props> = ({ onCallSamu, onOpenCPR, onBack }) => {
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
        <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wide bg-sky-950 px-2.5 py-1 rounded-full border border-sky-800 ml-auto">
          Condição Cadastrada
        </span>
      </div>

      {/* Main Title Banner */}
      <div className="bg-sky-600 text-white rounded-3xl p-5 shadow-2xl space-y-2">
        <div className="flex items-center gap-2">
          <Wind className="w-7 h-7 text-white" />
          <h1 className="text-2xl font-black uppercase tracking-tight">
            🚨 CRISE DE ASMA / FALTA DE AR
          </h1>
        </div>
        <p className="text-sm font-semibold bg-black/25 p-3 rounded-2xl border border-white/20 leading-relaxed">
          Ajude a pessoa a respirar e acalme o ambiente. Siga os passos rápidos abaixo.
        </p>
      </div>

      {/* Emergency Call SAMU */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 flex items-center justify-between gap-3 shadow-lg">
        <div>
          <span className="text-xs font-black text-amber-400 uppercase">Socorro</span>
          <p className="text-sm font-extrabold text-white">Serviço de Emergência</p>
          <p className="text-xs text-slate-400">Ligue caso não melhore rápido</p>
        </div>
        <button
          type="button"
          onClick={onCallSamu}
          className="px-4 py-3 bg-red-600 hover:bg-red-500 text-white rounded-2xl font-black text-sm flex items-center gap-2 shadow-lg shadow-red-600/40 shrink-0"
        >
          <PhoneCall className="w-4 h-4" /> Ligar 192
        </button>
      </div>

      {/* Action Steps */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3.5 shadow-xl">
        <h2 className="text-base font-black text-white flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-sky-400" />
          Passo a passo imediato:
        </h2>

        <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-0.5">
          <span className="text-xs font-black text-sky-400 uppercase">1. Sente a pessoa</span>
          <p className="text-xs sm:text-sm text-slate-100 font-bold">
            Mantenha a pessoa sentada com o tronco inclinado para a frente. <strong>NÃO deite ela de costas.</strong>
          </p>
        </div>

        <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-0.5">
          <span className="text-xs font-black text-sky-400 uppercase">2. Bombinha prescrita</span>
          <p className="text-xs sm:text-sm text-slate-100 font-bold">
            Ajude a pessoa a pegar o inalador prescrito dela e usar conforme orientado pelo médico.
          </p>
        </div>

        <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-0.5">
          <span className="text-xs font-black text-sky-400 uppercase">3. Acompanhe sem sair de perto</span>
          <p className="text-xs sm:text-sm text-slate-100 font-bold">
            Mantenha a pessoa calma, peça para respirar devagar e abra janelas para ventilar.
          </p>
        </div>
      </div>

      {/* Warning Box */}
      <div className="bg-amber-950/40 border border-amber-600/40 rounded-3xl p-4 text-xs space-y-2 text-amber-200">
        <div className="flex items-center gap-2 font-bold text-amber-300 text-sm">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
          Sinais de Alerta para Manter 192 Acionado
        </div>
        <p className="leading-relaxed">
          Se a respiração estiver muito difícil, se houver piora, coloração azulada/pálida nos lábios ou se a pessoa não conseguir falar frases completas, <strong>mantenha o serviço de emergência acionado</strong> e aguarde a ambulância.
        </p>
        <p className="text-[11px] text-amber-300/80 italic">
          *O aplicativo não indica medicamentos que não tenham sido previamente prescritos para aquela pessoa.
        </p>
      </div>

      {/* Critical Escalation Button */}
      <div className="bg-red-950/80 border-2 border-red-500 rounded-3xl p-4 space-y-2">
        <div className="flex items-center gap-2 text-red-300">
          <AlertOctagon className="w-5 h-5 text-red-400" />
          <h3 className="text-xs font-black uppercase tracking-wide text-white">
            SE A PESSOA DESMAIAR E NÃO RESPIRAR:
          </h3>
        </div>
        <button
          type="button"
          onClick={onOpenCPR}
          className="w-full py-3.5 bg-red-600 hover:bg-red-500 text-white rounded-2xl font-black text-sm uppercase tracking-tight flex items-center justify-center gap-2"
        >
          🚨 ABRIR GUIA DE PARADA CARDÍACA (RCP)
        </button>
      </div>

      <MedicalDisclaimer compact />
    </div>
  );
};
