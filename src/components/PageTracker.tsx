import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { hasConsent } from '../hooks/useConsent';

declare global {
  interface Window {
    gtag: (command: string, ...args: unknown[]) => void;
  }
}

function PageTracker() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.gtag !== 'undefined' && hasConsent()) {
      window.gtag('config', 'G-G0H6Q3S8Q2', {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return null;
}

export { PageTracker };