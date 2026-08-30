export function calculateCosts(monthlyRequests, dbTier, stackLayers = { frontend: true, api: true, db: true }) {
  let totalPaasMonthly = 0;
  
  // Calculate base multipliers based on selected stack layers
  const activeLayers = (stackLayers.frontend ? 1 : 0) + (stackLayers.api ? 1 : 0) + (stackLayers.db ? 1 : 0);

  // Phase 1: Hobby / Free Tiers
  if (monthlyRequests <= 50000) {
    totalPaasMonthly = dbTier === 'heavy' ? 15 : 0; 
  } 
  // Phase 2: Pro Subscriptions Kick In
  else if (monthlyRequests > 50000 && monthlyRequests <= 500000) {
    const basePaaS = (stackLayers.frontend ? 20 : 0) + (stackLayers.api ? 15 : 0) + (stackLayers.db ? 25 : 0);
    const dbSurcharge = dbTier === 'heavy' ? 20 : (dbTier === 'medium' ? 10 : 0);
    totalPaasMonthly = basePaaS + dbSurcharge + ((monthlyRequests / 100000) * 2);
  } 
  // Phase 3: Enterprise Overages & Bandwidth Penalties
  else {
    const basePaaS = 60; // Assumes all pro tiers active
    const overageMultiplier = Math.ceil((monthlyRequests - 500000) / 100000);
    const bandwidthPenalty = overageMultiplier * 12; // Exponential bandwidth cost
    const dbSurcharge = dbTier === 'heavy' ? 80 : 40;
    
    totalPaasMonthly = basePaaS + bandwidthPenalty + dbSurcharge;
  }

  // VPS remains flat-rate based on traffic thresholds
  let vpsMonthly = 4.99; // Default KVM 1
  let vpsTierName = "KVM 1 (4TB Bandwidth)";
  
  if (monthlyRequests > 500000 && monthlyRequests <= 2000000) {
    vpsMonthly = 6.99; // KVM 2
    vpsTierName = "KVM 2 (8TB Bandwidth)";
  } else if (monthlyRequests > 2000000) {
    vpsMonthly = 14.99; // KVM 4
    vpsTierName = "KVM 4 (16TB Bandwidth)";
  }

  // If no stack layers are selected, the cost is 0
  if (!stackLayers.frontend && !stackLayers.api && !stackLayers.db) {
    totalPaasMonthly = 0;
    vpsMonthly = 0;
  }

  const annualSavings = (totalPaasMonthly * 12) - (vpsMonthly * 12);

  return {
    paasMonthly: Math.round(totalPaasMonthly),
    paasAnnual: Math.round(totalPaasMonthly * 12),
    vpsMonthly: vpsMonthly,
    vpsAnnual: Math.round(vpsMonthly * 12),
    vpsTierName,
    annualSavings: Math.max(0, Math.round(annualSavings)),
    costEfficiency: totalPaasMonthly > (vpsMonthly * 3) ? 'Poor' : 'Good'
  };
}
