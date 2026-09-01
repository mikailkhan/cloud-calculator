import React from 'react';
import { Rocket } from 'lucide-react';
import { trackAffiliateClick } from '../utils/analytics';

export default function ConversionBanner({ costs }) {
  const getHostingerLink = () => {
    // UTM parameters for Reddit ads as specified in the PRD
    return "https://www.hostinger.com/pk?REFERRALCODE=9F2KHANMIN6W";
  };

  const bandwidth = costs.vpsTierName.match(/\((.*?)\)/)?.[1] || "Bandwidth";
  const discountedPrice = (costs.vpsMonthly * 0.8).toFixed(2);

  return (
    <div className="mt-8 border-t border-zinc-700/50 pt-8 pb-4 relative z-10">
      <div className="flex flex-col items-center">
        <a 
          href={getHostingerLink()} 
          target="_blank" 
          rel="noopener noreferrer"
          onClick={() => trackAffiliateClick('main_conversion_banner', { 
            vps_tier: costs?.vpsTierName, 
            discounted_price: discountedPrice,
            bandwidth: bandwidth,
          })}
          className="group relative inline-flex items-center justify-center px-6 py-4 md:px-8 md:py-5 font-bold text-white transition-all duration-300 bg-emerald-500 rounded-2xl hover:bg-emerald-400 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 focus:ring-offset-zinc-900 shadow-[0_0_20px_-5px_rgba(16,185,129,0.5)] hover:shadow-[0_0_40px_-5px_rgba(16,185,129,0.7)] w-full sm:w-auto"
        >
          <span className="absolute inset-0 w-full h-full -mt-1 rounded-2xl opacity-30 bg-gradient-to-b from-transparent via-transparent to-black pointer-events-none"></span>
          
          <Rocket className="w-6 h-6 mr-3 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300 drop-shadow-md" />
          
          <span className="relative text-lg md:text-xl drop-shadow-sm flex flex-col md:flex-row items-center">
            Deploy on Hostinger 
            <span className="hidden md:inline mx-2">—</span>
            <span className="mt-1 md:mt-0 flex items-center">
              Claim <span className="bg-white text-emerald-600 px-2 py-0.5 rounded-md text-sm ml-2 mr-1 uppercase tracking-wider font-extrabold shadow-[0_0_10px_rgba(255,255,255,0.5)]">20% Off</span>
            </span>
          </span>
        </a>
        
        <p className="mt-6 text-xs text-zinc-500 text-center max-w-md leading-relaxed">
          Disclosure: We earn an affiliate commission if you sign up via our Hostinger link, which keeps this calculator free and unbiased.
        </p>
      </div>
    </div>
  );
}
