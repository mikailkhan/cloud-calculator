import React from 'react';
import { Database, Layout, Server, Activity, ArrowRight, ArrowDown } from 'lucide-react';

export default function CalculatorForm({ 
  requests, 
  setRequests, 
  dbTier, 
  setDbTier, 
  stackConfig, 
  setStackConfig 
}) {
  
  const handleStackToggle = (key) => {
    setStackConfig(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="bg-zinc-800/40 rounded-3xl p-6 md:p-8 border border-zinc-700/50 backdrop-blur-xl relative z-10 shadow-2xl">
      
      {/* Requests Slider */}
      <div className="mb-10">
        <div className="flex justify-between items-end mb-4">
          <label className="text-white font-medium flex items-center text-lg">
            <Activity className="w-5 h-5 mr-2 text-emerald-400" />
            Monthly Requests / Page Views
          </label>
          <span className="text-2xl font-bold text-white bg-zinc-900/80 px-4 py-1.5 rounded-xl border border-zinc-700 shadow-inner">
            {(requests / 1000).toFixed(0)}k
          </span>
        </div>
        
        <div className="relative pt-2">
          <input 
            type="range" 
            min="10000" 
            max="5000000" 
            step="10000"
            value={requests}
            onChange={(e) => setRequests(Number(e.target.value))}
            className="w-full h-3 bg-zinc-900 rounded-lg appearance-none cursor-pointer accent-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 shadow-inner"
          />
          <div className="flex justify-between text-xs text-zinc-500 mt-3 font-medium px-1">
            <span>10k</span>
            <span>2.5M</span>
            <span>5M+</span>
          </div>
        </div>
      </div>

      {/* Database Intensity */}
      <div className="mb-8">
        <label className="text-white font-medium mb-4 flex items-center text-lg">
          <Database className="w-5 h-5 mr-2 text-cyan-400" />
          Database Intensity
        </label>
        <div className="grid grid-cols-3 gap-3">
          {['light', 'medium', 'heavy'].map((tier) => (
            <button
              key={tier}
              onClick={() => setDbTier(tier)}
              className={`py-3 px-2 rounded-xl text-sm font-medium transition-all duration-200 border ${
                dbTier === tier 
                  ? 'bg-cyan-500/10 border-cyan-400/50 text-cyan-300 shadow-[0_0_20px_-5px_rgba(34,211,238,0.3)]' 
                  : 'bg-zinc-900/60 border-zinc-700/50 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300'
              }`}
            >
              {tier.charAt(0).toUpperCase() + tier.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Architecture Stack */}
      <div>
        <label className="text-white font-medium mb-4 flex items-center text-lg">
          <Layout className="w-5 h-5 mr-2 text-purple-400" />
          Architecture Stack Layers
        </label>
        <div className="flex flex-wrap gap-3">
          <label className="flex-1 min-w-[130px] flex items-center space-x-3 bg-zinc-900/60 p-3.5 rounded-xl border border-zinc-700/50 cursor-pointer hover:bg-zinc-800 transition-colors group">
            <input 
              type="checkbox" 
              checked={stackConfig.frontend}
              onChange={() => handleStackToggle('frontend')}
              className="w-5 h-5 rounded border-zinc-600 text-emerald-500 focus:ring-emerald-500/50 bg-zinc-800 cursor-pointer shrink-0"
            />
            <span className="text-zinc-300 text-sm font-medium group-hover:text-white transition-colors truncate">Frontend</span>
          </label>
          <label className="flex-1 min-w-[130px] flex items-center space-x-3 bg-zinc-900/60 p-3.5 rounded-xl border border-zinc-700/50 cursor-pointer hover:bg-zinc-800 transition-colors group">
            <input 
              type="checkbox" 
              checked={stackConfig.api}
              onChange={() => handleStackToggle('api')}
              className="w-5 h-5 rounded border-zinc-600 text-emerald-500 focus:ring-emerald-500/50 bg-zinc-800 cursor-pointer shrink-0"
            />
            <span className="text-zinc-300 text-sm font-medium flex items-center group-hover:text-white transition-colors truncate">
              <Server className="w-4 h-4 mr-1.5 text-zinc-500 group-hover:text-zinc-400 shrink-0" /> API
            </span>
          </label>
          <label className="flex-1 min-w-[130px] flex items-center space-x-3 bg-zinc-900/60 p-3.5 rounded-xl border border-zinc-700/50 cursor-pointer hover:bg-zinc-800 transition-colors group">
            <input 
              type="checkbox" 
              checked={stackConfig.db}
              onChange={() => handleStackToggle('db')}
              className="w-5 h-5 rounded border-zinc-600 text-emerald-500 focus:ring-emerald-500/50 bg-zinc-800 cursor-pointer shrink-0"
            />
            <span className="text-zinc-300 text-sm font-medium flex items-center group-hover:text-white transition-colors truncate">
              <Database className="w-4 h-4 mr-1.5 text-zinc-500 group-hover:text-zinc-400 shrink-0" /> Database
            </span>
          </label>
        </div>
      </div>

      {/* Directional Arrow between cards */}
      <div className="absolute left-1/2 bottom-[-1rem] translate-y-1/2 lg:bottom-auto lg:left-auto lg:right-[-1.5rem] lg:top-1/2 lg:-translate-y-1/2 -translate-x-1/2 lg:translate-x-1/2 z-20 flex items-center justify-center w-12 h-12 bg-zinc-900 rounded-full border border-zinc-700 shadow-xl">
        <ArrowRight className="hidden lg:block w-6 h-6 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]" />
        <ArrowDown className="block lg:hidden w-6 h-6 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]" />
      </div>
    </div>
  );
}
