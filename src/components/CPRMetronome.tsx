import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, RotateCcw } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface Props {
  targetBpm?: number;
}

export const CPRMetronome: React.FC<Props> = ({ targetBpm = 110 }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [beatIndex, setBeatIndex] = useState<number>(0);
  const [compressionCount, setCompressionCount] = useState<number>(0);
  const intervalRef = useRef<number | null>(null);

  const msPerBeat = Math.round(60000 / targetBpm); // ~545ms for 110 bpm

  useEffect(() => {
    if (!isPlaying) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = window.setInterval(() => {
      setBeatIndex((prev) => (prev + 1) % 6);
      setCompressionCount((count) => count + 1);

      if (soundEnabled) {
        soundManager.playCprClick(beatIndex === 0);
      }
    }, msPerBeat);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, soundEnabled, msPerBeat, beatIndex]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  const handleResetCount = () => {
    setCompressionCount(0);
    setBeatIndex(0);
  };

  return (
    <div className="bg-slate-900 border-2 border-red-500 rounded-3xl p-5 shadow-2xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3.5">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-red-400 bg-red-950 px-3 py-1 rounded-full border border-red-800/80">
            Metrônomo de RCP (100–120 bpm)
          </span>
          <p className="text-2xl font-black text-white mt-1.5 flex items-baseline gap-2">
            <span>{targetBpm}</span>
            <span className="text-sm font-semibold text-slate-300">compressões por minuto</span>
          </p>
        </div>

        <button
          type="button"
          onClick={toggleSound}
          className={`p-3.5 rounded-2xl flex items-center gap-2 text-sm font-black transition-all ${
            soundEnabled
              ? 'bg-red-600 text-white shadow-lg shadow-red-600/40 ring-2 ring-red-400'
              : 'bg-slate-800 text-slate-300 border border-slate-700'
          }`}
          aria-label={soundEnabled ? 'Silenciar som do metrônomo' : 'Ativar som do metrônomo'}
        >
          {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          <span className="text-xs uppercase">{soundEnabled ? 'SOM LIGADO' : 'MUDO'}</span>
        </button>
      </div>

      {/* Synchronized Pulse Indicator with Big Text */}
      <div className="flex flex-col items-center justify-center py-2 space-y-3.5">
        <div className="relative flex items-center justify-center">
          {/* Animated expansion ring */}
          <div
            className={`absolute w-40 h-40 rounded-full border-4 border-red-500/40 transition-transform duration-150 ease-out ${
              isPlaying ? 'scale-110 opacity-75' : 'scale-100 opacity-20'
            }`}
            style={{
              transform: `scale(${1 + (beatIndex % 2 === 0 ? 0.25 : 0.08)})`,
            }}
          />

          {/* Central Compression Button/Display with Large Readable Text */}
          <div
            className={`w-32 h-32 rounded-full flex flex-col items-center justify-center text-center transition-all duration-100 shadow-2xl ${
              beatIndex % 2 === 0
                ? 'bg-red-600 text-white scale-105 ring-8 ring-red-400/50'
                : 'bg-red-800 text-red-100 scale-95 ring-2 ring-red-500/30'
            }`}
          >
            <span className="text-[11px] font-black uppercase tracking-wider text-red-200">RITMO</span>
            <span className="text-3xl font-black tracking-tight leading-none my-0.5">EMPURRE</span>
            <span className="text-xs uppercase font-extrabold text-red-100">RÁPIDO E FORTE</span>
          </div>
        </div>

        {/* 6 Beats Visual Track ● ● ● ● ● ● */}
        <div className="flex items-center justify-center gap-3 pt-2" aria-hidden="true">
          {[0, 1, 2, 3, 4, 5].map((idx) => {
            const isActive = beatIndex === idx;
            return (
              <div
                key={idx}
                className={`w-4 h-4 rounded-full transition-all duration-100 ${
                  isActive
                    ? 'bg-red-400 scale-135 shadow-md shadow-red-500 ring-2 ring-white'
                    : 'bg-slate-700 scale-100'
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Counter & Controls (Larger Text) */}
      <div className="bg-slate-950 rounded-2xl p-4 flex items-center justify-between border-2 border-slate-800 shadow-inner">
        <div>
          <span className="text-xs text-slate-300 uppercase font-black tracking-wider">Total de compressões</span>
          <p className="text-3xl font-black text-white">{compressionCount}</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={togglePlay}
            className={`px-5 py-3 rounded-xl font-black text-sm sm:text-base flex items-center gap-2 transition-all ${
              isPlaying
                ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-md'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-5 h-5" /> Pausar
              </>
            ) : (
              <>
                <Play className="w-5 h-5" /> Continuar
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleResetCount}
            className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-sm border border-slate-700 transition-colors"
            title="Zerar contador"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      <p className="text-sm text-center text-slate-100 font-bold bg-slate-800/90 py-3 px-4 rounded-2xl border border-slate-700">
        🔔 Siga o ritmo: <strong>110 batidas por minuto</strong>. Braços retos e empurre 5 a 6 cm para baixo.
      </p>
    </div>
  );
};
