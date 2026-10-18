import React, { useState } from 'react';
import { ArrowLeft, Sparkles, Trash2, Volume2, ShieldAlert, Check, RefreshCcw, Info } from 'lucide-react';
import { UserProfile } from '../types';
import { soundManager } from '../utils/audio';
import { MedicalDisclaimer } from '../components/MedicalDisclaimer';

interface Props {
  profile: UserProfile;
  onLoadDemo: () => void;
  onReset: () => void;
  onBack: () => void;
}

export const SettingsScreen: React.FC<Props> = ({ profile, onLoadDemo, onReset, onBack }) => {
  const [feedback, setFeedback] = useState<string>('');

  const handleTestMetronome = () => {
    soundManager.playCprClick(true);
    setTimeout(() => soundManager.playCprClick(false), 250);
    setTimeout(() => soundManager.playCprClick(false), 500);
    setFeedback('Som do metrônomo testado com sucesso!');
    setTimeout(() => setFeedback(''), 3000);
  };

  const handleTestChime = () => {
    soundManager.playAlertChime();
    setFeedback('Alarme sonoro de 5 minutos testado!');
    setTimeout(() => setFeedback(''), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800 border border-slate-700"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-sm font-black uppercase tracking-wider text-slate-300">
          CONFIGURAÇÕES
        </h1>
        <div className="w-9" />
      </div>

      {feedback && (
        <div className="p-3 bg-emerald-950/80 border border-emerald-500 rounded-2xl text-xs text-emerald-200 font-bold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          {feedback}
        </div>
      )}

      {/* Demo Profile Tools */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3">
        <span className="text-xs font-black uppercase text-amber-400 tracking-wider">
          Dados do Protótipo & Demonstração
        </span>
        <p className="text-xs text-slate-300">
          Você pode carregar um perfil de teste pré-configurado com histórico cardíaco e contatos para simulação imediata.
        </p>

        <div className="pt-1 flex flex-col gap-2">
          <button
            type="button"
            onClick={() => {
              onLoadDemo();
              setFeedback('Perfil de demonstração carregado com sucesso!');
              setTimeout(() => setFeedback(''), 3000);
            }}
            className="w-full py-3 px-4 bg-slate-800 hover:bg-slate-750 text-slate-200 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 border border-slate-700"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Carregar Perfil de Demonstração (Carlos Eduardo, 54a)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (window.confirm('Deseja realmente limpar todos os dados do perfil local?')) {
                onReset();
                setFeedback('Dados locais redefinidos.');
                setTimeout(() => setFeedback(''), 3000);
              }
            }}
            className="w-full py-3 px-4 bg-red-950/40 hover:bg-red-900/60 text-red-300 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 border border-red-800/40"
          >
            <Trash2 className="w-4 h-4 text-red-400" />
            <span>Limpar Dados e Reiniciar Cadastro</span>
          </button>
        </div>
      </div>

      {/* Audio & Alert Tester */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3">
        <span className="text-xs font-black uppercase text-slate-300 tracking-wider flex items-center gap-1.5">
          <Volume2 className="w-4 h-4 text-slate-400" /> Feedback Sonoro
        </span>
        <p className="text-xs text-slate-300">
          Sons sintetizados nativamente no navegador para auxílio visual e tátil durante a emergência:
        </p>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            onClick={handleTestMetronome}
            className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold border border-slate-700 flex items-center justify-center gap-1.5"
          >
            Testar Metrônomo
          </button>

          <button
            type="button"
            onClick={handleTestChime}
            className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold border border-slate-700 flex items-center justify-center gap-1.5"
          >
            Testar Alarme 5min
          </button>
        </div>
      </div>

      {/* Principles & Architecture Statement */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-2 text-xs text-slate-300">
        <div className="flex items-center gap-2 font-bold text-white text-sm">
          <Info className="w-4 h-4 text-red-400" />
          Sobre o Aplicativo PRONTO SOCORRO
        </div>
        <p className="leading-relaxed">
          Desenvolvido com foco exclusivo na experiência de <strong>pessoas leigas em pânico</strong>. Arquitetura voltada para redução drástica de tomada de decisão em situações de estresse.
        </p>
        <p className="leading-relaxed text-slate-400">
          • Referência de emergência nacional: <strong>SAMU 192</strong><br />
          • Diretrizes internacionais de RCP: 100 a 120 compressões/minuto<br />
          • Tratamento estrito de dados sensíveis de saúde offline no dispositivo
        </p>
      </div>

      <MedicalDisclaimer />
    </div>
  );
};
