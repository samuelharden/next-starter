export const COMPANY = {
  name: 'Starter GmbH',
  street: 'Musterstraße 1',
  city: '1010 Wien',
  uid: 'ATU 00000000',
  fn: 'FN 000000 a',
  registerCourt: 'Handelsgericht Wien',
  representative: 'Max Mustermann',
  businessPurpose:
    'Entwicklung und Betrieb digitaler Produkte, Websites und digitaler Dienstleistungen',
} as const;

export const COMPANY_ADDRESS = `${COMPANY.street}, ${COMPANY.city}`;
