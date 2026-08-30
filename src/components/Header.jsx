import React from 'react';
import { Cloud, Zap } from 'lucide-react';

export default function Header() {
  return (
    <div className="text-center mb-10 mt-6 md:mt-12">
      <div className="inline-flex items-center justify-center p-3 mb-6 rounded-2xl bg-zinc-800/80 border border-zinc-700/50 shadow-inner backdrop-blur-md">
        <Cloud className="w-8 h-8 text-emerald-400 mr-2 drop-shadow-[0_0_10px_rgba(52,211,153,0.4)]" />
        <Zap className="w-8 h-8 text-zinc-300" />
      </div>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
        The Cloud Tax <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Calculator</span>
      </h1>
      <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto font-medium leading-relaxed px-4">
        Stop paying the "managed cloud tax." Compare the true cost of scaling on PaaS versus owning your infrastructure on a raw VPS.
      </p>
    </div>
  );
}
