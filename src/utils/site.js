/** Absolute site origin used for canonical/OG URLs. */
export function getSiteUrl() {
  const configured = import.meta.env.VITE_SITE_URL;
  if (configured) return configured.replace(/\/$/, '');
  if (typeof window !== 'undefined') return window.location.origin;
  return '';
}

export function absoluteUrl(path) {
  return `${getSiteUrl()}${path.startsWith('/') ? path : `/${path}`}`;
}
