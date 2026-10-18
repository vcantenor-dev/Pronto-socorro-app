import React, { useState } from 'react';
import { Target, Hand, ArrowDown, CheckCircle2 } from 'lucide-react';

export const CPRVisualGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chest' | 'hands' | 'posture'>('chest');

  return (
    <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-4 sm:p-5 space-y-4 shadow-xl">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <span className="text-xs sm:text-sm font-black uppercase text-amber-400 tracking-wider">
          Fotografias Reais de Treinamento
        </span>
        <span className="text-xs text-slate-300 font-bold">Toque para alternar:</span>
      </div>

      {/* Navigation Buttons (Large & High Contrast) */}
      <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
        <button
          type="button"
          onClick={() => setActiveTab('chest')}
          className={`py-3 px-2 rounded-2xl font-black text-xs sm:text-sm transition-all flex flex-col items-center gap-1 border ${
            activeTab === 'chest'
              ? 'bg-red-600 text-white border-red-400 shadow-lg shadow-red-600/40 ring-2 ring-red-400/50'
              : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-850'
          }`}
        >
          <Target className="w-5 h-5 shrink-0" />
          <span>1. Onde Apertar</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('hands')}
          className={`py-3 px-2 rounded-2xl font-black text-xs sm:text-sm transition-all flex flex-col items-center gap-1 border ${
            activeTab === 'hands'
              ? 'bg-red-600 text-white border-red-400 shadow-lg shadow-red-600/40 ring-2 ring-red-400/50'
              : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-850'
          }`}
        >
          <Hand className="w-5 h-5 shrink-0" />
          <span>2. Como Segurar</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('posture')}
          className={`py-3 px-2 rounded-2xl font-black text-xs sm:text-sm transition-all flex flex-col items-center gap-1 border ${
            activeTab === 'posture'
              ? 'bg-red-600 text-white border-red-400 shadow-lg shadow-red-600/40 ring-2 ring-red-400/50'
              : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-850'
          }`}
        >
          <ArrowDown className="w-5 h-5 shrink-0" />
          <span>3. Braços Retos</span>
        </button>
      </div>

      {/* TAB 1: ONDE FAZER A MASSAGEM (FOTO REAL DO TÓRAX) */}
      {activeTab === 'chest' && (
        <div className="bg-slate-950 rounded-2xl p-4 sm:p-5 border-2 border-slate-800 space-y-4">
          <div className="text-center space-y-1">
            <h3 className="text-base sm:text-xl font-black text-white">
              Local Exato: Centro do Peito
            </h3>
            <p className="text-sm sm:text-base text-amber-300 font-extrabold">
              No osso central (esterno), entre a linha dos mamilos
            </p>
          </div>

          {/* Real Photo with High-Contrast Overlay */}
          <div className="relative rounded-2xl overflow-hidden border-2 border-red-500/80 shadow-2xl">
            <img
              src="/src/assets/images/cpr_chest_location_1792188915783.jpg"
              alt="Posicionamento exato das mãos no centro do peito para massagem cardíaca"
              referrerPolicy="no-referrer"
              className="w-full h-56 sm:h-64 object-cover object-center"
            />
            {/* Visual Guide Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
            
            <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-xl font-black text-xs uppercase shadow-md flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              Ponto Exato de Compressão
            </div>

            <div className="absolute bottom-3 inset-x-3 bg-black/85 backdrop-blur-md p-2.5 rounded-xl border border-white/20 text-center">
              <p className="text-xs sm:text-sm font-black text-white">
                ⬇ Apoie a base da palma bem no meio do peito e empurre 5 a 6 cm
              </p>
            </div>
          </div>

          {/* Direct Step Instructions */}
          <div className="space-y-2 text-sm sm:text-base text-slate-100 font-bold">
            <div className="flex items-start gap-2.5 bg-slate-900 p-3 rounded-xl border border-slate-800">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <p>
                <strong>Coloque a base da mão</strong> na metade inferior do osso do meio do peito.
              </p>
            </div>
            <div className="flex items-start gap-2.5 bg-slate-900 p-3 rounded-xl border border-slate-800">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <p>
                <strong>Não aperte as costelas nem a barriga.</strong> Pressione somente o osso central duro.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: COMO SEGURAR AS MÃOS (FOTO REAL DAS MÃOS ENTRELAÇADAS) */}
      {activeTab === 'hands' && (
        <div className="bg-slate-950 rounded-2xl p-4 sm:p-5 border-2 border-slate-800 space-y-4">
          <div className="text-center space-y-1">
            <h3 className="text-base sm:text-xl font-black text-white">
              Como Segurar as Mãos
            </h3>
            <p className="text-sm sm:text-base text-amber-300 font-extrabold">
              Dedos firmemente entrelaçados e puxados para cima
            </p>
          </div>

          {/* Real Photo Macro Hands */}
          <div className="relative rounded-2xl overflow-hidden border-2 border-red-500/80 shadow-2xl">
            <img
              src="/src/assets/images/cpr_hands_interlocked_1792188917741.jpg"
              alt="Mãos entrelaçadas corretamente para compressão cardíaca"
              referrerPolicy="no-referrer"
              className="w-full h-56 sm:h-64 object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

            <div className="absolute top-3 left-3 bg-emerald-600 text-white px-3 py-1 rounded-xl font-black text-xs uppercase shadow-md flex items-center gap-1.5">
              <span>✓ Dedos Cruzados</span>
            </div>

            <div className="absolute bottom-3 inset-x-3 bg-black/85 backdrop-blur-md p-2.5 rounded-xl border border-white/20 text-center">
              <p className="text-xs sm:text-sm font-black text-emerald-300">
                Apenas a base da palma de baixo toca o osso • Dedos ficam erguidos
              </p>
            </div>
          </div>

          {/* Direct Instructions */}
          <div className="space-y-2 text-sm sm:text-base text-slate-100 font-bold">
            <div className="flex items-start gap-2.5 bg-slate-900 p-3 rounded-xl border border-slate-800">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <p>
                <strong>A mão de cima entrelaça os dedos</strong> da mão de baixo e puxa para cima.
              </p>
            </div>
            <div className="flex items-start gap-2.5 bg-slate-900 p-3 rounded-xl border border-slate-800">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <p>
                <strong>Não deixe as pontas dos dedos encostarem nas costelas</strong> para concentrar toda a força no esterno.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: POSTURA CORPORAL (FOTO REAL DO SOCORRISTA A 90°) */}
      {activeTab === 'posture' && (
        <div className="bg-slate-950 rounded-2xl p-4 sm:p-5 border-2 border-slate-800 space-y-4">
          <div className="text-center space-y-1">
            <h3 className="text-base sm:text-xl font-black text-white">
              Braços Retos em Ângulo de 90°
            </h3>
            <p className="text-sm sm:text-base text-amber-300 font-extrabold">
              Ombros diretamente alinhados acima do peito da vítima
            </p>
          </div>

          {/* Real Photo Rescuer Posture */}
          <div className="relative rounded-2xl overflow-hidden border-2 border-red-500/80 shadow-2xl">
            <img
              src="/src/assets/images/cpr_body_posture_1792188916916.jpg"
              alt="Socorrista ajoelhado ao lado com braços retos e cotovelos travados a 90 graus"
              referrerPolicy="no-referrer"
              className="w-full h-56 sm:h-64 object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

            <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-xl font-black text-xs uppercase shadow-md flex items-center gap-1.5">
              <span>📐 90° Perpendicular</span>
            </div>

            <div className="absolute bottom-3 inset-x-3 bg-black/85 backdrop-blur-md p-2.5 rounded-xl border border-white/20 text-center">
              <p className="text-xs sm:text-sm font-black text-white">
                Cotovelos totalmente travados • Use o peso do tronco para empurrar
              </p>
            </div>
          </div>

          {/* Direct Instructions */}
          <div className="space-y-2 text-sm sm:text-base text-slate-100 font-bold">
            <div className="flex items-start gap-2.5 bg-slate-900 p-3 rounded-xl border border-slate-800">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <p>
                <strong>Ajoelhe-se bem perto da pessoa</strong> e posicione seus ombros reto acima do peito dela.
              </p>
            </div>
            <div className="flex items-start gap-2.5 bg-slate-900 p-3 rounded-xl border border-slate-800">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <p>
                <strong>NÃO dobre os cotovelos.</strong> Use a gravidade e o peso do seu próprio corpo para afundar o peito de 5 a 6 cm.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
