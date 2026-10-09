import type { Metadata } from 'next';
import { LegalPageLayout } from '@/components/layout/legal-page-layout';
import { AnfrageForm } from '@/components/forms/anfrage-form';
import { anfrageDescription } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Anfrage',
  description: anfrageDescription,
  alternates: {
    canonical: '/anfrage',
  },
};

export default function AnfragePage() {
  return (
    <LegalPageLayout title="Anfrage" wide>
      <p>
        Kurze Nachricht genügt. Wir melden uns unverbindlich mit den nächsten
        Schritten.
      </p>
      <AnfrageForm />
    </LegalPageLayout>
  );
}
