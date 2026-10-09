import { COMPANY } from '@/lib/company';
import { CONTACT_EMAIL } from '@/lib/contact';

const FALLBACK_SITE_URL = 'https://example.com';

function resolveSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return FALLBACK_SITE_URL;
  try {
    return new URL(raw).origin;
  } catch {
    return FALLBACK_SITE_URL;
  }
}

export const SITE_URL = resolveSiteUrl();
export const SITE_NAME = COMPANY.name;

/** Homepage - absolute title (no template suffix). */
export const homeTitle = 'Starter | Marketing site boilerplate';

export const homeDescription =
  'Lightweight marketing homepage, shadcn UI, SEO, legal shells and optional Anfrage. Ready to rebrand in minutes.';

export const anfrageDescription =
  'Unverbindliche Anfrage an Starter. Schreiben Sie uns Ihr Anliegen. Wir melden uns mit den nächsten Schritten.';

export const impressumDescription =
  'Impressum und rechtliche Angaben der Starter GmbH.';

export const datenschutzDescription =
  'Datenschutzerklärung der Starter GmbH gemäß DSGVO.';

/** Service names for JSON-LD (mirrors feature tiles on the homepage). */
export const SEO_SERVICES = [
  'Hero',
  'Sections',
  'Forms',
  'SEO',
  'Legal',
  'Deploy',
] as const;

export function getOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService'],
    name: SITE_NAME,
    url: SITE_URL,
    email: CONTACT_EMAIL,
    logo: `${SITE_URL}/media/img/logo-wordmark.svg`,
    image: `${SITE_URL}/media/img/logo-wordmark.svg`,
    description: homeDescription,
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY.street,
      postalCode: '1010',
      addressLocality: 'Wien',
      addressCountry: 'AT',
    },
    areaServed: [{ '@type': 'Country', name: 'AT' }],
    knowsAbout: [...SEO_SERVICES],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Features',
      itemListElement: SEO_SERVICES.map((service, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service,
        },
        position: index + 1,
      })),
    },
  } as const;
}
