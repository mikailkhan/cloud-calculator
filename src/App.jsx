import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import CalculatorForm from './components/CalculatorForm';
import CostComparisonView from './components/CostComparisonView';
import ConversionBanner from './components/ConversionBanner';
import { calculateCosts } from './utils/pricingLogic';
import { trackAffiliateClick, trackCalculation } from './utils/analytics';
import { Rocket } from 'lucide-react';

function App() {
  const [requests, setRequests] = useState(250000);
  const [dbTier, setDbTier] = useState('medium');
  const [stackConfig, setStackConfig] = useState({
    frontend: true,
    api: true,
    db: true
  });

  const costs = useMemo(() => calculateCosts(requests, dbTier, stackConfig), [requests, dbTier, stackConfig]);

  // Debounced tracking for calculator adjustments
  useEffect(() => {
    const timer = setTimeout(() => {
      trackCalculation(requests, dbTier, stackConfig);
    }, 1200);
    return () => clearTimeout(timer);
  }, [requests, dbTier, stackConfig]);

  return (
    <div className="min-h-screen bg-zinc-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.1),rgba(255,255,255,0))] font-sans overflow-x-hidden selection:bg-emerald-500/30">
      {/* Top Announcement Bar */}
      <div className="w-full bg-emerald-500/10 border-b border-emerald-500/20 py-2.5 px-4 text-center">
        <p className="text-emerald-400 text-sm font-medium">
          🔥 Limited Time: Get <strong className="text-emerald-300 font-bold">20% off your first plan</strong> when deploying via our calculator below.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 pb-28 md:py-12 md:pb-16">
        <Header />
        
        <div className="relative">
          {/* Subtle background glow effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none"></div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-5">
              <CalculatorForm 
                requests={requests} 
                setRequests={setRequests} 
                dbTier={dbTier} 
                setDbTier={setDbTier}
                stackConfig={stackConfig}
                setStackConfig={setStackConfig}
              />
            </div>
            
            <div className="lg:col-span-7">
              <CostComparisonView costs={costs} />
              <ConversionBanner costs={costs} />
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Mobile CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-zinc-950/80 backdrop-blur-xl border-t border-zinc-800 z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        <a 
          href="https://www.hostinger.com/pk?REFERRALCODE=9F2KHANMIN6W"
          target="_blank" 
          rel="noopener noreferrer"
          onClick={() => trackAffiliateClick('mobile_sticky_cta', { vps_tier: costs?.vpsTierName })}
          className="flex items-center justify-center w-full py-3.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-white text-base font-bold rounded-xl transition-colors shadow-[0_0_15px_-3px_rgba(16,185,129,0.4)]"
        >
          <span className="flex items-center">
            Deploy & Claim <span className="bg-white text-emerald-600 px-1.5 py-0.5 rounded text-xs mx-1.5 uppercase font-bold">20% Off</span>
          </span>
          <Rocket className="w-5 h-5 ml-1" />
        </a>
      </div>
    </div>
  );
}

export default App;
