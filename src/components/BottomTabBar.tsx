import React from 'react';
import { ScreenName } from '../types';
import { HeartPulse, User, PhoneCall, BookOpen } from 'lucide-react';

interface Props {
  currentScreen: ScreenName;
  onNavigate: (screen: ScreenName) => void;
  onQuickCallSamu: () => void;
}

export const BottomTabBar: React.FC<Props> = ({
  currentScreen,
  onNavigate,
  onQuickCallSamu,
}) => {
  const isHomeActive = currentScreen === 'home';
  const isCPRActive = currentScreen === 'guide_cpr';
  const isAccidentsActive =
    currentScreen === 'accidents_tab' || currentScreen === 'accident_detail';
  const isProfileActive =
    currentScreen === 'emergency_profile' ||
    currentScreen === 'emergency_contacts' ||
    currentScreen === 'settings' ||
    currentScreen === 'guides_list';

  return (
    <nav
      aria-label="Navegação Principal"
      className="w-full bg-slate-950/95 backdrop-blur-md border-t border-slate-800/80 px-1 py-1.5 flex items-center justify-around shrink-0 z-20"
    >
      {/* Tab 1: 🚨 Emergência */}
      <button
        type="button"
        onClick={() => onNavigate('home')}
        className={`flex-1 flex flex-col items-center justify-center py-1 px-1 rounded-2xl transition-all ${
          isHomeActive
            ? 'text-red-400 bg-red-950/50 font-black'
            : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <div className="relative">
          <span className="text-xl">🚨</span>
          {isHomeActive && (
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-red-500 rounded-full" />
          )}
        </div>
        <span className="text-[10px] mt-0.5 tracking-tight font-bold">Emergência</span>
      </button>

      {/* Tab 2: 💓 Treino RCP (DESTAQUE PRINCIPAL) */}
      <button
        type="button"
        onClick={() => onNavigate('guide_cpr')}
        className={`flex-1 flex flex-col items-center justify-center py-1 px-1 rounded-2xl transition-all ${
          isCPRActive
            ? 'text-rose-400 bg-rose-950/60 font-black ring-1 ring-rose-500/50'
            : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <div className="relative">
          <HeartPulse className={`w-5 h-5 ${isCPRActive ? 'text-rose-400 animate-pulse' : 'text-slate-400'}`} />
          {isCPRActive && (
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-rose-500 rounded-full" />
          )}
        </div>
        <span className="text-[10px] mt-0.5 tracking-tight font-black uppercase text-rose-300">Treino RCP</span>
      </button>

      {/* Tab 3: 🚑 Acidentes */}
      <button
        type="button"
        onClick={() => onNavigate('accidents_tab')}
        className={`flex-1 flex flex-col items-center justify-center py-1 px-1 rounded-2xl transition-all ${
          isAccidentsActive
            ? 'text-amber-300 bg-amber-950/50 font-black ring-1 ring-amber-500/40'
            : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <div className="relative">
          <span className="text-xl">🚑</span>
          {isAccidentsActive && (
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-amber-400 rounded-full" />
          )}
        </div>
        <span className="text-[10px] mt-0.5 tracking-tight font-black uppercase">Acidentes</span>
      </button>

      {/* Tab 4: 👤 Minha Ficha */}
      <button
        type="button"
        onClick={() => onNavigate('emergency_profile')}
        className={`flex-1 flex flex-col items-center justify-center py-1 px-1 rounded-2xl transition-all ${
          isProfileActive
            ? 'text-emerald-400 bg-emerald-950/50 font-black'
            : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <div className="relative">
          <User className="w-5 h-5" />
          {isProfileActive && (
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-emerald-400 rounded-full" />
          )}
        </div>
        <span className="text-[10px] mt-0.5 tracking-tight font-bold">Ficha</span>
      </button>
    </nav>
  );
};
