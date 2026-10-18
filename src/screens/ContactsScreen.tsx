import React, { useState } from 'react';
import { ArrowLeft, UserPlus, Phone, Trash2, Share2, Shield, Plus, Check } from 'lucide-react';
import { UserProfile, EmergencyContact } from '../types';
import { formatEmergencyWhatsAppMessage } from '../utils/location';
import { HEALTH_CONDITIONS_META } from '../utils/storage';

interface Props {
  profile: UserProfile;
  onUpdateContacts: (contacts: EmergencyContact[]) => void;
  onBack: () => void;
}

export const ContactsScreen: React.FC<Props> = ({ profile, onUpdateContacts, onBack }) => {
  const [contacts, setContacts] = useState<EmergencyContact[]>(profile.contacts || []);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [relationship, setRelationship] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const newContact: EmergencyContact = {
      id: Date.now().toString(),
      name: name.trim(),
      phone: phone.trim(),
      relationship: relationship.trim() || 'Contato de Confiança',
    };

    const updated = [...contacts, newContact];
    setContacts(updated);
    onUpdateContacts(updated);

    setName('');
    setPhone('');
    setRelationship('');
    setShowAddForm(false);
  };

  const handleDelete = (id: string) => {
    const updated = contacts.filter((c) => c.id !== id);
    setContacts(updated);
    onUpdateContacts(updated);
  };

  const handleSendTestAlert = (contact: EmergencyContact) => {
    const conditionsStr = profile.conditions?.map((c) => HEALTH_CONDITIONS_META[c]?.label).join(', ') || 'Nenhuma informada';
    const text = formatEmergencyWhatsAppMessage(
      profile.fullName,
      conditionsStr,
      {
        latitude: -23.55052,
        longitude: -46.633308,
        accuracy: 20,
        addressDescription: 'Localização simulada para teste de alerta',
        status: 'obtained',
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      },
      new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    );

    const clean = contact.phone.replace(/\D/g, '');
    const url = `https://wa.me/55${clean}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
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
          CONTATOS DE EMERGÊNCIA
        </h1>
        <button
          type="button"
          onClick={() => setShowAddForm(!showAddForm)}
          className="p-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-md"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div>
        <h2 className="text-xl font-black text-white">Pessoas de Confiança</h2>
        <p className="text-xs text-slate-300 mt-1">
          Estas pessoas poderão receber um aviso imediato com sua localização e ficha médica quando a emergência for acionada.
        </p>
      </div>

      {/* Add form */}
      {showAddForm && (
        <form
          onSubmit={handleAdd}
          className="p-4 bg-slate-900 border-2 border-emerald-500 rounded-3xl space-y-3 animate-in fade-in"
        >
          <h3 className="text-xs font-black uppercase text-emerald-400">Novo Contato de Emergência</h3>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-300">Nome da pessoa *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Maria Santos"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-300">Telefone com DDD *</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Ex: (11) 98765-4321"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-300">Parentesco / Relação</label>
            <input
              type="text"
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              placeholder="Ex: Mãe, Irmão, Vizinho, Cuidador"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold"
            >
              Salvar Contato
            </button>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2.5 bg-slate-800 text-slate-300 rounded-xl text-xs"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      {/* Contacts List */}
      <div className="space-y-3">
        {contacts.length === 0 ? (
          <div className="text-center py-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-2">
            <Phone className="w-10 h-10 text-slate-600 mx-auto" />
            <p className="text-sm font-bold text-slate-300">Nenhum contato cadastrado ainda</p>
            <p className="text-xs text-slate-500">
              Cadastre familiares ou vizinhos que possam prestar auxílio rápido.
            </p>
            <button
              type="button"
              onClick={() => setShowAddForm(true)}
              className="mt-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold inline-flex items-center gap-1.5"
            >
              <UserPlus className="w-4 h-4" /> Cadastrar Contato
            </button>
          </div>
        ) : (
          contacts.map((contact) => (
            <div
              key={contact.id}
              className="p-4 bg-slate-900 border border-slate-800 rounded-3xl space-y-3 shadow-lg"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-black text-white">{contact.name}</h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">{contact.phone}</p>
                  <span className="text-[10px] font-bold bg-slate-800 text-emerald-300 px-2 py-0.5 rounded-full inline-block mt-1">
                    {contact.relationship}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleDelete(contact.id)}
                  className="p-2 text-slate-500 hover:text-red-400 rounded-xl hover:bg-slate-800"
                  title="Remover contato"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-2 pt-1 border-t border-slate-800/80">
                <a
                  href={`tel:${contact.phone.replace(/\D/g, '')}`}
                  className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border border-slate-700"
                >
                  <Phone className="w-3.5 h-3.5" /> Ligar
                </a>

                <button
                  type="button"
                  onClick={() => handleSendTestAlert(contact)}
                  className="flex-1 py-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border border-emerald-500/40"
                  title="Testa o envio de alerta de emergência pelo WhatsApp"
                >
                  <Share2 className="w-3.5 h-3.5" /> Testar Alerta
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Suggested Automatic message note */}
      <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2 text-xs text-slate-400">
        <span className="font-bold text-slate-200 block">Modelo de Mensagem Enviada:</span>
        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-[11px] text-slate-300 leading-relaxed">
          &quot;ALERTA DE EMERGÊNCIA!<br />
          [Nome] acionou o aplicativo PRONTO SOCORRO.<br />
          Localização atual: [Coordenadas e link Google Maps]<br />
          Condição cadastrada: [Condições do paciente]&quot;
        </div>
      </div>
    </div>
  );
};
