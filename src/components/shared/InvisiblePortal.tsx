"use client";

import React, { useEffect, useState } from 'react';
import { ViewState } from '@/types';
import { ScanFace, Check, ArrowLeft, ShieldCheck } from 'lucide-react';

interface InvisiblePortalProps {
  setView: (view: ViewState) => void;
}

export const InvisiblePortal: React.FC<InvisiblePortalProps> = ({ setView }) => {
  const [status, setStatus] = useState<'scanning' | 'verifying' | 'success'>('scanning');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate scanning process
    if (status === 'scanning') {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setStatus('verifying');
            return 100;
          }
          return prev + 2;
        });
      }, 50);
      return () => clearInterval(interval);
    }

    if (status === 'verifying') {
      const timer = setTimeout(() => {
        setStatus('success');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [status]);

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-midnight flex flex-col items-center justify-center p-6 text-center animate-fade-in">
        <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.4)] mb-8">
          <Check size={48} className="text-white" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Identidad Verificada</h2>
        <p className="text-slate-400 mb-8 max-w-xs mx-auto">Tu firma digital ha sido autorizada exitosamente.</p>

        <div className="bg-surface-dark border border-white/10 rounded-xl p-4 w-full max-w-sm mb-8">
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="text-brand" size={20} />
            <span className="text-white font-medium">Hash Generado</span>
          </div>
          <code className="text-xs text-slate-500 font-mono break-all">
            8f92-a1b2-c3d4-e5f6-7890-1234-5678-9abc
          </code>
        </div>

        <button
          onClick={() => setView(ViewState.DASHBOARD_HOME)}
          className="bg-white text-midnight font-bold py-3 px-8 rounded-full hover:bg-slate-200 transition-colors"
        >
          Continuar al Portal
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-midnight relative overflow-hidden flex flex-col items-center">
      {/* Top Bar */}
      <div className="w-full p-4 flex justify-between items-center z-20">
        <button onClick={() => setView(ViewState.LANDING)} className="text-white/50 hover:text-white">
          <ArrowLeft size={24} />
        </button>
        <span className="text-xs font-mono text-brand/80 uppercase tracking-widest">Enext Secure Env</span>
        <div className="w-6"></div>
      </div>

      {/* Main Scanner Area */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md relative z-10">

        {/* Scanning Circle */}
        <div className="relative w-72 h-72 mb-12">
          {/* Rings */}
          <div className="absolute inset-0 rounded-full border border-brand/20 animate-ping-slow"></div>
          <div className="absolute inset-4 rounded-full border-2 border-brand/40 border-t-brand animate-spin-slow"></div>
          <div className="absolute inset-0 rounded-full bg-brand/5 backdrop-blur-sm"></div>

          {/* Center Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <ScanFace size={80} className={`text-white transition-opacity duration-500 ${progress % 20 < 10 ? 'opacity-100' : 'opacity-70'}`} />
          </div>

          {/* Scan Line */}
          <div className="absolute left-0 right-0 h-1 bg-accent/80 shadow-[0_0_15px_#F59E0B] animate-scan"></div>
        </div>

        {/* Status Text */}
        <div className="text-center space-y-4 px-6">
          <h2 className="text-2xl font-bold text-white">
            {status === 'scanning' ? 'Escaneando Biometría...' : 'Verificando con IA...'}
          </h2>
          <p className="text-slate-400 text-sm">
            Por favor, mantén tu rostro dentro del círculo y no te muevas.
          </p>
        </div>

        {/* Fake Camera Feed Background (Conceptual) */}
        <div className="absolute inset-0 -z-10 opacity-20 bg-[url('https://images.unsplash.com/photo-1544365558-35aa4afcf11f?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center grayscale mix-blend-overlay"></div>
      </div>

      {/* Bottom Progress */}
      <div className="w-full p-8 z-20">
        <div className="w-full bg-surface-dark h-2 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand transition-all duration-100 ease-out shadow-[0_0_10px_#5E48E8]"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-center text-xs text-slate-500 mt-3 font-mono">
          {Math.min(progress, 99)}% COMPLETE
        </p>
      </div>
    </div>
  );
};
