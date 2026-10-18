import React from 'react';
import { FileText, Users, Settings, BookOpen, HeartPulse, ChevronRight } from 'lucide-react';
import { UserProfile } from '../types';
import { HEALTH_CONDITIONS_META } from '../utils/storage';
import { MedicalDisclaimer } from '../components/MedicalDisclaimer';

interface Props {
  profile: UserProfile;
  onPressEmergency: () => void;
  onPressThirdPartyEmergency?: () => void;
  onOpenProfile: () => void;
  onOpenContacts: () => void;
  onOpenSettings: () => void;
  onOpenGuidesList: () => void;
  onOpenAccidents: () => void;
  onOpenCPR: () => void;
}

export const HomeScreen: React.FC<Props> = ({
  profile,
  onPressEmergency,
  onPressThirdPartyEmergency,
  onOpenProfile,
  onOpenContacts,
  onOpenSettings,
  onOpenGuidesList,
  onOpenAccidents,
  onOpenCPR,
}) => {
  return (
    <div className="flex flex-col min-h-[78vh] justify-between space-y-5 py-2">
      {/* Top Patient Glance */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-3.5 flex items-center justify-between shadow-lg">
        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Sistema Ativo</span>
          </div>
          <p className="text-sm font-black text-white">
            {profile.fullName || 'Ficha em branco'}
          </p>
          <div className="flex flex-wrap gap-1 mt-0.5">
            {profile.conditions && profile.conditions.length > 0 ? (
              profile.conditions.map((c) => (
                <span
                  key={c}
                  className="text-[10px] font-bold bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded border border-slate-700"
                >
                  {HEALTH_CONDITIONS_META[c]?.label.split('/')[0] || c}
                </span>
              ))
            ) : (
              <span className="text-[10px] text-slate-400 italic">Sem condições cadastradas</span>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenProfile}
          className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-2xl border border-slate-700 text-slate-200 text-xs font-bold flex flex-col items-center gap-1 shrink-0"
          title="Ver ficha"
        >
          <FileText className="w-4 h-4 text-red-400" />
          <span className="text-[10px]">Ficha</span>
        </button>
      </div>

      {/* CENTER: THE GIANT EMERGENCY BUTTON */}
      <div className="flex flex-col items-center justify-center py-2 my-auto text-center space-y-4">
        <div className="relative flex items-center justify-center">
          <div className="absolute w-60 h-60 sm:w-68 sm:h-68 rounded-full bg-red-600/20 animate-ping opacity-60 pointer-events-none" />
          <div className="absolute w-52 h-52 sm:w-60 sm:h-60 rounded-full bg-red-500/15 animate-pulse pointer-events-none" />

          <button
            id="emergency-main-button"
            type="button"
            onClick={onPressEmergency}
            className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-gradient-to-b from-red-500 via-red-600 to-red-700 text-white shadow-2xl shadow-red-600/60 border-4 border-red-300 flex flex-col items-center justify-center text-center transition-all duration-150 transform hover:scale-105 active:scale-95 group focus:outline-none focus:ring-8 focus:ring-red-400/50"
            aria-label="Acionar Botão de Emergência"
          >
            <span className="text-4xl sm:text-5xl mb-1 filter drop-shadow-md group-hover:scale-110 transition-transform">
              🚨
            </span>
            <span className="text-xl sm:text-2xl font-black tracking-wider uppercase drop-shadow-md">
              EMERGÊNCIA
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-red-100/90 mt-0.5">
              Toque para Acionar
            </span>
          </button>
        </div>

        <p className="text-xs sm:text-sm font-bold text-red-300 bg-red-950/60 px-4 py-1.5 rounded-2xl border border-red-800/60 max-w-xs shadow-inner">
          Toque somente em uma emergência.
        </p>

        {/* BOTÃO RÁPIDO PARA EMERGÊNCIA DE TERCEIRO / ACIDENTE */}
        {onPressThirdPartyEmergency && (
          <button
            type="button"
            onClick={onPressThirdPartyEmergency}
            className="w-full max-w-xs py-2.5 px-4 bg-slate-900/95 hover:bg-slate-800 active:scale-95 border-2 border-amber-500/60 rounded-2xl flex items-center justify-between gap-2 shadow-lg group transition-all"
          >
            <div className="flex items-center gap-2.5 text-left">
              <span className="text-xl">🚑</span>
              <div>
                <span className="text-xs font-black uppercase text-amber-300 block">
                  Emergência de Outra Pessoa?
                </span>
                <span className="text-[11px] text-slate-300 block font-medium">
                  Socorro a Terceiro / Acidentes
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform shrink-0" />
          </button>
        )}
      </div>

      {/* BOTTOM NAV / ACCESS TILES */}
      <div className="space-y-2.5">
        {/* CARD 1: TREINAMENTO DE RCP (DESTAQUE PRINCIPAL) */}
        <button
          type="button"
          onClick={onOpenCPR}
          className="w-full p-3.5 bg-gradient-to-r from-red-950 via-rose-950 to-slate-900 hover:from-red-900 hover:to-slate-850 active:bg-slate-800 rounded-3xl border-2 border-red-500 flex items-center justify-between gap-3 text-left transition-all shadow-xl group"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-2xl bg-red-600/30 border border-red-500/50 text-red-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <HeartPulse className="w-6 h-6 animate-pulse" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-black uppercase text-rose-300 bg-red-600 px-2 py-0.2 rounded-full text-white">
                  PRINCIPAL
                </span>
                <span className="text-[10px] font-black text-red-300">110 BPM</span>
              </div>
              <p className="text-sm font-black text-white truncate">Treinamento de RCP (Massagem Cardíaca)</p>
              <p className="text-[11px] text-slate-300 truncate">Metrônomo interativo e socorro imediato</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-red-400 group-hover:translate-x-1 transition-transform shrink-0" />
        </button>

        {/* CARD 2: ACIDENTES E TRAUMAS */}
        <button
          type="button"
          onClick={onOpenAccidents}
          className="w-full p-3.5 bg-gradient-to-r from-amber-950/70 via-slate-900 to-slate-900 hover:from-amber-950/90 hover:to-slate-850 active:bg-slate-800 rounded-3xl border-2 border-amber-500/50 flex items-center justify-between gap-3 text-left transition-all shadow-md group"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0 text-xl group-hover:scale-110 transition-transform">
              🚑
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-black uppercase text-amber-400 bg-amber-500/30 px-2 py-0.2 rounded-full border border-amber-500/40">
                  ACIDENTES
                </span>
              </div>
              <p className="text-sm font-black text-white truncate">Corte, Fratura, Queimadura, Engasgo...</p>
              <p className="text-[11px] text-slate-400 truncate">Ações diretas do que fazer e não fazer</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-amber-400 group-hover:translate-x-1 transition-transform shrink-0" />
        </button>

        {/* Secondary Tiles */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={onOpenProfile}
            className="p-3 bg-slate-900/90 hover:bg-slate-850 active:bg-slate-800 rounded-2xl border border-slate-800 flex items-center gap-2.5 text-left transition-all shadow-sm group"
          >
            <div className="w-8 h-8 rounded-xl bg-red-950/80 border border-red-800/60 text-red-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <FileText className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-black text-white uppercase truncate">Minha ficha</p>
              <p className="text-[10px] text-slate-400 truncate">Dados médicos</p>
            </div>
          </button>

          <button
            type="button"
            onClick={onOpenContacts}
            className="p-3 bg-slate-900/90 hover:bg-slate-850 active:bg-slate-800 rounded-2xl border border-slate-800 flex items-center gap-2.5 text-left transition-all shadow-sm group"
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Users className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-black text-white uppercase truncate">Contatos</p>
              <p className="text-[10px] text-slate-400 truncate">Pessoas de apoio</p>
            </div>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={onOpenGuidesList}
            className="p-2.5 bg-slate-900/80 hover:bg-slate-850 active:bg-slate-800 rounded-2xl border border-slate-800 flex items-center gap-2 text-left text-xs font-bold text-slate-300"
          >
            <BookOpen className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="truncate">Todos os Guias</span>
          </button>

          <button
            type="button"
            onClick={onOpenSettings}
            className="p-2.5 bg-slate-900/80 hover:bg-slate-850 active:bg-slate-800 rounded-2xl border border-slate-800 flex items-center gap-2 text-left text-xs font-bold text-slate-300"
          >
            <Settings className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="truncate">Configurações</span>
          </button>
        </div>

        <MedicalDisclaimer compact />
      </div>
    </div>
  );
};
