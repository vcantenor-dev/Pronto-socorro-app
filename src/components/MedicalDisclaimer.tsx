import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  compact?: boolean;
}

export const MedicalDisclaimer: React.FC<Props> = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-slate-300 flex items-center gap-2">
        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
        <span>
          Orientações básicas para leigos. <strong>Não substitui o SAMU 192</strong> ou atendimento médico.
        </span>
      </div>
    );
  }

  return (
    <div className="bg-amber-950/40 border border-amber-600/40 rounded-2xl p-4 text-xs text-amber-200/90 flex items-start gap-3 shadow-inner">
      <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
      <div className="space-y-1">
        <p className="font-semibold text-amber-300 text-sm">Aviso Importante de Segurança</p>
        <p className="leading-relaxed">
          Este aplicativo fornece <strong>apenas orientações básicas de primeiros socorros</strong> para pessoas leigas e não substitui avaliação médica, enfermeiro ou equipe do SAMU. Em qualquer situação de dúvida ou gravidade, ligue imediatamente para o <strong>SAMU 192</strong>.
        </p>
      </div>
    </div>
  );
};
