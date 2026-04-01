const CONSENT_KEY = 'cookie_consent';

export type ConsentValue = 'accepted' | 'declined' | undefined;

declare global {
  interface Window {
    gtag: (command: string, ...args: unknown[]) => void;
    dataLayer: unknown[];
    'ga-disable-G-D402TTELPP': boolean;
  }
}

export function hasConsent(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(CONSENT_KEY) === 'accepted';
}

export function hasDeclined(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(CONSENT_KEY) === 'declined';
}

export function getConsent(): ConsentValue {
  if (typeof window === 'undefined') return undefined;
  const stored = localStorage.getItem(CONSENT_KEY);
  if (stored === 'accepted') return 'accepted';
  if (stored === 'declined') return 'declined';
  return undefined;
}

export function grantConsent(): void {
  localStorage.setItem(CONSENT_KEY, 'accepted');
}

export function revokeConsent(): void {
  localStorage.setItem(CONSENT_KEY, 'declined');
}