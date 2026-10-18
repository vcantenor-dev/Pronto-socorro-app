import React from 'react';
import { Shield, ArrowRight, HeartPulse, Sparkles, CheckCircle2 } from 'lucide-react';
import { MedicalDisclaimer } from '../components/MedicalDisclaimer';

interface Props {
  onStartRegistration: () => void;
  onUseDemoProfile: () => void;
  onSkipToHome: () => void;
}

export const PresentationScreen: React.FC<Props> = ({
  onStartRegistration,
  onUseDemoProfile,
  onSkipToHome,
}) => {
  return (
    <div className="space-y-6 py-2">
      {/* Brand & Badge */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-red-600 shadow-2xl shadow-red-600/40 text-white mx-auto border-2 border-red-400">
          <HeartPulse className="w-11 h-11 animate-pulse" />
        </div>

        <div>
          <span className="text-[11px] font-black uppercase tracking-widest text-red-400 bg-red-950/80 px-3 py-1 rounded-full border border-red-800">
            PRIMEIROS SOCORROS LEIGOS
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white mt-2 tracking-tight">
            PRONTO SOCORRO
          </h1>
          <p className="text-sm text-slate-300 max-w-sm mx-auto mt-1 leading-relaxed">
            Acionamento rápido de emergência e instruções passo a passo para pessoas sem formação médica.
          </p>
        </div>
      </div>

      {/* Core Highlights (3 clean bullets) */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3.5 shadow-xl">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-red-950 border border-red-800/80 text-red-400 flex items-center justify-center shrink-0 font-bold text-sm">
            🚨
          </div>
          <div>
            <h2 className="text-sm font-black text-white">Botão de Emergência Rápido</h2>
            <p className="text-xs text-slate-300">
              Aciona socorro SAMU 192, captura sua localização e exibe sua ficha médica em 1 toque.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-950 border border-emerald-800/80 text-emerald-400 flex items-center justify-center shrink-0 font-bold text-sm">
            🩺
          </div>
          <div>
            <h2 className="text-sm font-black text-white">Guias Visuais para Leigos</h2>
            <p className="text-xs text-slate-300">
              Passo a passo simples para parada cardíaca com metrônomo de RCP, crises de asma, convulsões com cronômetro e alergias.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-blue-950 border border-blue-800/80 text-blue-400 flex items-center justify-center shrink-0 font-bold text-sm">
            📍
          </div>
          <div>
            <h2 className="text-sm font-black text-white">Localização e Contatos</h2>
            <p className="text-xs text-slate-300">
              Coordenadas de GPS imediatas e mensagem de emergência formatada para sua família.
            </p>
          </div>
        </div>
      </div>

      {/* Primary Actions */}
      <div className="space-y-3 pt-2">
        <button
          type="button"
          onClick={onStartRegistration}
          className="w-full py-4 px-6 bg-red-600 hover:bg-red-500 text-white rounded-2xl font-black text-base flex items-center justify-center gap-3 shadow-xl shadow-red-600/40 transition-transform active:scale-95"
        >
          <span>CRIAR MEU PERFIL DE EMERGÊNCIA</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={onUseDemoProfile}
          className="w-full py-3.5 px-6 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 border border-slate-700"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Testar com Perfil Pronto (Demonstração)</span>
        </button>

        <div className="text-center">
          <button
            type="button"
            onClick={onSkipToHome}
            className="text-xs text-slate-400 hover:text-slate-200 underline underline-offset-4 py-1 font-medium"
          >
            Ir direto para o Botão de Emergência
          </button>
        </div>
      </div>

      <MedicalDisclaimer />
    </div>
  );
};
