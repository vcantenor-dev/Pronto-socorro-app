import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, User, Phone, ShieldCheck, Heart } from 'lucide-react';
import { UserProfile } from '../types';

interface Props {
  profile: UserProfile;
  onNext: (updated: Partial<UserProfile>) => void;
  onBack: () => void;
}

export const UserRegistrationScreen: React.FC<Props> = ({ profile, onNext, onBack }) => {
  const [fullName, setFullName] = useState(profile.fullName || '');
  const [age, setAge] = useState(profile.age || '');
  const [contactName, setContactName] = useState(profile.emergencyContactName || '');
  const [contactPhone, setContactPhone] = useState(profile.emergencyContactPhone || '');
  const [bloodType, setBloodType] = useState(profile.bloodType || '');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setError('Por favor, informe seu nome completo para a ficha de socorro.');
      return;
    }

    onNext({
      fullName: fullName.trim(),
      age: age.trim(),
      emergencyContactName: contactName.trim(),
      emergencyContactPhone: contactPhone.trim(),
      bloodType: bloodType.trim(),
      contacts: contactName.trim()
        ? [
            {
              id: 'primary',
              name: contactName.trim(),
              phone: contactPhone.trim(),
              relationship: 'Contato Principal',
            },
          ]
        : profile.contacts,
    });
  };

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
          Passo 1 de 2 • Dados Básicos
        </span>
      </div>

      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">MEU PERFIL DE EMERGÊNCIA</h1>
        <p className="text-xs text-slate-400 mt-1">
          Identificação essencial para quem prestar os primeiros socorros ou para o SAMU 192.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-950/80 border border-red-500 rounded-2xl text-xs text-red-200 font-bold">
            {error}
          </div>
        )}

        {/* Nome Completo */}
        <div className="space-y-1.5">
          <label className="text-xs font-black text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-red-400" />
            Nome Completo *
          </label>
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Ex: João da Silva"
            className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-4 py-3.5 text-white font-medium focus:ring-2 focus:ring-red-500 focus:outline-none text-base"
          />
        </div>

        {/* Idade e Tipo Sanguíneo */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-300 uppercase tracking-wide">
              Idade (anos)
            </label>
            <input
              type="number"
              min="1"
              max="125"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Ex: 52"
              className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-4 py-3.5 text-white font-medium focus:ring-2 focus:ring-red-500 focus:outline-none text-base"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-300 uppercase tracking-wide flex items-center gap-1">
              <Heart className="w-3 h-3 text-red-400" /> Tipo Sanguíneo
            </label>
            <select
              value={bloodType}
              onChange={(e) => setBloodType(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-4 py-3.5 text-white font-medium focus:ring-2 focus:ring-red-500 focus:outline-none text-base"
            >
              <option value="">Não sei / Não informar</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
        </div>

        {/* Contato de Emergência */}
        <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-3xl space-y-3.5">
          <div className="flex items-center gap-2 text-white font-black text-sm">
            <Phone className="w-4 h-4 text-emerald-400" />
            <span>Pessoa de Confiança (Aviso Imediato)</span>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">
              Nome do Contato de Emergência
            </label>
            <input
              type="text"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              placeholder="Ex: Maria (Esposa)"
              className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-3.5 py-3 text-white font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">
              Telefone com DDD (WhatsApp / Ligação)
            </label>
            <input
              type="tel"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              placeholder="Ex: (11) 98765-4321"
              className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-3.5 py-3 text-white font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm"
            />
          </div>
        </div>

        {/* Voluntary notice */}
        <div className="flex items-start gap-2 p-3 bg-slate-900/60 rounded-2xl border border-slate-800 text-[11px] text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <p>
            Os dados são armazenados localmente no seu aparelho e disponibilizados apenas para visualização em caso de socorro.
          </p>
        </div>

        {/* Next step button */}
        <button
          type="submit"
          className="w-full py-4 bg-red-600 hover:bg-red-500 text-white rounded-2xl font-black text-base flex items-center justify-center gap-2 shadow-xl shadow-red-600/30 transition-transform active:scale-95"
        >
          <span>AVANÇAR: CONDIÇÕES DE SAÚDE</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};
