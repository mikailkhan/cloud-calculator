import React from 'react';
import { TrendingDown, Server, CloudOff, AlertCircle, Info, Rocket } from 'lucide-react';

export default function CostComparisonView({ costs }) {
  return (
    <div className="bg-zinc-800/40 rounded-3xl p-6 md:p-8 border border-zinc-700/50 backdrop-blur-xl relative overflow-hidden">
      
      {/* Decorative gradient orb */}
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
        <TrendingDown className="w-5 h-5 mr-2 text-emerald-400" />
        Cost Breakdown
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        {/* PaaS Card */}
        <div className="bg-zinc-900/80 rounded-2xl p-6 border border-zinc-700/80 relative group transition-all duration-300 hover:border-rose-500/30 hover:shadow-[0_0_30px_-10px_rgba(244,63,94,0.1)]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-zinc-400 font-medium flex items-center">
              <CloudOff className="w-4 h-4 mr-2" />
              Managed PaaS Stack
              <div className="relative ml-2 group/tooltip">
                <Info className="w-4 h-4 text-zinc-500 cursor-help hover:text-zinc-300 transition-colors" />
                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 p-3 bg-zinc-800 border border-zinc-700 rounded-xl text-xs text-zinc-300 opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-50 shadow-xl">
                  Calculation assumes Vercel Pro ($20/mo) + Render API ($20/mo) + Supabase Pro ($25/mo), scaling with $15 per 500k request overage and $0.05/GB for excess bandwidth.
                  <div className="absolute left-1/2 -translate-x-1/2 top-full w-2 h-2 bg-zinc-800 border-b border-r border-zinc-700 rotate-45 -mt-1"></div>
                </div>
              </div>
            </span>
          </div>
          <div className="flex items-baseline mb-1">
            <span className="text-4xl font-bold text-white">${costs.paasMonthly}</span>
            <span className="text-zinc-500 ml-2">/mo</span>
          </div>
          <p className="text-sm text-zinc-500">Estimated ${costs.paasAnnual.toLocaleString()}/year</p>
          
          <div className="mt-6 pt-6 border-t border-zinc-800">
             <div className="w-full bg-zinc-800 rounded-full h-1.5 mb-2 overflow-hidden">
               <div className={`h-1.5 rounded-full transition-all duration-500 ${costs.costEfficiency === 'Poor' ? 'bg-gradient-to-r from-orange-500 to-rose-500 w-[90%]' : 'bg-gradient-to-r from-emerald-400 to-emerald-500 w-[30%]'}`}></div>
             </div>
             <p className="text-xs text-zinc-400 flex justify-between">
               <span>Cost efficiency</span>
               <span className={`font-medium ${costs.costEfficiency === 'Poor' ? 'text-rose-400' : 'text-emerald-400'}`}>{costs.costEfficiency}</span>
             </p>
          </div>
        </div>

        {/* VPS Card */}
        <div className="bg-gradient-to-b from-emerald-900/20 to-zinc-900/80 rounded-2xl p-6 border border-emerald-500/30 relative overflow-hidden shadow-[0_0_40px_-15px_rgba(16,185,129,0.15)] group transition-all duration-300 hover:border-emerald-500/60 hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.25)]">
          <div className="absolute top-0 right-0 px-3 py-1 bg-gradient-to-r from-emerald-500/20 to-emerald-400/10 text-emerald-400 text-xs font-semibold rounded-bl-xl border-b border-l border-emerald-500/20 backdrop-blur-md">
            Recommended
          </div>
          <div className="flex items-center justify-between mb-4 mt-2">
            <span className="text-emerald-400 font-medium flex items-center">
              <Server className="w-4 h-4 mr-2" />
              Self-Hosted VPS
            </span>
          </div>
          <div className="flex items-baseline mb-1">
            <span className="text-4xl font-bold text-white">${costs.vpsMonthly}</span>
            <span className="text-zinc-500 ml-2">/mo</span>
          </div>
          <div className="mb-2 flex items-center">
             <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
               Includes 20% off your first plan
             </span>
          </div>
          <p className="text-sm text-zinc-500 mb-2">Estimated ${costs.vpsAnnual.toLocaleString()}/year</p>
          
          <div className="mt-4 pt-4 border-t border-emerald-900/30">
            <p className="text-sm text-zinc-300 font-medium flex items-center truncate mb-4" title={costs.vpsTierName}>
              <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse"></span>
              {costs.vpsTierName}
            </p>
            
            <a 
              href="https://www.hostinger.com/vps-hosting?utm_source=reddit&utm_medium=cpc&utm_campaign=vps_calc"
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full py-2.5 px-4 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-sm font-semibold rounded-xl border border-emerald-500/30 transition-all duration-200"
            >
              Deploy Now <Rocket className="w-4 h-4 ml-2" />
            </a>
          </div>
        </div>
      </div>

      {/* Bill Shock Callout */}
      <div className="mt-8 bg-zinc-900/50 rounded-2xl p-6 border border-rose-500/20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-500/5 via-transparent to-rose-500/5 pointer-events-none"></div>
        <AlertCircle className="w-8 h-8 text-rose-500/80 mx-auto mb-3" />
        <p className="text-zinc-300 text-lg md:text-xl font-medium">
          You are projected to waste <span className="text-rose-400 font-bold text-2xl md:text-3xl mx-2 drop-shadow-[0_0_8px_rgba(244,63,94,0.4)]">${costs.annualSavings.toLocaleString()}</span> a year on managed cloud taxes.
          <br className="hidden md:block" />
          <span className="text-emerald-400 font-semibold mt-2 inline-block">Lock in your VPS with 20% off today.</span>
        </p>
      </div>
    </div>
  );
}
