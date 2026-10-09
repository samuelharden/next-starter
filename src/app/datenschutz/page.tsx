import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPageLayout } from '@/components/layout/legal-page-layout';
import { CONTACT_EMAIL } from '@/lib/contact';
import { COMPANY } from '@/lib/company';
import { datenschutzDescription } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Datenschutz',
  description: datenschutzDescription,
  alternates: {
    canonical: '/datenschutz',
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

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-ink underline decoration-ink/30 underline-offset-2 transition-colors hover:decoration-ink/60"
    >
      {children}
    </a>
  );
}

export default function DatenschutzPage() {
  return (
    <LegalPageLayout title="Datenschutz">
      <Section title="Verantwortlicher">
        <p>
          Verantwortlich für die Datenverarbeitung auf dieser Website ist:
        </p>
        <p>
          <strong className="text-ink">{COMPANY.name}</strong>
          <br />
          {COMPANY.street}
          <br />
          {COMPANY.city}
          <br />
          Österreich
          <br />
          E-Mail:{' '}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-ink underline decoration-ink/30 underline-offset-2 transition-colors hover:decoration-ink/60"
          >
            {CONTACT_EMAIL}
          </a>
        </p>
      </Section>

      <Section title="Allgemeines zur Datenverarbeitung">
        <p>
          Der Schutz Ihrer personenbezogenen Daten ist uns ein wichtiges
          Anliegen. Wir verarbeiten Ihre Daten ausschließlich auf Grundlage der
          gesetzlichen Bestimmungen, insbesondere der Datenschutz-Grundverordnung
          (DSGVO) und des Datenschutzgesetzes (DSG).
        </p>
        <p>
          Diese Website dient der Information über unsere Leistungen und bietet
          ein Anfrageformular zur Kontaktaufnahme an. Es werden keine
          Nutzerkonten und keine Newsletter-Anmeldungen angeboten.
        </p>
      </Section>

      <Section title="Hosting und Server-Logfiles">
        <p>
          Diese Website wird bei <strong className="text-ink">Vercel Inc.</strong>{' '}
          (440 N Barranca Ave #4133, Covina, CA 91723, USA) gehostet. Beim
          Aufruf der Website werden durch den Hosting-Anbieter automatisch
          Informationen in sogenannten Server-Logfiles erfasst. Dazu können
          insbesondere folgende Daten gehören:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>IP-Adresse</li>
          <li>Datum und Uhrzeit der Anfrage</li>
          <li>aufgerufene Seite bzw. Datei</li>
          <li>Browsertyp und -version</li>
          <li>verwendetes Betriebssystem</li>
          <li>Referrer-URL</li>
        </ul>
        <p>
          Die Verarbeitung erfolgt auf Grundlage unseres berechtigten Interesses
          an der technischen Bereitstellung und Sicherheit der Website (Art. 6
          Abs. 1 lit. f DSGVO). Die Logfiles werden nach einer angemessenen
          Frist automatisch gelöscht.
        </p>
        <p>
          Mit Vercel besteht ein Auftragsverarbeitungsvertrag (Data Processing
          Addendum). Für Datenübermittlungen in die USA stützt sich Vercel auf
          die Standardvertragsklauseln der Europäischen Kommission gemäß Art. 46
          Abs. 2 lit. c DSGVO. Weitere Informationen:{' '}
          <ExternalLink href="https://vercel.com/legal/dpa">
            vercel.com/legal/dpa
          </ExternalLink>
          .
        </p>
      </Section>

      <Section title="Kontakt per E-Mail">
        <p>
          Wenn Sie uns per E-Mail kontaktieren, werden die von Ihnen mitgeteilten
          Daten (z. B. Name, E-Mail-Adresse, Inhalt der Nachricht) zum Zweck der
          Bearbeitung Ihrer Anfrage verarbeitet und gespeichert. Die
          Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO
          (Vertragsanbahnung) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
          Interesse an der Beantwortung von Anfragen).
        </p>
        <p>
          Die Daten werden gelöscht, sobald Ihre Anfrage abschließend bearbeitet
          wurde und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
        </p>
      </Section>

      <Section title="Anfrageformular">
        <p>
          Über das Anfrageformular auf dieser Website können Sie uns Angaben zu
          einem geplanten Projekt übermitteln. Die Verarbeitung erfolgt
          ausschließlich zum Zweck der Bearbeitung Ihrer Anfrage und der
          Vertragsanbahnung auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO.
        </p>
        <p>Dabei können insbesondere folgende Kategorien personenbezogener Daten verarbeitet werden:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Name</li>
          <li>
            E-Mail-Adresse oder Telefonnummer, je nachdem, auf welchem Weg Sie
            kontaktiert werden möchten
          </li>
          <li>Inhalt Ihrer Nachricht</li>
        </ul>
        <p>
          Zur Zustellung der Anfrage und der Bestätigungs-E-Mail nutzen wir{' '}
          <strong className="text-ink">Resend</strong> (Plus Five Five, Inc.,
          USA, handelnd als Resend) als E-Mail-Dienstleister.
        </p>
        <p>
          Mit Resend besteht eine Auftragsverarbeitungsvereinbarung bzw. ein Data
          Processing Addendum. Für Übermittlungen in die USA stützt sich der
          Anbieter auf die Standardvertragsklauseln der Europäischen Kommission
          gemäß Art. 46 Abs. 2 lit. c DSGVO. Weitere Informationen:{' '}
          <ExternalLink href="https://resend.com/legal/dpa">
            Resend DPA
          </ExternalLink>
          ,{' '}
          <ExternalLink href="https://resend.com/legal/subprocessors">
            Resend Subprocessors
          </ExternalLink>
          .
        </p>
        <p>
          Anfrageinhalte (einschließlich E-Mails in unserem Posteingang) werden
          gelöscht bzw. eingeschränkt, sobald Ihre Anfrage abschließend
          bearbeitet wurde und keine gesetzlichen Aufbewahrungspflichten
          entgegenstehen.
        </p>
      </Section>

      <Section title="Cookies und Reichweitenmessung">
        <p>
          Diese Website setzt <strong className="text-ink">keine Cookies</strong>{' '}
          und verwendet keine Marketing-Tracker (z. B. Google Analytics, Meta
          Pixel). Ein Cookie-Banner ist daher nicht erforderlich.
        </p>
        <p>
          Zur anonymisierten bzw. aggregierten Messung von Reichweite und
          technischer Performance nutzen wir{' '}
          <strong className="text-ink">Vercel Web Analytics</strong> und{' '}
          <strong className="text-ink">Vercel Speed Insights</strong>{' '}
          (Vercel Inc., USA). Diese Dienste setzen keine Cookies; Besucher werden
          nicht dauerhaft geräteübergreifend wiedererkannt. Die Verarbeitung
          erfolgt auf Grundlage unseres berechtigten Interesses an der
          Verbesserung und Stabilität der Website (Art. 6 Abs. 1 lit. f DSGVO).
        </p>
        <p>
          Mit Vercel besteht ein Auftragsverarbeitungsvertrag. Für
          Datenübermittlungen in die USA stützt sich Vercel auf die
          Standardvertragsklauseln gemäß Art. 46 Abs. 2 lit. c DSGVO (
          <ExternalLink href="https://vercel.com/legal/dpa">
            vercel.com/legal/dpa
          </ExternalLink>
          ).
        </p>
      </Section>

      <Section title="Auftragsverarbeiter">
        <p>
          Zur Bereitstellung dieser Website und zur Bearbeitung von Anfragen
          setzen wir folgende Auftragsverarbeiter ein. Mit allen genannten
          Anbietern bestehen Auftragsverarbeitungsvereinbarungen bzw. Data
          Processing Addenda. Soweit eine Übermittlung in die USA erfolgt,
          stützen sich die Anbieter auf die Standardvertragsklauseln der
          Europäischen Kommission (Art. 46 Abs. 2 lit. c DSGVO).
        </p>
        <ul className="list-disc space-y-3 pl-5">
          <li>
            <strong className="text-ink">Vercel Inc.</strong> (USA) - Hosting
            und Server-Logfiles; AVV/DPA:{' '}
            <ExternalLink href="https://vercel.com/legal/dpa">
              vercel.com/legal/dpa
            </ExternalLink>
          </li>
          <li>
            <strong className="text-ink">Resend</strong> (Plus Five Five, Inc.,
            USA) - Versand von Anfrage- und Bestätigungs-E-Mails; AVV/DPA:{' '}
            <ExternalLink href="https://resend.com/legal/dpa">
              resend.com/legal/dpa
            </ExternalLink>
            ; Subprocessors:{' '}
            <ExternalLink href="https://resend.com/legal/subprocessors">
              resend.com/legal/subprocessors
            </ExternalLink>
          </li>
          <li>
            <strong className="text-ink">Vercel Web Analytics</strong> und{' '}
            <strong className="text-ink">Speed Insights</strong> (Vercel Inc.,
            USA) - cookieless Reichweiten- und Performance-Messung; AVV/DPA wie
            oben
          </li>
        </ul>
      </Section>

      <Section title="Ihre Rechte">
        <p>
          Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit
          folgende Rechte:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Auskunft über Ihre bei uns gespeicherten personenbezogenen Daten</li>
          <li>Berichtigung unrichtiger Daten</li>
          <li>Löschung Ihrer Daten, sofern keine gesetzlichen Aufbewahrungspflichten bestehen</li>
          <li>Einschränkung der Verarbeitung</li>
          <li>Datenübertragbarkeit</li>
          <li>Widerspruch gegen die Verarbeitung</li>
        </ul>
        <p>
          Zur Ausübung Ihrer Rechte wenden Sie sich bitte an{' '}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-ink underline decoration-ink/30 underline-offset-2 transition-colors hover:decoration-ink/60"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </Section>

      <Section title="Beschwerderecht">
        <p>
          Sie haben das Recht, Beschwerde bei der österreichischen
          Datenschutzbehörde einzulegen:
        </p>
        <p>
          Österreichische Datenschutzbehörde
          <br />
          Barichgasse 40-42
          <br />
          1030 Wien
          <br />
          <ExternalLink href="https://www.dsb.gv.at">www.dsb.gv.at</ExternalLink>
        </p>
      </Section>

      <Section title="Stand">
        <p>Stand: Oktober 2026</p>
      </Section>

      <p className="text-ink/60">
        Rechtliche Angaben zum Unternehmen finden Sie im{' '}
        <Link
          href="/impressum"
          className="text-ink underline decoration-ink/30 underline-offset-2 transition-colors hover:decoration-ink/60"
        >
          Impressum
        </Link>
        .
      </p>
    </LegalPageLayout>
  );
}
