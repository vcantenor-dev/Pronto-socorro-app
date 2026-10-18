import React, { useState } from 'react';
import { ArrowLeft, Check, HeartPulse, Wind, Activity, Droplet, ShieldAlert, AlertCircle, ShieldCheck } from 'lucide-react';
import { UserProfile, HealthConditionKey } from '../types';

interface Props {
  profile: UserProfile;
  onSave: (updated: Partial<UserProfile>) => void;
  onBack: () => void;
}

export const HealthRegistrationScreen: React.FC<Props> = ({ profile, onSave, onBack }) => {
  const [conditions, setConditions] = useState<HealthConditionKey[]>(profile.conditions || []);
  const [otherConditionText, setOtherConditionText] = useState(profile.otherConditionText || '');
  const [allergies, setAllergies] = useState(profile.allergies || '');
  const [medications, setMedications] = useState(profile.medications || '');
  const [importantNotes, setImportantNotes] = useState(profile.importantNotes || '');

  const toggleCondition = (key: HealthConditionKey) => {
    if (conditions.includes(key)) {
      setConditions(conditions.filter((c) => c !== key));
    } else {
      setConditions([...conditions, key]);
    }
  };

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      conditions,
      otherConditionText: otherConditionText.trim(),
      allergies: allergies.trim(),
      medications: medications.trim(),
      importantNotes: importantNotes.trim(),
      hasCompletedOnboarding: true,
      registeredAt: new Date().toISOString(),
    });
  };

  const CONDITION_ITEMS: { key: HealthConditionKey; label: string; icon: React.ReactNode; desc: string }[] = [
    {
      key: 'heart',
      label: 'Problemas cardíacos',
      icon: <HeartPulse className="w-5 h-5 text-red-400" />,
      desc: 'Histórico de infarto, arritmia, hipertensão ou cirurgia',
    },
    {
      key: 'asthma',
      label: 'Asma / Crise respiratória',
      icon: <Wind className="w-5 h-5 text-sky-400" />,
      desc: 'Uso de broncodilatador (bombinha) ou chiado',
    },
    {
      key: 'seizure',
      label: 'Epilepsia / Histórico de convulsões',
      icon: <Activity className="w-5 h-5 text-amber-400" />,
      desc: 'Crises convulsivas que necessitam de proteção física',
    },
    {
      key: 'diabetes',
      label: 'Diabetes',
      icon: <Droplet className="w-5 h-5 text-blue-400" />,
      desc: 'Diabetes tipo 1 ou 2, uso de insulina ou medicação oral',
    },
    {
      key: 'anaphylaxis',
      label: 'Alergia grave / Anafilaxia',
      icon: <ShieldAlert className="w-5 h-5 text-rose-400" />,
      desc: 'Choque alérgico (alimentos, picadas, remédios)',
    },
    {
      key: 'other',
      label: 'Outras condições importantes',
      icon: <AlertCircle className="w-5 h-5 text-purple-400" />,
      desc: 'Qualquer outra restrição ou doença crônica',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800 border border-slate-700"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="text-xs font-black uppercase tracking-wider text-slate-400">
          Passo 2 de 2 • Saúde & Cuidados
        </span>
      </div>

      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">CONDIÇÕES DE SAÚDE</h1>
        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
          Selecione todas as condições aplicáveis. Ao acionar o botão de socorro, o guia correto será aberto imediatamente.
        </p>
      </div>

      <form onSubmit={handleFinish} className="space-y-5">
        {/* Conditions Checkbox Cards */}
        <div className="space-y-2.5">
          <label className="text-xs font-black text-slate-300 uppercase tracking-wide block">
            Condições Pré-existentes (Pode marcar mais de uma):
          </label>

          <div className="space-y-2">
            {CONDITION_ITEMS.map((item) => {
              const isSelected = conditions.includes(item.key);
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => toggleCondition(item.key)}
                  className={`w-full text-left p-3.5 rounded-2xl border-2 transition-all flex items-start gap-3.5 ${
                    isSelected
                      ? 'bg-slate-900 border-red-500 shadow-md shadow-red-950/40 ring-1 ring-red-500'
                      : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 border ${
                      isSelected
                        ? 'bg-red-600 border-red-500 text-white'
                        : 'bg-slate-800 border-slate-700 text-transparent'
                    }`}
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {item.icon}
                      <span className="font-bold text-white text-sm">{item.label}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {conditions.includes('other') && (
            <div className="pt-1">
              <input
                type="text"
                value={otherConditionText}
                onChange={(e) => setOtherConditionText(e.target.value)}
                placeholder="Descreva a outra condição de saúde..."
                className="w-full bg-slate-950 border border-purple-500/80 rounded-2xl px-3.5 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
          )}
        </div>

        {/* Alergias Conhecidas */}
        <div className="space-y-1.5">
          <label className="text-xs font-black text-slate-300 uppercase tracking-wide">
            Alergias Conhecidas (Medicamentos, alimentos, etc.)
          </label>
          <input
            type="text"
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
            placeholder="Ex: Dipirona, Penicilina, Frutos do mar (ou 'Nenhuma conhecida')"
            className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-4 py-3 text-white font-medium focus:ring-2 focus:ring-red-500 focus:outline-none text-sm"
          />
        </div>

        {/* Medicamentos de Uso Contínuo */}
        <div className="space-y-1.5">
          <label className="text-xs font-black text-slate-300 uppercase tracking-wide">
            Medicamentos de Uso Contínuo
          </label>
          <input
            type="text"
            value={medications}
            onChange={(e) => setMedications(e.target.value)}
            placeholder="Ex: Insulina, Losartana 50mg, Bombinha de Albuterol"
            className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-4 py-3 text-white font-medium focus:ring-2 focus:ring-red-500 focus:outline-none text-sm"
          />
        </div>

        {/* Observações Importantes */}
        <div className="space-y-1.5">
          <label className="text-xs font-black text-slate-300 uppercase tracking-wide">
            Observações Importantes para os Socorristas
          </label>
          <textarea
            rows={2}
            value={importantNotes}
            onChange={(e) => setImportantNotes(e.target.value)}
            placeholder="Ex: Possui marca-passo; prótese no quadril; não deitar de costas se estiver nauseado."
            className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-4 py-3 text-white font-medium focus:ring-2 focus:ring-red-500 focus:outline-none text-sm resize-none"
          />
        </div>

        {/* Voluntary Sensitive Data Banner */}
        <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-1 text-xs text-slate-300">
          <div className="flex items-center gap-2 font-bold text-amber-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            Declaração de Cadastro Voluntário e Privacidade
          </div>
          <p className="leading-relaxed">
            Ao salvar, você declara que está fornecendo essas informações voluntariamente para facilitar seu socorro em situações de emergência. Seus dados permanecem seguros no dispositivo.
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-4 bg-red-600 hover:bg-red-500 text-white rounded-2xl font-black text-base uppercase tracking-wide shadow-xl shadow-red-600/30 transition-transform active:scale-95"
        >
          SALVAR FICHA E ATIVAR APLICATIVO
        </button>
      </form>
    </div>
  );
};
