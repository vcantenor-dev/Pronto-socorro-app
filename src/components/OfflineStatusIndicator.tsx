import React, { useState } from 'react';
import { Wifi, WifiOff, CheckCircle2, ShieldCheck, Info, X } from 'lucide-react';
import { useNetworkStatus } from '../utils/useNetworkStatus';

interface Props {
  compact?: boolean;
}

export const OfflineStatusIndicator: React.FC<Props> = ({ compact = false }) => {
  const { isOnline } = useNetworkStatus();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className={`w-full flex items-center justify-between transition-all rounded-xl border px-3 py-1.5 text-left ${
          !isOnline
            ? 'bg-amber-950/80 border-amber-500/70 text-amber-200 shadow-md'
            : 'bg-emerald-950/60 border-emerald-600/50 text-emerald-200'
        }`}
        title="Toque para ver informações sobre o modo offline"
      >
        <div className="flex items-center gap-2 min-w-0">
          {!isOnline ? (
            <div className="w-5 h-5 rounded-full bg-amber-500/30 flex items-center justify-center shrink-0 text-amber-400">
              <WifiOff className="w-3.5 h-3.5" />
            </div>
          ) : (
            <div className="w-5 h-5 rounded-full bg-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
          )}

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${!isOnline ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
              <span className="text-[11px] font-black uppercase tracking-wider">
                {!isOnline ? 'Modo Offline Ativo' : 'Modo Offline Disponível'}
              </span>
            </div>
            <p className="text-[10px] text-slate-300 font-medium truncate">
              {!isOnline
                ? 'Sem conexão • Guias e RCP funcionando 100% no aparelho'
                : 'Guias e RCP salvos no aparelho • Funcionam sem internet'}
            </p>
          </div>
        </div>

        <span className="text-[10px] font-bold text-slate-400 hover:text-white underline shrink-0 ml-1">
          Saiba mais
        </span>
      </button>

      {/* Offline Explanation Modal */}
      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-150"
        >
          <div className="bg-slate-900 border-2 border-emerald-500 rounded-3xl max-w-sm w-full p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">Disponibilidade Offline</h3>
                  <p className="text-xs text-emerald-400 font-bold">100% Funcional sem Internet</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-200">
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <p>
                  <strong>Todos os guias de primeiros socorros</strong> (queimaduras, sangramentos, engasgo, fraturas, etc.) estão salvos diretamente no seu aparelho.
                </p>
              </div>

              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <p>
                  <strong>O Metrônomo de RCP de 110 bpm e áudios</strong> continuam funcionando normalmente sem qualquer conexão de dados ou Wi-Fi.
                </p>
              </div>

              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <p>
                  <strong>Sua ficha de emergência e contatos</strong> ficam gravados na memória local do celular e não dependem de servidores externos.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black text-xs uppercase tracking-wider shadow-lg"
            >
              Entendi, continuar
            </button>
          </div>
        </div>
      )}
    </>
  );
};
