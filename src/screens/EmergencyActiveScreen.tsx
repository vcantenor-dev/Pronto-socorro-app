import React, { useState } from 'react';
import {
  PhoneCall,
  MapPin,
  Clock,
  User,
  HeartPulse,
  Share2,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  RefreshCw,
  X,
  AlertTriangle,
  ChevronRight,
  Copy,
} from 'lucide-react';
import { UserProfile, LocationData, HealthConditionKey, AccidentKey } from '../types';
import { HEALTH_CONDITIONS_META } from '../utils/storage';
import {
  formatEmergencyWhatsAppMessage,
  formatThirdPartyEmergencyWhatsAppMessage,
} from '../utils/location';
import { MedicalDisclaimer } from '../components/MedicalDisclaimer';

interface Props {
  profile: UserProfile;
  location: LocationData;
  emergencyTime: string;
  onCallSamu: () => void;
  onOpenGuide: (conditionKey?: HealthConditionKey) => void;
  onOpenCPR: () => void;
  onEndEmergency: () => void;
  onRefreshLocation: () => void;
  onOpenAccident: (key: AccidentKey) => void;
  initialVictimType?: 'self' | 'third_party';
}

export const EmergencyActiveScreen: React.FC<Props> = ({
  profile,
  location,
  emergencyTime,
  onCallSamu,
  onOpenGuide,
  onOpenCPR,
  onEndEmergency,
  onRefreshLocation,
  onOpenAccident,
  initialVictimType = 'self',
}) => {
  const [victimType, setVictimType] = useState<'self' | 'third_party'>(initialVictimType);
  const [copiedNotice, setCopiedNotice] = useState(false);
  const [copiedAddressNotice, setCopiedAddressNotice] = useState(false);
  const [showSamuNote, setShowSamuNote] = useState(false);

  // Quick triage checklist for third party
  const [isConscious, setIsConscious] = useState<boolean | null>(null);
  const [isBreathing, setIsBreathing] = useState<boolean | null>(null);
  const [hasHeavyBleeding, setHasHeavyBleeding] = useState<boolean | null>(null);

  // Primary condition for user
  const primaryCondition: HealthConditionKey =
    profile.conditions && profile.conditions.length > 0 ? profile.conditions[0] : 'heart';

  const conditionLabels =
    profile.conditions?.map((c) => HEALTH_CONDITIONS_META[c]?.label).join(', ') ||
    'Nenhuma condição informada';

  const handleShareWhatsApp = () => {
    const text =
      victimType === 'third_party'
        ? formatThirdPartyEmergencyWhatsAppMessage(
            profile.fullName,
            'Socorro a Terceiro / Acidente',
            location,
            emergencyTime
          )
        : formatEmergencyWhatsAppMessage(
            profile.fullName,
            conditionLabels,
            location,
            emergencyTime
          );

    const phoneClean = (profile.emergencyContactPhone || '').replace(/\D/g, '');
    const url = phoneClean
      ? `https://wa.me/55${phoneClean}?text=${encodeURIComponent(text)}`
      : `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleShareSMS = () => {
    const text =
      victimType === 'third_party'
        ? formatThirdPartyEmergencyWhatsAppMessage(
            profile.fullName,
            'Socorro a Terceiro / Acidente',
            location,
            emergencyTime
          )
        : formatEmergencyWhatsAppMessage(
            profile.fullName,
            conditionLabels,
            location,
            emergencyTime
          );

    const phoneClean = (profile.emergencyContactPhone || '').replace(/\D/g, '');
    window.location.href = `sms:${phoneClean}?body=${encodeURIComponent(text)}`;
  };

  const handleCopyText = () => {
    const text =
      victimType === 'third_party'
        ? formatThirdPartyEmergencyWhatsAppMessage(
            profile.fullName,
            'Socorro a Terceiro / Acidente',
            location,
            emergencyTime
          )
        : formatEmergencyWhatsAppMessage(
            profile.fullName,
            conditionLabels,
            location,
            emergencyTime
          );

    navigator.clipboard.writeText(text);
    setCopiedNotice(true);
    setTimeout(() => setCopiedNotice(false), 2500);
  };

  const handleCopyAddress = () => {
    if (location.addressDescription) {
      navigator.clipboard.writeText(location.addressDescription);
      setCopiedAddressNotice(true);
      setTimeout(() => setCopiedAddressNotice(false), 2000);
    }
  };

  return (
    <div className="space-y-4 pb-6">
      {/* Top Urgent Status Banner */}
      <div className="bg-red-600 text-white rounded-3xl p-4 sm:p-5 shadow-2xl space-y-3 border-2 border-red-400 animate-in fade-in">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-white animate-ping" />
            <span className="text-xs font-black uppercase tracking-widest text-red-100">
              MODO ATIVO
            </span>
          </div>
          <span className="text-xs font-mono font-bold bg-black/30 px-2.5 py-1 rounded-full flex items-center gap-1">
            <Clock className="w-3 h-3" /> {emergencyTime}
          </span>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
            🚨 EMERGÊNCIA ACIONADA
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-red-100">
            {victimType === 'third_party'
              ? 'Você está prestando socorro a outra pessoa.'
              : 'Mantenha a calma. Estamos com você.'}
          </p>
        </div>

        {/* SELECTOR: QUEM É A VÍTIMA? */}
        <div className="pt-1">
          <p className="text-[10px] font-black uppercase tracking-wider text-red-200 mb-1">
            Quem precisa de socorro?
          </p>
          <div className="grid grid-cols-2 p-1 bg-black/35 rounded-2xl border border-white/20 text-xs font-black">
            <button
              type="button"
              onClick={() => setVictimType('self')}
              className={`py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                victimType === 'self'
                  ? 'bg-white text-red-700 shadow-md scale-100'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <User className="w-4 h-4 shrink-0" />
              <span>EU MESMO (Ficha)</span>
            </button>
            <button
              type="button"
              onClick={() => setVictimType('third_party')}
              className={`py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                victimType === 'third_party'
                  ? 'bg-amber-400 text-slate-950 shadow-md scale-100 font-black'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <span className="text-base shrink-0">👥</span>
              <span>OUTRA PESSOA (Acidentes)</span>
            </button>
          </div>
        </div>
      </div>

      {/* DIRECT INSTANT RCP BUTTON (MÁXIMA PRIORIDADE EM QUALQUER EMERGÊNCIA) */}
      <button
        type="button"
        onClick={onOpenCPR}
        className="w-full py-4 px-4 bg-gradient-to-r from-red-600 via-rose-600 to-rose-700 hover:from-red-500 hover:to-rose-600 active:scale-95 text-white rounded-3xl font-black text-base sm:text-lg uppercase tracking-wide shadow-2xl shadow-red-600/60 border-2 border-red-300 flex items-center justify-center gap-3 transition-transform animate-pulse"
      >
        <HeartPulse className="w-7 h-7 shrink-0 text-white animate-bounce" />
        <span>VÍTIMA NÃO RESPIRA? INICIAR RCP AGORA</span>
      </button>

      {/* ACTION 1: CALL SAMU 192 (PRIMARY DIALER) */}
      <div className="bg-slate-900 border-2 border-red-500 rounded-3xl p-5 shadow-2xl space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-black uppercase text-red-400">Passo 1 • Imediato</span>
            <h2 className="text-lg font-black text-white">Ligar para o SAMU 192</h2>
            {victimType === 'third_party' && (
              <p className="text-[11px] text-amber-300 font-bold mt-0.5">
                Diga ao atendente: "Estou socorrendo outra pessoa vítima de acidente"
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onCallSamu}
            className="px-5 py-4 bg-red-600 hover:bg-red-500 active:scale-95 text-white rounded-2xl font-black text-base flex items-center gap-2 shadow-xl shadow-red-600/50 shrink-0"
          >
            <PhoneCall className="w-5 h-5 animate-pulse" />
            <span>LIGAR 192</span>
          </button>
        </div>

        {/* SAMU official notice */}
        <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-[11px] text-slate-300 space-y-1">
          <div className="flex items-center justify-between">
            <span className="font-bold text-amber-300">Nota sobre acionamento do SAMU:</span>
            <button
              type="button"
              onClick={() => setShowSamuNote(!showSamuNote)}
              className="text-slate-400 hover:text-white underline text-[10px]"
            >
              {showSamuNote ? 'Fechar' : 'Saiba mais'}
            </button>
          </div>
          <p>
            O aplicativo aciona o discador oficial do telefone para o número <strong>192</strong>.
          </p>
          {showSamuNote && (
            <p className="pt-1 text-slate-400 border-t border-slate-800/80 leading-relaxed">
              *A ligação por voz para o 192 é o canal oficial garantido em todo o território nacional. Informe o endereço completo e o estado da vítima.
            </p>
          )}
        </div>
      </div>

      {/* ======================================================== */}
      {/* MODE SPECIFIC CONTENT: THIRD PARTY VS SELF               */}
      {/* ======================================================== */}

      {victimType === 'third_party' ? (
        /* ================= THIRD PARTY / ACCIDENTS VIEW ================= */
        <div className="space-y-4">
          {/* CRITICAL WARNING BANNER */}
          <div className="p-4 bg-amber-950/80 border-2 border-amber-500 rounded-3xl space-y-1.5 shadow-xl">
            <div className="flex items-center gap-2 text-amber-400 font-black text-sm uppercase">
              <AlertTriangle className="w-5 h-5 shrink-0 animate-bounce" />
              <span>SOCORRO A OUTRA PESSOA (TERCEIRO)</span>
            </div>
            <p className="text-xs text-amber-100 font-medium leading-relaxed">
              <strong>Importante:</strong> Seus medicamentos e histórico de saúde <strong>NÃO</strong> são da vítima. Não informe seus dados pessoais como se fossem dela. Siga os guias de acidentes abaixo:
            </p>
          </div>

          {/* ACTION 2: ACCIDENT GUIDES SELECTION */}
          <div className="bg-slate-900 border-2 border-amber-500/80 rounded-3xl p-5 shadow-xl space-y-3">
            <div>
              <span className="text-xs font-black uppercase text-amber-400">Passo 2 • Ação Imediata</span>
              <h2 className="text-lg font-black text-white">O que aconteceu com a vítima?</h2>
              <p className="text-xs text-slate-300">
                Toque no acidente para ver o passo a passo direto do que fazer:
              </p>
            </div>

            {/* Quick Grid of Accidents */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {/* Sangramento Intenso */}
              <button
                type="button"
                onClick={() => onOpenAccident('severe_bleeding')}
                className="p-3.5 bg-red-950/70 hover:bg-red-900/90 active:scale-98 rounded-2xl border-2 border-red-500 text-left flex items-center justify-between gap-2 shadow-md transition-all group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-2xl shrink-0">🩸</span>
                  <div className="min-w-0">
                    <p className="text-xs font-black text-white uppercase truncate">Sangramento Intenso</p>
                    <p className="text-[11px] text-red-200 truncate">Apertar corte com pano limpo</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-red-400 group-hover:translate-x-1 transition-transform shrink-0" />
              </button>

              {/* Corte / Ferimento */}
              <button
                type="button"
                onClick={() => onOpenAccident('cut_wound')}
                className="p-3.5 bg-slate-950 hover:bg-slate-800 active:scale-98 rounded-2xl border border-slate-700 text-left flex items-center justify-between gap-2 shadow-md transition-all group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-2xl shrink-0">🩹</span>
                  <div className="min-w-0">
                    <p className="text-xs font-black text-white uppercase truncate">Corte / Ferimento</p>
                    <p className="text-[11px] text-slate-300 truncate">Lavar com água e cobrir</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform shrink-0" />
              </button>

              {/* Fratura / Luxação */}
              <button
                type="button"
                onClick={() => onOpenAccident('fracture_dislocation')}
                className="p-3.5 bg-slate-950 hover:bg-slate-800 active:scale-98 rounded-2xl border border-slate-700 text-left flex items-center justify-between gap-2 shadow-md transition-all group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-2xl shrink-0">🦴</span>
                  <div className="min-w-0">
                    <p className="text-xs font-black text-white uppercase truncate">Fratura / Luxação</p>
                    <p className="text-[11px] text-slate-300 truncate">Não alinhar o osso, imobilizar</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform shrink-0" />
              </button>

              {/* Queda / Trauma */}
              <button
                type="button"
                onClick={() => onOpenAccident('fall_trauma')}
                className="p-3.5 bg-slate-950 hover:bg-slate-800 active:scale-98 rounded-2xl border border-slate-700 text-left flex items-center justify-between gap-2 shadow-md transition-all group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-2xl shrink-0">🤕</span>
                  <div className="min-w-0">
                    <p className="text-xs font-black text-white uppercase truncate">Queda / Trauma</p>
                    <p className="text-[11px] text-slate-300 truncate">Não mexer pescoço ou coluna</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform shrink-0" />
              </button>

              {/* Queimadura */}
              <button
                type="button"
                onClick={() => onOpenAccident('burn')}
                className="p-3.5 bg-slate-950 hover:bg-slate-800 active:scale-98 rounded-2xl border border-slate-700 text-left flex items-center justify-between gap-2 shadow-md transition-all group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-2xl shrink-0">🔥</span>
                  <div className="min-w-0">
                    <p className="text-xs font-black text-white uppercase truncate">Queimadura</p>
                    <p className="text-[11px] text-slate-300 truncate">Água corrente por 15 min</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform shrink-0" />
              </button>

              {/* Engasgo */}
              <button
                type="button"
                onClick={() => onOpenAccident('choking')}
                className="p-3.5 bg-slate-950 hover:bg-slate-800 active:scale-98 rounded-2xl border border-slate-700 text-left flex items-center justify-between gap-2 shadow-md transition-all group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-2xl shrink-0">😮</span>
                  <div className="min-w-0">
                    <p className="text-xs font-black text-white uppercase truncate">Engasgo / Asfixia</p>
                    <p className="text-[11px] text-slate-300 truncate">Manobra de Heimlich imediata</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform shrink-0" />
              </button>

              {/* Choque Elétrico */}
              <button
                type="button"
                onClick={() => onOpenAccident('electric_shock')}
                className="p-3.5 bg-slate-950 hover:bg-slate-800 active:scale-98 rounded-2xl border border-slate-700 text-left flex items-center justify-between gap-2 shadow-md transition-all group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-2xl shrink-0">⚡</span>
                  <div className="min-w-0">
                    <p className="text-xs font-black text-white uppercase truncate">Choque Elétrico</p>
                    <p className="text-[11px] text-slate-300 truncate">Desligar chave antes de tocar</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform shrink-0" />
              </button>
            </div>
          </div>

          {/* QUICK TRIAGE CHECKLIST FOR CALL WITH SAMU 192 */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Triagem Rápida da Vítima (Para informar ao 192)
              </h3>
            </div>
            <p className="text-xs text-slate-400">
              Toque para marcar o estado da vítima e ter a resposta pronta para o atendente:
            </p>

            <div className="space-y-2 pt-1">
              {/* Question 1: Consciência */}
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800/80 flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-white">Vítima está consciente e responde?</span>
                <div className="flex gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsConscious(true)}
                    className={`px-3 py-1 rounded-xl text-xs font-black transition-colors ${
                      isConscious === true ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    SIM
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsConscious(false)}
                    className={`px-3 py-1 rounded-xl text-xs font-black transition-colors ${
                      isConscious === false ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    NÃO
                  </button>
                </div>
              </div>

              {/* Question 2: Respiração */}
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800/80 flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-white">Vítima respira normalmente?</span>
                <div className="flex gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsBreathing(true)}
                    className={`px-3 py-1 rounded-xl text-xs font-black transition-colors ${
                      isBreathing === true ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    SIM
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsBreathing(false);
                      onOpenCPR();
                    }}
                    className={`px-3 py-1 rounded-xl text-xs font-black transition-colors ${
                      isBreathing === false ? 'bg-red-600 text-white animate-pulse' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    NÃO (RCP)
                  </button>
                </div>
              </div>

              {/* Question 3: Sangramento Intenso */}
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800/80 flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-white">Há sangramento forte/jorrando?</span>
                <div className="flex gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setHasHeavyBleeding(true);
                      onOpenAccident('severe_bleeding');
                    }}
                    className={`px-3 py-1 rounded-xl text-xs font-black transition-colors ${
                      hasHeavyBleeding === true ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    SIM (Aperte)
                  </button>
                  <button
                    type="button"
                    onClick={() => setHasHeavyBleeding(false)}
                    className={`px-3 py-1 rounded-xl text-xs font-black transition-colors ${
                      hasHeavyBleeding === false ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    NÃO
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ================= SELF / PERSONAL HEALTH PROFILE VIEW ================= */
        <div className="space-y-4">
          {/* ACTION 2: OPEN FIRST AID GUIDE */}
          <div className="bg-slate-900 border-2 border-amber-500/80 rounded-3xl p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-black uppercase text-amber-400">Passo 2 • Orientação</span>
                <h2 className="text-lg font-black text-white">Guia de Primeiros Socorros</h2>
              </div>
              <button
                type="button"
                onClick={() => onOpenGuide(primaryCondition)}
                className="px-5 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-2xl font-black text-sm flex items-center gap-2 shadow-lg shadow-amber-500/30 shrink-0"
              >
                <BookOpen className="w-4 h-4" />
                <span>ABRIR GUIA</span>
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Guia sugerido com base na sua condição cadastrada:{' '}
              <strong className="text-amber-300">
                {HEALTH_CONDITIONS_META[primaryCondition]?.label || 'Primeiros Socorros'}
              </strong>
            </p>

            {/* Quick alternative guide buttons if patient has multiple */}
            <div className="pt-2 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => onOpenGuide('heart')}
                className="px-3 py-1.5 bg-red-950/80 hover:bg-red-900 border border-red-700/60 rounded-xl text-xs font-bold text-red-300"
              >
                🚨 Parada Cardíaca (RCP)
              </button>
              {profile.conditions?.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => onOpenGuide(c)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-xs font-bold text-slate-200"
                >
                  {HEALTH_CONDITIONS_META[c]?.label.split('/')[0]}
                </button>
              ))}
            </div>

            {/* DIRECT SHORTCUT TO THIRD PARTY ACCIDENTS */}
            <div className="pt-2 border-t border-slate-800/80">
              <button
                type="button"
                onClick={() => setVictimType('third_party')}
                className="w-full py-2.5 px-3 bg-slate-950 hover:bg-slate-800 border border-amber-500/40 rounded-xl text-xs font-bold text-amber-300 flex items-center justify-between"
              >
                <span>A emergência é um acidente com outra pessoa?</span>
                <span className="font-black text-amber-400 flex items-center gap-1">
                  Ver Acidentes <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </button>
            </div>
          </div>

          {/* INFORMAÇÕES DE EMERGÊNCIA (PESSOAIS DA FICHA) */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <h2 className="text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
                <HeartPulse className="w-5 h-5 text-red-500" />
                INFORMAÇÕES DE EMERGÊNCIA DO PACIENTE
              </h2>
              <span className="text-[10px] font-bold uppercase bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                Sua Ficha
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {/* NOME & IDADE */}
              <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800/90 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    NOME DO PACIENTE
                  </span>
                  <p className="text-xl font-black text-white">{profile.fullName || 'Não informado'}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    IDADE
                  </span>
                  <p className="text-xl font-black text-white">
                    {profile.age ? `${profile.age} anos` : '--'}
                  </p>
                </div>
              </div>

              {/* CONDIÇÃO CADASTRADA */}
              <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800/90 space-y-1">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                  CONDIÇÃO OU CONDIÇÕES CADASTRADAS
                </span>
                <p className="text-base font-black text-amber-200">{conditionLabels}</p>
                {profile.otherConditionText && (
                  <p className="text-xs text-slate-300 italic">{profile.otherConditionText}</p>
                )}
              </div>

              {/* ALERGIA */}
              <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800/90 space-y-0.5">
                <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider">
                  ALERGIAS CONHECIDAS
                </span>
                <p className="text-base font-extrabold text-white">
                  {profile.allergies || 'Não informada'}
                </p>
              </div>

              {/* MEDICAMENTOS */}
              <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800/90 space-y-0.5">
                <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider">
                  MEDICAMENTOS DE USO CONTÍNUO
                </span>
                <p className="text-sm font-bold text-slate-200">
                  {profile.medications || 'Não informado'}
                </p>
              </div>

              {/* CONTATO DE EMERGÊNCIA */}
              <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800/90 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                    CONTATO DE EMERGÊNCIA
                  </span>
                  <p className="text-sm font-black text-white">
                    {profile.emergencyContactName || 'Não cadastrado'}
                  </p>
                  <p className="text-xs text-slate-400 font-mono">
                    {profile.emergencyContactPhone || 'Sem telefone'}
                  </p>
                </div>

                {profile.emergencyContactPhone && (
                  <a
                    href={`tel:${profile.emergencyContactPhone.replace(/\D/g, '')}`}
                    className="p-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0"
                  >
                    <PhoneCall className="w-4 h-4" /> Ligar
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SHARED SECTION: LOCALIZAÇÃO ATUAL (ESSENCIAL PARA SAMU)  */}
      {/* ======================================================== */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black text-red-400 uppercase tracking-wider flex items-center gap-1.5">
            <MapPin className="w-4 h-4" /> LOCALIZAÇÃO DO SOCORRO (GPS)
          </span>
          <button
            type="button"
            onClick={onRefreshLocation}
            className="text-[11px] text-slate-300 hover:text-white flex items-center gap-1 bg-slate-800 px-2 py-1 rounded-lg"
          >
            <RefreshCw className="w-3 h-3" /> Atualizar
          </button>
        </div>

        <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800/90 space-y-2">
          <p className="text-base font-black text-white leading-snug">
            {location.addressDescription}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
            {location.latitude && location.longitude ? (
              <>
                <span className="font-mono text-slate-400 text-[11px]">
                  {location.latitude.toFixed(5)}, {location.longitude.toFixed(5)}
                </span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleCopyAddress}
                    className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedAddressNotice ? 'Copiado!' : 'Copiar endereço'}</span>
                  </button>
                  <a
                    href={`https://maps.google.com/?q=${location.latitude},${location.longitude}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-red-400 hover:text-red-300 font-bold flex items-center gap-1"
                  >
                    Abrir Mapa <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </>
            ) : (
              <span className="text-slate-400 text-xs">Aguardando sinal GPS...</span>
            )}
          </div>
        </div>
      </div>

      {/* ACTION 3: NOTIFY CONTACTS VIA WHATSAPP / SMS */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3 shadow-xl">
        <div>
          <span className="text-xs font-black uppercase text-emerald-400">
            {victimType === 'third_party' ? 'Avisar Apoio' : 'Avisar Família'}
          </span>
          <h3 className="text-base font-black text-white">
            {victimType === 'third_party'
              ? 'Enviar Alerta de Socorro a Terceiro com GPS'
              : 'Enviar Alerta para Contatos de Confiança'}
          </h3>
          <p className="text-xs text-slate-400">
            {victimType === 'third_party'
              ? 'Envia mensagem informando que você está prestando primeiros socorros a outra pessoa no local indicado.'
              : 'Envia mensagem pronta com sua localização GPS e condições de saúde.'}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="py-3 px-4 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-600/30 transition-transform"
          >
            <Share2 className="w-4 h-4" /> Enviar WhatsApp
          </button>

          <button
            type="button"
            onClick={handleShareSMS}
            className="py-3 px-4 bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-transform"
          >
            <PhoneCall className="w-4 h-4" /> Enviar SMS
          </button>
        </div>

        <div className="text-center pt-1">
          <button
            type="button"
            onClick={handleCopyText}
            className="text-xs text-slate-400 hover:text-white underline"
          >
            {copiedNotice ? '✓ Mensagem copiada com sucesso!' : 'Copiar texto do alerta'}
          </button>
        </div>
      </div>

      {/* END EMERGENCY BUTTON */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onEndEmergency}
          className="w-full py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-2xl font-bold text-xs uppercase tracking-wider border border-slate-700 flex items-center justify-center gap-2"
        >
          <X className="w-4 h-4" />
          <span>Encerrar Modo de Emergência</span>
        </button>
      </div>

      <MedicalDisclaimer compact />
    </div>
  );
};
