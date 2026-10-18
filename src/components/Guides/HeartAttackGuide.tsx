import React from 'react';
import { PhoneCall, HeartPulse, ArrowLeft, AlertOctagon, CheckCircle2, XCircle } from 'lucide-react';
import { MedicalDisclaimer } from '../MedicalDisclaimer';

interface Props {
  onCallSamu: () => void;
  onOpenCPR: () => void;
  onBack?: () => void;
}

export const HeartAttackGuide: React.FC<Props> = ({ onCallSamu, onOpenCPR, onBack }) => {
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
        <span className="text-[11px] font-bold text-red-400 uppercase tracking-wide bg-red-950 px-2.5 py-1 rounded-full border border-red-800 ml-auto">
          Condição Cadastrada
        </span>
      </div>

      {/* Main Title */}
      <div className="bg-red-600 text-white rounded-3xl p-5 shadow-2xl space-y-2">
        <div className="flex items-center gap-2">
          <HeartPulse className="w-7 h-7 text-white" />
          <h1 className="text-2xl font-black uppercase tracking-tight">🚨 POSSÍVEL ATAQUE CARDÍACO</h1>
        </div>
        <p className="text-sm font-semibold bg-black/25 p-3 rounded-2xl border border-white/20 leading-relaxed">
          Se a pessoa apresentar dor ou pressão no peito, falta de ar, suor frio, náusea ou outros sintomas preocupantes, trate como uma emergência.
        </p>
      </div>

      {/* Emergency Call SAMU Action */}
      <div className="bg-slate-900 border-2 border-red-500 rounded-3xl p-5 space-y-3 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-extrabold text-red-400 uppercase">Ação Prioritária 1</span>
            <h2 className="text-lg font-black text-white">Acione o Serviço de Emergência</h2>
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
          Informe ao atendente do SAMU que a pessoa está com dor no peito e histórico cardíaco.
        </p>
      </div>

      {/* Recommended Steps */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-xl">
        <h2 className="text-base font-black text-white flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          O que fazer com a pessoa agora:
        </h2>

        <div className="space-y-2.5 text-xs sm:text-sm">
          <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-0.5">
            <span className="text-xs font-bold text-amber-400">1. Sente a pessoa</span>
            <p className="text-slate-200 font-medium">
              Mantenha a pessoa sentada ou recostada em almofadas. Não deixe ela andar nem fazer esforço.
            </p>
          </div>

          <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-0.5">
            <span className="text-xs font-bold text-amber-400">2. Afrouxe as roupas</span>
            <p className="text-slate-200 font-medium">
              Desabotoe botões da camisa e desaperte o cinto. Abra janelas para entrar ar fresco.
            </p>
          </div>

          <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-0.5">
            <span className="text-xs font-bold text-amber-400">3. Não saia de perto</span>
            <p className="text-slate-200 font-medium">
              Fique ao lado da pessoa o tempo todo verificando se ela continua acordada.
            </p>
          </div>
        </div>
      </div>

      {/* Prohibitions */}
      <div className="bg-amber-950/30 border border-amber-600/40 rounded-3xl p-5 space-y-3">
        <h3 className="text-sm font-black text-amber-300 flex items-center gap-2">
          <XCircle className="w-5 h-5 text-amber-400" />
          O que NÃO fazer:
        </h3>
        <ul className="text-xs text-amber-100/90 space-y-2 list-disc list-inside font-medium">
          <li><strong>Não ofereça medicamentos</strong> que não foram previamente prescritos para aquela pessoa pelo médico dela.</li>
          <li>Não dê água, café ou alimentos.</li>
          <li>Não deixe a pessoa caminhar ou fazer esforço físico.</li>
        </ul>
      </div>

      {/* Critical Escalation Button to CPR */}
      <div className="bg-red-950/80 border-2 border-red-500 rounded-3xl p-5 space-y-3 shadow-2xl">
        <div className="flex items-center gap-2 text-red-300">
          <AlertOctagon className="w-6 h-6 text-red-400 animate-bounce" />
          <h3 className="text-sm font-black uppercase tracking-wide text-white">
            SINAL DE GRAVIDADE EXTREMA
          </h3>
        </div>
        <p className="text-xs font-semibold text-red-200 leading-snug">
          Se a pessoa desmaiar, perder a consciência e não respirar normalmente:
        </p>
        <button
          type="button"
          onClick={onOpenCPR}
          className="w-full py-4 bg-red-600 hover:bg-red-500 text-white rounded-2xl font-black text-base uppercase tracking-tight shadow-xl shadow-red-600/40 flex items-center justify-center gap-2 transition-transform active:scale-95"
        >
          🚨 ABRIR GUIA DE PARADA CARDÍACA (RCP)
        </button>
      </div>

      <MedicalDisclaimer compact />
    </div>
  );
};
