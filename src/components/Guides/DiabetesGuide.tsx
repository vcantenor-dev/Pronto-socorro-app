import React from 'react';
import { PhoneCall, Droplet, ArrowLeft, AlertOctagon, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import { MedicalDisclaimer } from '../MedicalDisclaimer';

interface Props {
  onCallSamu: () => void;
  onOpenCPR: () => void;
  onBack?: () => void;
}

export const DiabetesGuide: React.FC<Props> = ({ onCallSamu, onOpenCPR, onBack }) => {
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
        <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wide bg-blue-950 px-2.5 py-1 rounded-full border border-blue-800 ml-auto">
          Condição Cadastrada
        </span>
      </div>

      {/* Main Title Banner */}
      <div className="bg-blue-600 text-white rounded-3xl p-5 shadow-2xl space-y-2">
        <div className="flex items-center gap-2">
          <Droplet className="w-7 h-7 text-white" />
          <h1 className="text-2xl font-black uppercase tracking-tight">
            🚨 EMERGÊNCIA NO DIABETES
          </h1>
        </div>
        <p className="text-sm font-semibold bg-black/25 p-3 rounded-2xl border border-white/20 leading-relaxed">
          O aplicativo não faz diagnóstico de glicemia. Aja com base no estado de consciência da pessoa.
        </p>
      </div>

      {/* Emergency Call SAMU */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 flex items-center justify-between gap-3 shadow-lg">
        <div>
          <span className="text-xs font-black text-amber-400 uppercase">Apoio SAMU</span>
          <p className="text-sm font-extrabold text-white">Central de Regulação 192</p>
          <p className="text-xs text-slate-400">Em caso de desmaio ou confusão mental</p>
        </div>
        <button
          type="button"
          onClick={onCallSamu}
          className="px-4 py-3 bg-red-600 hover:bg-red-500 text-white rounded-2xl font-black text-sm flex items-center gap-2 shadow-lg shadow-red-600/40 shrink-0"
        >
          <PhoneCall className="w-4 h-4" /> Ligar 192
        </button>
      </div>

      {/* Scenario A: Unconscious or Confused (CRITICAL SAFETY) */}
      <div className="bg-red-950/50 border-2 border-red-500 rounded-3xl p-5 space-y-3 shadow-xl">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-red-400" />
          <h2 className="text-base font-black text-white uppercase">
            CENÁRIO 1: PESSOA CONFUSA, SONOLENTA OU INCAPAZ DE ENGOLIR
          </h2>
        </div>

        <div className="space-y-2 text-xs sm:text-sm font-bold text-red-200">
          <div className="p-3 bg-black/60 rounded-2xl border border-red-800 flex items-start gap-2.5">
            <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-white uppercase font-black">NÃO DÊ COMIDA, BEBIDA OU MEDICAMENTOS PELA BOCA!</p>
              <p className="text-slate-300 font-normal text-xs mt-0.5">
                Risco gravíssimo de engasgo e aspiração para os pulmões se a pessoa estiver inconsciente ou confusa.
              </p>
            </div>
          </div>

          <div className="p-3 bg-black/60 rounded-2xl border border-red-800 flex items-start gap-2.5">
            <PhoneCall className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-white uppercase font-black">ACIONE O SERVIÇO DE EMERGÊNCIA (192)</p>
              <p className="text-slate-300 font-normal text-xs mt-0.5">
                Coloque a pessoa deitada de lado para proteger a respiração enquanto aguarda o socorro.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scenario B: Fully Conscious and Able to Swallow */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3 shadow-xl">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-6 h-6 text-emerald-400" />
          <h2 className="text-base font-black text-white">
            CENÁRIO 2: Pessoa lúcida, acordada e engolindo bem
          </h2>
        </div>
        <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs text-slate-200">
          <p className="font-semibold">
            • A pessoa deve seguir o <strong>plano de tratamento que ela já possui previamente prescrito</strong> pelo médico dela (por exemplo, se tiver um glicosímetro para medir a glicose).
          </p>
          <p>
            • Se a pessoa estiver com suspeita de baixa de açúcar (hipoglicemia) e puder engolir sem risco, ela mesma pode consumir uma fonte rápida de carboidrato conforme sua rotina médica habitual.
          </p>
          <p className="text-amber-300">
            • Se os sintomas não melhorarem em 15 minutos ou se houver qualquer dúvida, ligue 192.
          </p>
        </div>
      </div>

      {/* Critical Escalation Button to CPR */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 space-y-2">
        <div className="flex items-center gap-2 text-slate-300">
          <AlertOctagon className="w-5 h-5 text-red-400" />
          <h3 className="text-xs font-black uppercase tracking-wide text-white">
            Se a pessoa perder a consciência e parar de respirar normalmente:
          </h3>
        </div>
        <button
          type="button"
          onClick={onOpenCPR}
          className="w-full py-3.5 bg-red-600 hover:bg-red-500 text-white rounded-2xl font-black text-xs uppercase tracking-tight flex items-center justify-center gap-2"
        >
          🚨 ABRIR GUIA DE PARADA CARDÍACA (RCP)
        </button>
      </div>

      <MedicalDisclaimer compact />
    </div>
  );
};
