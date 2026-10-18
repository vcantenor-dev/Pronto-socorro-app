import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, AlertTriangle, PhoneCall, CheckCircle2 } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface Props {
  onCallSamu?: () => void;
}

export const SeizureTimer: React.FC<Props> = ({ onCallSamu }) => {
  const [seconds, setSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(true); // Starts automatically
  const [hasTriggered5MinAlert, setHasTriggered5MinAlert] = useState<boolean>(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  // Check 5 minutes threshold (300 seconds)
  useEffect(() => {
    if (seconds >= 300 && !hasTriggered5MinAlert) {
      setHasTriggered5MinAlert(true);
      soundManager.playAlertChime();
    }
  }, [seconds, hasTriggered5MinAlert]);

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const isOver5Minutes = seconds >= 300;

  return (
    <div
      className={`rounded-3xl p-5 border-2 transition-all shadow-2xl ${
        isOver5Minutes
          ? 'bg-red-950/80 border-red-500 text-white animate-pulse'
          : 'bg-slate-900 border-amber-500/80 text-white'
      }`}
    >
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <span className="text-xs font-black uppercase tracking-wider text-amber-400 bg-amber-950/80 px-3 py-1 rounded-full border border-amber-700/50">
          Cronômetro Automático
        </span>

        <span className="text-xs font-semibold text-slate-300">
          Iniciado ao abrir a tela
        </span>
      </div>

      <div className="text-center py-4 space-y-1">
        <p className="text-xs font-bold text-slate-400 tracking-wider uppercase">
          TEMPO DA CONVULSÃO
        </p>
        <div className="text-5xl sm:text-6xl font-black font-mono tracking-tight text-amber-300 drop-shadow-md">
          {formatTime(seconds)}
        </div>
      </div>

      {/* 5 Minute Threshold Warning */}
      <div
        className={`p-4 rounded-2xl border text-sm font-semibold flex items-start gap-3 ${
          isOver5Minutes
            ? 'bg-red-600 text-white border-white shadow-lg'
            : 'bg-amber-900/40 text-amber-200 border-amber-600/50'
        }`}
      >
        <AlertTriangle className={`w-6 h-6 shrink-0 ${isOver5Minutes ? 'text-white animate-bounce' : 'text-amber-400'}`} />
        <div className="space-y-1">
          <p className="font-extrabold uppercase text-xs tracking-wider">
            {isOver5Minutes ? 'ALERTA CRÍTICO: MAIS DE 5 MINUTOS' : 'REGRA DE OURO'}
          </p>
          <p className="text-sm leading-snug">
            {isOver5Minutes ? (
              <strong>A crise atingiu 5 minutos. Trate como emergência médica grave! Ligue 192 imediatamente!</strong>
            ) : (
              'SE A CONVULSÃO DURAR 5 MINUTOS OU MAIS, TRATE COMO UMA EMERGÊNCIA IMEDIATA.'
            )}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 flex items-center justify-between gap-2 pt-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsRunning(!isRunning)}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 border border-slate-700"
          >
            {isRunning ? (
              <>
                <Pause className="w-3.5 h-3.5 text-amber-400" /> Pausar
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-emerald-400" /> Continuar
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              setSeconds(0);
              setHasTriggered5MinAlert(false);
            }}
            className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs border border-slate-700 text-slate-300"
            title="Reiniciar cronômetro"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {onCallSamu && (
          <button
            type="button"
            onClick={onCallSamu}
            className="px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-black flex items-center gap-2 shadow-md shadow-red-600/30"
          >
            <PhoneCall className="w-3.5 h-3.5" /> Ligar SAMU 192
          </button>
        )}
      </div>

      {/* Post-seizure reassurance */}
      <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-300 flex items-start gap-2">
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <p>
          Após o término da convulsão: quando for seguro, vire a pessoa suavemente de lado (posição lateral de segurança) e observe a respiração.
        </p>
      </div>
    </div>
  );
};
