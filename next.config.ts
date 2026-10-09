import type { NextConfig } from 'next';

const FALLBACK_SITE_URL = 'https://example.com';

function siteOrigin(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim() || FALLBACK_SITE_URL;
  try {
    return new URL(raw).origin;
  } catch {
    return FALLBACK_SITE_URL;
  }
}

const APEX_ORIGIN = siteOrigin();
const APEX_HOST = new URL(APEX_ORIGIN).hostname;
const WWW_HOST = `www.${APEX_HOST}`;

const isDev = process.env.NODE_ENV === 'development';

/**
 * Enforced CSP for this marketing site.
 *
 * Third-party hosts are limited to what production actually loads:
 * Speed Insights beacons to vitals.vercel-insights.com (script is same-origin).
 *
 * Next.js still emits inline hydration scripts and some inline styles, so
 * 'unsafe-inline' is required. Production does not need 'unsafe-eval'.
 */
function contentSecurityPolicy(): string {
  const scriptSrc = [
    "'self'",
    "'unsafe-inline'",
    ...(isDev ? ["'unsafe-eval'", 'https://va.vercel-scripts.com'] : []),
  ];

  const connectSrc = [
    "'self'",
    'https://vitals.vercel-insights.com',
    ...(isDev ? ['https://va.vercel-scripts.com', 'ws:', 'wss:'] : []),
  ];

  return [
    "default-src 'self'",
    `script-src ${scriptSrc.join(' ')}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self'",
    `connect-src ${connectSrc.join(' ')}`,
    "worker-src 'self' blob:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-src 'none'",
    "frame-ancestors 'none'",
    ...(isDev ? [] : ['upgrade-insecure-requests']),
  ].join('; ');
}

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  { key: 'Content-Security-Policy', value: contentSecurityPolicy() },
];

const nextConfig: NextConfig = {
  // Phone / LAN HMR: private LAN ranges (WSL NAT → portproxy)
  allowedDevOrigins: ['192.168.*.*', '10.*.*.*', '172.*.*.*'],
  images: {
    localPatterns: [{ pathname: '/media/**' }],
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: WWW_HOST }],
        destination: `${APEX_ORIGIN}/:path*`,
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
      {
        // Vercel CDN adds Access-Control-Allow-Origin: * on prerendered/static
        // files. That is unintentional on HTML. The header cannot be deleted
        // (platform injects it after app code); override document/app routes
        // so they are not '*'. Leave /_next and /media alone so Next.js font
        // preloads (crossorigin) keep working. /api is same-origin only.
        source: '/((?!_next/|media/|api/).*)',
        headers: [{ key: 'Access-Control-Allow-Origin', value: APEX_ORIGIN }],
      },
    ];
  },
};

export default nextConfig;
