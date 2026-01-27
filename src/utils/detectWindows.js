// Detect Windows platform for performance optimizations
export const isWindows = () => {
  if (typeof window === 'undefined') return false;
  return /Windows/.test(navigator.userAgent);
};

// Detect Chrome browser
export const isChrome = () => {
  if (typeof window === 'undefined') return false;
  return /Chrome/.test(navigator.userAgent) && !/Edge/.test(navigator.userAgent);
};

// Check if running Windows Chrome (most common lag scenario)
export const isWindowsChrome = () => {
  return isWindows() && isChrome();
};

// Get optimized settings for Windows Chrome
export const getOptimizedSettings = (isMobile) => {
  const isWinChrome = isWindowsChrome();
  
  return {
    // LiquidEther optimizations
    resolution: isWinChrome ? (isMobile ? 0.3 : 0.4) : (isMobile ? 0.35 : 0.5),
    iterationsViscous: isWinChrome ? (isMobile ? 20 : 28) : (isMobile ? 24 : 32),
    iterationsPoisson: isWinChrome ? (isMobile ? 20 : 28) : (isMobile ? 24 : 32),
    autoSpeed: isWinChrome ? (isMobile ? 0.3 : 0.4) : (isMobile ? 0.4 : 0.5),
    
    // Scroll optimizations
    usePassiveScroll: isWinChrome,
    reducedMotion: false
  };
};
