import type { AnfragePayload } from '@/lib/anfrage/payload-schema';
import { COMPANY } from '@/lib/company';
import {
  emailHeading,
  emailMuted,
  emailParagraph,
  emailSectionTitle,
  emailTheme,
  escapeHtml,
  wrapBrandEmail,
} from '@/lib/email/layout';

function row(label: string, value: string): string {
  if (!value.trim()) return '';
  return `<tr>
    <td style="padding:7px 16px 7px 0;vertical-align:top;width:42%;font-size:13px;line-height:1.45;color:${emailTheme.muted};">${escapeHtml(label)}</td>
    <td style="padding:7px 0;vertical-align:top;font-size:14px;line-height:1.45;color:${emailTheme.text};">${escapeHtml(value)}</td>
  </tr>`;
}

function section(title: string, rows: string): string {
  if (!rows.trim()) return '';
  return `
    ${emailSectionTitle(title)}
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
      ${rows}
    </table>
  `;
}

export function buildOwnerEmail(data: AnfragePayload) {
  const wantsCall = data.contact === 'phone';
  const email = data.email?.trim() || '';
  const phone = wantsCall ? data.phone?.trim() || '' : '';
  const preferred = wantsCall ? 'Anruf' : 'E-Mail';
  const contactRows = [
    row('Name', data.name),
    row('Bevorzugter Kontakt', preferred),
    row('Telefon', phone),
    row('E-Mail', email),
  ].join('');

  const messageText = data.message.trim();
  const messageRows = row('Nachricht', messageText);

  const bodyHtml = `
    ${emailHeading(`Anfrage von ${data.name}`)}
    ${emailMuted(`ID · ${escapeHtml(data.submissionId)}`)}
    ${section('Kontakt', contactRows)}
    ${section('Nachricht', messageRows)}
  `;

  const textLines = [
    `Neue Website-Anfrage von ${data.name}`,
    `ID: ${data.submissionId}`,
    '',
    `Name: ${data.name}`,
    `Bevorzugter Kontakt: ${preferred}`,
    phone ? `Telefon: ${phone}` : '',
    email ? `E-Mail: ${email}` : '',
    '',
    `Nachricht: ${messageText}`,
    '',
    COMPANY.name,
  ].filter(Boolean);

  return {
    subject: wantsCall
      ? `Neue Anfrage: ${data.name} (Rückruf)`
      : `Neue Anfrage: ${data.name}`,
    html: wrapBrandEmail({
      title: `Neue Anfrage von ${data.name}`,
      eyebrow: 'Neue Anfrage',
      preheader: `${data.name} · ${messageText.slice(0, 80)}`,
      bodyHtml,
    }),
    text: textLines.join('\n'),
  };
}

export function buildUserConfirmationEmail(data: AnfragePayload) {
  const firstName = data.name.trim().split(/\s+/)[0] || data.name;
  const phone = data.contact === 'phone' ? data.phone?.trim() || '' : '';
  const followUp = phone
    ? `Wir rufen Sie unter <strong style="color:${emailTheme.text};">${escapeHtml(phone)}</strong> an.`
    : 'Wir antworten Ihnen per E-Mail.';
  const followUpText = phone
    ? `Wir rufen Sie unter ${phone} an.`
    : 'Wir antworten Ihnen per E-Mail.';

  const bodyHtml = `
    ${emailHeading('Anfrage eingegangen')}
    ${emailParagraph(`Hallo ${escapeHtml(firstName)},`)}
    ${emailParagraph(
      'vielen Dank für Ihre Anfrage. Wir haben Ihre Nachricht erhalten.',
    )}
    ${emailParagraph(followUp)}
    ${emailParagraph(
      `Mit freundlichen Grüßen<br /><strong>${escapeHtml(COMPANY.name)}</strong>`,
    )}
  `;

  const text = [
    `Hallo ${firstName},`,
    '',
    'vielen Dank für Ihre Anfrage. Wir haben Ihre Nachricht erhalten.',
    followUpText,
    '',
    'Mit freundlichen Grüßen',
    COMPANY.name,
  ].join('\n');

  return {
    subject: 'Ihre Anfrage bei Starter',
    html: wrapBrandEmail({
      title: 'Anfrage eingegangen',
      eyebrow: 'Bestätigung',
      preheader: phone
        ? 'Wir haben Ihre Anfrage erhalten und rufen Sie an.'
        : 'Wir haben Ihre Anfrage erhalten und antworten per E-Mail.',
      bodyHtml,
    }),
    text,
  };
}
