/**
 * Google Analytics 4 (GA4) Integration Utility
 * 
 * Safely manages Google Analytics tracking:
 * - Uses VITE_GA_MEASUREMENT_ID from environment variables (safe for public GitHub)
 * - Suppresses tracking in development mode to avoid polluting production metrics
 * - Provides helpers for custom events (e.g. affiliate CTA clicks, calculation changes)
 */

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
const isDev = import.meta.env.DEV;
const isDebugMode = import.meta.env.VITE_GA_DEBUG === 'true';

let isInitialized = false;

/**
 * Checks if the GA Measurement ID is valid and configured
 */
export const isGAConfigured = () => {
  return (
    typeof GA_MEASUREMENT_ID === 'string' &&
    GA_MEASUREMENT_ID.startsWith('G-') &&
    GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX'
  );
};

/**
 * Initialize Google Analytics 4
 */
export const initGA = () => {
  if (isInitialized) return;

  if (!isGAConfigured()) {
    if (isDev) {
      console.info(
        '[GA4] Measurement ID not configured or is placeholder. To enable tracking, set VITE_GA_MEASUREMENT_ID in .env'
      );
    }
    return;
  }

  // Prevent local development hits from polluting production data unless VITE_GA_DEBUG=true
  if (isDev && !isDebugMode) {
    console.info(
      `[GA4] Dev mode active. Initialized with ID: ${GA_MEASUREMENT_ID} (events logged to console).\nSet VITE_GA_DEBUG=true in .env.local if you wish to send live events to GA4 DebugView.`
    );
    isInitialized = true;
    return;
  }

  try {
    // Inject the gtag script asynchronously
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`;
    document.head.appendChild(script);

    // Initialize dataLayer and gtag function
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
      send_page_view: true,
      anonymize_ip: true,
      debug_mode: isDebugMode,
    });

    isInitialized = true;
  } catch (error) {
    console.error('[GA4] Failed to initialize Google Analytics:', error);
  }
};

/**
 * Dispatch a custom event to GA4
 * @param {string} eventName 
 * @param {Record<string, any>} params 
 */
export const trackEvent = (eventName, params = {}) => {
  if (isDev) {
    console.debug(`[GA4 Debug Event] "${eventName}":`, params);
  }

  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
};

/**
 * Track affiliate link clicks (Hostinger referral)
 * @param {string} placement - e.g. 'main_banner', 'mobile_sticky_cta'
 * @param {Record<string, any>} extraParams - optional context like estimated cost or tier
 */
export const trackAffiliateClick = (placement, extraParams = {}) => {
  trackEvent('affiliate_click', {
    partner: 'Hostinger',
    placement,
    destination_url: 'https://www.hostinger.com/pk?REFERRALCODE=9F2KHANMIN6W',
    ...extraParams,
  });
};

/**
 * Track calculator usage
 * @param {number} requests
 * @param {string} dbTier
 * @param {Record<string, boolean>} stackConfig
 */
export const trackCalculation = (requests, dbTier, stackConfig) => {
  trackEvent('calculate_hosting_cost', {
    requests_count: requests,
    db_tier: dbTier,
    has_frontend: stackConfig?.frontend,
    has_api: stackConfig?.api,
    has_db: stackConfig?.db,
  });
};
