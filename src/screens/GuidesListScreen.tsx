import React from 'react';
import { ArrowLeft, BookOpen, ShieldAlert, HeartPulse, Wind, Activity, Droplet, ChevronRight } from 'lucide-react';
import { ScreenName } from '../types';
import { MedicalDisclaimer } from '../components/MedicalDisclaimer';

interface Props {
  onSelectGuide: (guideScreen: ScreenName) => void;
  onBack: () => void;
}

export const GuidesListScreen: React.FC<Props> = ({ onSelectGuide, onBack }) => {
  const GUIDES = [
    {
      screen: 'guide_cpr' as ScreenName,
      title: '💓 Treino de RCP (Massagem Cardíaca)',
      subtitle: 'Metrônomo de 110 bpm • Ritmo e passos imediatos',
      color: 'bg-red-600',
      badge: 'Principal',
      icon: <ShieldAlert className="w-5 h-5 text-red-400" />,
    },
    {
      screen: 'guide_heart_attack' as ScreenName,
      title: '🫀 Ataque Cardíaco / Infarto',
      subtitle: 'Dor no peito, falta de ar, suor frio • Posição e repouso',
      color: 'bg-red-950',
      badge: 'Urgente',
      icon: <HeartPulse className="w-5 h-5 text-red-400" />,
    },
    {
      screen: 'guide_asthma' as ScreenName,
      title: '🫁 Crise de Asma / Falta de Ar',
      subtitle: 'Dificuldade para respirar • Auxílio com medicação prescrita',
      color: 'bg-sky-950',
      badge: 'Atenção',
      icon: <Wind className="w-5 h-5 text-sky-400" />,
    },
    {
      screen: 'guide_seizure' as ScreenName,
      title: '⚡ Convulsão / Epilepsia',
      subtitle: 'Proteção de objetos • Cronômetro automático e regra de 5min',
      color: 'bg-amber-950',
      badge: 'Cronômetro',
      icon: <Activity className="w-5 h-5 text-amber-400" />,
    },
    {
      screen: 'guide_anaphylaxis' as ScreenName,
      title: '🚨 Alergia Grave / Anafilaxia',
      subtitle: 'Inchaço importante, falta de ar, desmaio • Epinefrina prescrita',
      color: 'bg-rose-950',
      badge: 'Grave',
      icon: <ShieldAlert className="w-5 h-5 text-rose-400" />,
    },
    {
      screen: 'guide_diabetes' as ScreenName,
      title: '🩸 Emergência no Diabetes',
      subtitle: 'Pessoa lúcida vs. inconsciente • Cuidados com via oral',
      color: 'bg-blue-950',
      badge: 'Alerta',
      icon: <Droplet className="w-5 h-5 text-blue-400" />,
    },
  ];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800 border border-slate-700"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-sm font-black uppercase tracking-wider text-slate-300">
          GUIAS DE PRIMEIROS SOCORROS
        </h1>
        <div className="w-9" />
      </div>

      <div>
        <h2 className="text-xl font-black text-white">Instruções Passo a Passo</h2>
        <p className="text-xs text-slate-400 mt-1">
          Toque em qualquer guia para abrir instruções simples e diretas com ilustrações e temporizadores.
        </p>
      </div>

      {/* Guides List */}
      <div className="space-y-2.5">
        {GUIDES.map((item) => (
          <button
            key={item.screen}
            type="button"
            onClick={() => onSelectGuide(item.screen)}
            className="w-full text-left p-4 bg-slate-900 hover:bg-slate-850 active:bg-slate-800 border border-slate-800 rounded-3xl flex items-center justify-between gap-3 transition-all group shadow-md"
          >
            <div className="flex items-start gap-3 min-w-0">
              <div className="w-10 h-10 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                {item.icon}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-black text-white text-sm truncate">{item.title}</h3>
                  <span className="text-[9px] font-black uppercase bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded border border-slate-700 shrink-0">
                    {item.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5 leading-snug">{item.subtitle}</p>
              </div>
            </div>

            <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-white shrink-0 transition-colors" />
          </button>
        ))}
      </div>

      <MedicalDisclaimer compact />
    </div>
  );
};
