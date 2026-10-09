import { COMPANY, COMPANY_ADDRESS } from '@/lib/company';
import { CONTACT_EMAIL } from '@/lib/contact';
import { SITE_URL } from '@/lib/seo';

/** Hex tokens that travel well across Gmail / Outlook / Apple Mail. */
export const emailTheme = {
  pageBg: '#eef2f6',
  cardBg: '#ffffff',
  headerBg: '#0f172a',
  accent: '#0f766e',
  text: '#0f172a',
  muted: '#64748b',
  border: '#e2e8f0',
  link: '#0f766e',
  footer: '#94a3b8',
} as const;

export function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

const fontStack =
  "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

function brandHeader(eyebrow: string): string {
  return `
    <tr>
      <td style="background-color:${emailTheme.headerBg};padding:28px 28px 22px;">
        <a href="${SITE_URL}" style="text-decoration:none;color:#ffffff;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="vertical-align:middle;padding-right:14px;">
                <div style="width:40px;height:40px;border-radius:10px;background-color:${emailTheme.accent};"></div>
              </td>
              <td style="vertical-align:middle;">
                <span style="display:block;font-family:Arial,Helvetica,sans-serif;font-size:18px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;line-height:1.2;color:#ffffff;">
                  STARTER
                </span>
              </td>
            </tr>
          </table>
        </a>
        <p style="margin:18px 0 0;font-family:${fontStack};font-size:11px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:#94a3b8;">
          ${escapeHtml(eyebrow)}
        </p>
      </td>
    </tr>
    <tr>
      <td style="background-color:${emailTheme.accent};height:3px;font-size:0;line-height:0;">&nbsp;</td>
    </tr>`;
}

function brandFooter(): string {
  return `
    <tr>
      <td style="padding:20px 28px 28px;border-top:1px solid ${emailTheme.border};">
        <p style="margin:0;font-family:${fontStack};font-size:12px;line-height:1.55;color:${emailTheme.footer};">
          ${escapeHtml(COMPANY.name)}<br />
          ${escapeHtml(COMPANY_ADDRESS)}<br />
          <a href="mailto:${CONTACT_EMAIL}" style="color:${emailTheme.link};text-decoration:none;">${CONTACT_EMAIL}</a>
          &nbsp;·&nbsp;
          <a href="${SITE_URL}" style="color:${emailTheme.link};text-decoration:none;">${escapeHtml(new URL(SITE_URL).host)}</a>
        </p>
      </td>
    </tr>`;
}

/** Light card + dark Starter header. Inbox-friendly kit branding. */
export function wrapBrandEmail(options: {
  title: string;
  eyebrow: string;
  preheader: string;
  bodyHtml: string;
}): string {
  const { title, eyebrow, preheader, bodyHtml } = options;

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)}</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td { font-family: Arial, Helvetica, sans-serif !important; }
  </style>
  <![endif]-->
</head>
<body style="margin:0;padding:0;background-color:${emailTheme.pageBg};">
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">
    ${escapeHtml(preheader)}
  </div>
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:${emailTheme.pageBg};">
    <tr>
      <td align="center" style="padding:28px 16px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:600px;background-color:${emailTheme.cardBg};border-radius:4px;overflow:hidden;">
          ${brandHeader(eyebrow)}
          <tr>
            <td style="padding:28px 28px 8px;font-family:${fontStack};color:${emailTheme.text};">
              ${bodyHtml}
            </td>
          </tr>
          ${brandFooter()}
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function emailHeading(text: string): string {
  return `<h1 style="margin:0 0 12px;font-family:${fontStack};font-size:22px;line-height:1.25;font-weight:700;letter-spacing:-0.02em;color:${emailTheme.text};">${escapeHtml(text)}</h1>`;
}

export function emailParagraph(html: string): string {
  return `<p style="margin:0 0 14px;font-family:${fontStack};font-size:15px;line-height:1.55;color:${emailTheme.text};">${html}</p>`;
}

export function emailMuted(html: string): string {
  return `<p style="margin:0 0 14px;font-family:${fontStack};font-size:13px;line-height:1.5;color:${emailTheme.muted};">${html}</p>`;
}

export function emailSectionTitle(text: string): string {
  return `<h2 style="margin:24px 0 10px;padding-top:4px;font-family:${fontStack};font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${emailTheme.muted};">${escapeHtml(text)}</h2>`;
}
