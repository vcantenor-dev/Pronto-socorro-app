import React from 'react';
import { Activity, ArrowLeft, Shield, XCircle, CheckCircle2, AlertOctagon } from 'lucide-react';
import { SeizureTimer } from '../SeizureTimer';
import { MedicalDisclaimer } from '../MedicalDisclaimer';

interface Props {
  onCallSamu: () => void;
  onOpenCPR: () => void;
  onBack?: () => void;
}

export const SeizureGuide: React.FC<Props> = ({ onCallSamu, onOpenCPR, onBack }) => {
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
        <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wide bg-amber-950 px-2.5 py-1 rounded-full border border-amber-800 ml-auto">
          Condição Cadastrada
        </span>
      </div>

      {/* Main Title Banner */}
      <div className="bg-amber-600 text-slate-950 rounded-3xl p-5 shadow-2xl space-y-2">
        <div className="flex items-center gap-2">
          <Activity className="w-7 h-7 text-slate-950" />
          <h1 className="text-2xl font-black uppercase tracking-tight">🚨 CONVULSÃO / CRISE</h1>
        </div>
        <p className="text-sm font-bold bg-black/15 p-3 rounded-2xl border border-black/20 leading-relaxed text-slate-950">
          Mantenha a calma. A maioria das convulsões dura de 1 a 3 minutos. O mais importante é proteger a cabeça da pessoa.
        </p>
      </div>

      {/* Automatic Seizure Timer */}
      <SeizureTimer onCallSamu={onCallSamu} />

      {/* What to DO */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3.5 shadow-xl">
        <h2 className="text-base font-black text-white flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          O que fazer IMEDIATAMENTE:
        </h2>

        <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
          <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-xs uppercase">
            <Shield className="w-4 h-4" /> 1. Proteger de objetos ao redor
          </div>
          <p className="text-sm text-slate-200 font-medium">
            Afaste mesas, cadeiras, quinas ou objetos pontiagudos que possam causar ferimentos durante as contrações.
          </p>
        </div>

        <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
          <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-xs uppercase">
            <Shield className="w-4 h-4" /> 2. Apoiar a cabeça suavemente
          </div>
          <p className="text-sm text-slate-200 font-medium">
            Coloque uma almofada, blusa dobrada ou casaco sob a cabeça para amortecer o impacto contra o chão.
          </p>
        </div>
      </div>

      {/* What NOT to do (CRITICAL FOR LAYPERSONS) */}
      <div className="bg-red-950/40 border-2 border-red-500/60 rounded-3xl p-5 space-y-3 text-red-100 shadow-xl">
        <h2 className="text-base font-black text-white flex items-center gap-2">
          <XCircle className="w-5 h-5 text-red-400" />
          NUNCA FAÇA ISSO (Riscos Graves):
        </h2>

        <div className="space-y-2 text-xs sm:text-sm font-semibold text-red-200">
          <div className="p-2.5 bg-black/40 rounded-xl border border-red-800/40">
            ❌ <strong>NÃO tente segurar a pessoa à força</strong> ou impedir os movimentos.
          </div>
          <div className="p-2.5 bg-black/40 rounded-xl border border-red-800/40">
            ❌ <strong>NÃO coloque nada dentro da boca</strong> (nem colher, dedos, pano ou remédio). A língua não enrola.
          </div>
          <div className="p-2.5 bg-black/40 rounded-xl border border-red-800/40">
            ❌ <strong>NÃO ofereça comida, bebida ou medicamentos</strong> durante a crise ou enquanto a pessoa estiver sonolenta.
          </div>
        </div>
      </div>

      {/* Post-crisis instructions */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-2.5 text-xs text-slate-300">
        <h3 className="text-sm font-black text-white">Quando os movimentos pararem:</h3>
        <p className="leading-relaxed">
          1. <strong>Vire a pessoa de lado</strong> (posição lateral de segurança) para desobstruir as vias aéreas caso ela salive ou vomite.
        </p>
        <p className="leading-relaxed">
          2. Permaneça ao lado dela confortando-a. É normal que fique confusa, desorientada ou com sono após a crise.
        </p>
      </div>

      {/* Escalation to CPR */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 space-y-2">
        <div className="flex items-center gap-2 text-slate-300">
          <AlertOctagon className="w-5 h-5 text-red-400" />
          <h3 className="text-xs font-black uppercase tracking-wide text-white">
            Se a crise passar e a pessoa NÃO voltar a respirar:
          </h3>
        </div>
        <button
          type="button"
          onClick={onOpenCPR}
          className="w-full py-3 bg-red-600 hover:bg-red-500 text-white rounded-2xl font-black text-xs uppercase tracking-tight flex items-center justify-center gap-2"
        >
          🚨 ABRIR GUIA DE PARADA CARDÍACA (RCP)
        </button>
      </div>

      <MedicalDisclaimer compact />
    </div>
  );
};
