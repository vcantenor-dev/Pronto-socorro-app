import React from 'react';
import { ArrowLeft, Edit3, HeartPulse, User, Phone, Droplet, ShieldCheck, AlertCircle } from 'lucide-react';
import { UserProfile } from '../types';
import { HEALTH_CONDITIONS_META } from '../utils/storage';
import { MedicalDisclaimer } from '../components/MedicalDisclaimer';

interface Props {
  profile: UserProfile;
  onEdit: () => void;
  onBack: () => void;
}

export const EmergencyProfileScreen: React.FC<Props> = ({ profile, onEdit, onBack }) => {
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
          MINHA FICHA DE EMERGÊNCIA
        </h1>
        <button
          type="button"
          onClick={onEdit}
          className="px-3 py-1.5 bg-red-600/20 text-red-400 hover:bg-red-600/30 border border-red-500/40 rounded-xl text-xs font-bold flex items-center gap-1.5"
        >
          <Edit3 className="w-3.5 h-3.5" /> Editar
        </button>
      </div>

      {/* Patient Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-red-400">
              PACIENTE CADASTRADO
            </span>
            <h2 className="text-2xl font-black text-white">{profile.fullName || 'Não informado'}</h2>
            <p className="text-xs text-slate-400">
              {profile.age ? `${profile.age} anos` : 'Idade não informada'} • Tipo Sanguíneo:{' '}
              <strong className="text-white">{profile.bloodType || 'Não informado'}</strong>
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-red-950 border border-red-800 text-red-500 flex items-center justify-center font-bold text-lg">
            {profile.bloodType || 'PS'}
          </div>
        </div>
      </div>

      {/* Registered Health Conditions */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <HeartPulse className="w-4 h-4" /> CONDIÇÕES DE SAÚDE
          </h3>
          <span className="text-[10px] text-slate-400">
            {profile.conditions?.length || 0} cadastrada(s)
          </span>
        </div>

        {profile.conditions && profile.conditions.length > 0 ? (
          <div className="space-y-2">
            {profile.conditions.map((c) => {
              const meta = HEALTH_CONDITIONS_META[c];
              return (
                <div
                  key={c}
                  className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between"
                >
                  <span className="text-sm font-bold text-white">{meta?.label || c}</span>
                  <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded">
                    Guia rápido ativo
                  </span>
                </div>
              );
            })}
            {profile.otherConditionText && (
              <div className="p-3 bg-slate-950 rounded-2xl border border-purple-800/60">
                <span className="text-xs font-bold text-purple-300">Outra:</span>
                <p className="text-xs text-slate-200 mt-0.5">{profile.otherConditionText}</p>
              </div>
            )}
          </div>
        ) : (
          <p className="text-xs text-slate-400 italic p-3 bg-slate-950 rounded-2xl">
            Nenhuma condição crônica selecionada no cadastro.
          </p>
        )}
      </div>

      {/* Allergies & Medications */}
      <div className="grid grid-cols-1 gap-3">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 space-y-1">
          <span className="text-[10px] font-black uppercase text-rose-400 tracking-wider">
            ALERGIAS CONHECIDAS
          </span>
          <p className="text-sm font-bold text-slate-100">
            {profile.allergies || 'Nenhuma alergia conhecida informada'}
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 space-y-1">
          <span className="text-[10px] font-black uppercase text-sky-400 tracking-wider">
            MEDICAMENTOS DE USO CONTÍNUO
          </span>
          <p className="text-sm font-bold text-slate-100">
            {profile.medications || 'Nenhum medicamento informado'}
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 space-y-1">
          <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">
            OBSERVAÇÕES IMPORTANTES
          </span>
          <p className="text-xs text-slate-300 leading-relaxed">
            {profile.importantNotes || 'Nenhuma observação adicional cadastrada.'}
          </p>
        </div>
      </div>

      {/* Primary Emergency Contact */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-2">
        <span className="text-[10px] font-black uppercase text-emerald-400 tracking-wider">
          CONTATO DE EMERGÊNCIA PRINCIPAL
        </span>
        <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-base font-black text-white">{profile.emergencyContactName || 'Não cadastrado'}</p>
            <p className="text-xs text-slate-400 font-mono mt-0.5">{profile.emergencyContactPhone || 'Sem telefone'}</p>
          </div>
          {profile.emergencyContactPhone && (
            <a
              href={`tel:${profile.emergencyContactPhone.replace(/\D/g, '')}`}
              className="p-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5" /> Ligar
            </a>
          )}
        </div>
      </div>

      {/* Sensitive Data Voluntary Status */}
      <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex items-start gap-2.5 text-xs text-slate-400">
        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-slate-200">Armazenamento Seguro Local</p>
          <p className="text-[11px] leading-relaxed mt-0.5">
            Dados cadastrados voluntariamente pelo usuário. Armazenados de forma privada no dispositivo para pronto uso em urgências.
          </p>
        </div>
      </div>

      {/* Edit button */}
      <button
        type="button"
        onClick={onEdit}
        className="w-full py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-2xl font-bold text-sm uppercase tracking-wider border border-slate-700 flex items-center justify-center gap-2"
      >
        <Edit3 className="w-4 h-4" /> Editar informações
      </button>

      <MedicalDisclaimer compact />
    </div>
  );
};
