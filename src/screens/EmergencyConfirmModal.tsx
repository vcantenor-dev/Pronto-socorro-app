import React from 'react';
import { AlertOctagon, X, PhoneCall, HeartPulse } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  onDirectCPR?: () => void;
  onThirdPartyConfirm?: () => void;
}

export const EmergencyConfirmModal: React.FC<Props> = ({
  isOpen,
  onCancel,
  onConfirm,
  onDirectCPR,
  onThirdPartyConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-sm bg-slate-900 border-2 border-red-500 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4 text-center">
        <div className="w-16 h-16 rounded-full bg-red-600/30 border border-red-500 flex items-center justify-center mx-auto text-red-400">
          <AlertOctagon className="w-10 h-10 animate-bounce text-red-500" />
        </div>

        <div className="space-y-1">
          <h2 className="text-3xl font-black text-white tracking-tight uppercase">
            EMERGÊNCIA?
          </h2>
          <p className="text-base sm:text-lg font-bold text-slate-200">
            Quem precisa de socorro agora?
          </p>
        </div>

        <div className="space-y-2 pt-1">
          {/* SIM, MINHA EMERGÊNCIA (PESSOAL) */}
          <button
            type="button"
            onClick={onConfirm}
            className="w-full py-3.5 px-4 bg-red-600 hover:bg-red-500 active:scale-95 text-white rounded-2xl font-black text-base uppercase tracking-wide shadow-xl shadow-red-600/50 flex items-center justify-center gap-2 transition-transform"
          >
            <PhoneCall className="w-5 h-5 animate-pulse" />
            <div className="text-left">
              <span className="block leading-tight">MINHA EMERGÊNCIA (192)</span>
              <span className="text-[11px] font-medium text-red-100 normal-case block">Usa minha ficha médica cadastrada</span>
            </div>
          </button>

          {/* EMERGÊNCIA DE TERCEIRO / ACIDENTE */}
          {onThirdPartyConfirm && (
            <button
              type="button"
              onClick={onThirdPartyConfirm}
              className="w-full py-3.5 px-4 bg-amber-600 hover:bg-amber-500 active:scale-95 text-white rounded-2xl font-black text-base uppercase tracking-wide shadow-xl shadow-amber-600/40 border border-amber-400 flex items-center justify-center gap-2 transition-transform"
            >
              <span className="text-2xl">🚑</span>
              <div className="text-left">
                <span className="block leading-tight">OUTRA PESSOA / ACIDENTE</span>
                <span className="text-[11px] font-medium text-amber-100 normal-case block">Corte, Fratura, Queimadura, Engasgo</span>
              </div>
            </button>
          )}

          {/* IR DIRETO AO RCP (PARADA CARDÍACA) */}
          {onDirectCPR && (
            <button
              type="button"
              onClick={onDirectCPR}
              className="w-full py-3 px-4 bg-rose-700 hover:bg-rose-600 active:scale-95 text-white rounded-2xl font-black text-sm uppercase tracking-wide shadow-lg border border-rose-400 flex items-center justify-center gap-2 transition-transform"
            >
              <HeartPulse className="w-5 h-5 text-white animate-bounce shrink-0" />
              <span>NÃO RESPIRA? IR DIRETO AO RCP</span>
            </button>
          )}

          {/* CANCELAR */}
          <button
            type="button"
            onClick={onCancel}
            className="w-full py-2.5 px-6 bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-300 rounded-2xl font-bold text-xs uppercase tracking-wider border border-slate-700 flex items-center justify-center gap-2 transition-transform"
          >
            <X className="w-4 h-4" />
            <span>CANCELAR</span>
          </button>
        </div>
      </div>
    </div>
  );
};
