import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPageLayout } from '@/components/layout/legal-page-layout';
import { CONTACT_EMAIL } from '@/lib/contact';
import { COMPANY } from '@/lib/company';
import { impressumDescription } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Impressum',
  description: impressumDescription,
  alternates: {
    canonical: '/impressum',
  },
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-variable text-xl font-bold text-ink uppercase">
        {title}
      </h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}

export default function ImpressumPage() {
  return (
    <LegalPageLayout title="Impressum">
      <Section title="Angaben gemäß § 5 ECG">
        <p>
          <strong className="text-ink">{COMPANY.name}</strong>
          <br />
          {COMPANY.street}
          <br />
          {COMPANY.city}
          <br />
          Österreich
        </p>
        <p>
          E-Mail:{' '}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-ink underline decoration-ink/30 underline-offset-2 transition-colors hover:decoration-ink/60"
          >
            {CONTACT_EMAIL}
          </a>
        </p>
      </Section>

      <Section title="Unternehmensgegenstand">
        <p>{COMPANY.businessPurpose}</p>
      </Section>

      <Section title="UID-Nummer">
        <p>{COMPANY.uid}</p>
      </Section>

      <Section title="Firmenbuch">
        <p>
          Firmenbuchnummer: {COMPANY.fn}
          <br />
          Firmenbuchgericht: {COMPANY.registerCourt}
        </p>
      </Section>

      <Section title="Gesetzlicher Vertreter">
        <p>{COMPANY.representative}</p>
      </Section>

      <Section title="Haftungsausschluss">
        <p>
          Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für
          die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir
          jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß §
          16 ECG für eigene Inhalte auf diesen Seiten nach den allgemeinen
          Gesetzen verantwortlich.
        </p>
        <p>
          Unser Angebot enthält Links zu externen Websites Dritter, auf deren
          Inhalte wir keinen Einfluss haben. Deshalb können wir für diese
          fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
          verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
          Seiten verantwortlich.
        </p>
      </Section>

      <Section title="Urheberrecht">
        <p>
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
          Seiten unterliegen dem österreichischen Urheberrecht. Die
          Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung
          außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen
          Zustimmung des jeweiligen Autors bzw. Erstellers.
        </p>
      </Section>

      <p className="text-ink/60">
        Weitere Informationen zum Datenschutz finden Sie in unserer{' '}
        <Link
          href="/datenschutz"
          className="text-ink underline decoration-ink/30 underline-offset-2 transition-colors hover:decoration-ink/60"
        >
          Datenschutzerklärung
        </Link>
        .
      </p>
    </LegalPageLayout>
  );
}
