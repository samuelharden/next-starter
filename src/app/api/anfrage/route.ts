import { Resend } from 'resend';
import * as v from 'valibot';
import { NextResponse } from 'next/server';

import { AnfragePayloadSchema } from '@/lib/anfrage/payload-schema';
import {
  buildOwnerEmail,
  buildUserConfirmationEmail,
} from '@/lib/email/anfrage-emails';
import { CONTACT_EMAIL } from '@/lib/contact';

export const runtime = 'nodejs';

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY fehlt.');
  }
  return new Resend(apiKey);
}

function getFromAddress(): string {
  const from = process.env.RESEND_FROM;
  if (!from) {
    throw new Error('RESEND_FROM fehlt.');
  }
  return from;
}

function honeypotFilled(json: unknown): boolean {
  if (!json || typeof json !== 'object') return false;
  const company = (json as { company?: unknown }).company;
  return typeof company === 'string' && company.trim().length > 0;
}

function withoutHoneypot(json: unknown): unknown {
  if (!json || typeof json !== 'object') return json;
  const { company: _company, ...rest } = json as Record<string, unknown>;
  return rest;
}

export async function POST(request: Request): Promise<NextResponse> {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: 'Ungültige Anfrage.' }, { status: 400 });
  }

  if (honeypotFilled(json)) {
    return NextResponse.json({ ok: true, id: crypto.randomUUID() });
  }

  const parsed = v.safeParse(AnfragePayloadSchema, withoutHoneypot(json));
  if (!parsed.success) {
    const message = parsed.issues[0]?.message ?? 'Validierung fehlgeschlagen.';
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const data = parsed.output;
  const email = data.email?.trim() || '';

  try {
    const owner = buildOwnerEmail(data);
    const resend = getResend();
    const from = getFromAddress();

    const ownerSend = resend.emails.send({
      from,
      to: CONTACT_EMAIL,
      ...(email ? { replyTo: email } : {}),
      subject: owner.subject,
      html: owner.html,
      text: owner.text,
    });

    // The confirmation mail only goes out when the customer left an address.
    const user = email ? buildUserConfirmationEmail(data) : null;
    const userSend = user
      ? resend.emails.send({
          from,
          to: email,
          subject: user.subject,
          html: user.html,
          text: user.text,
        })
      : Promise.resolve(null);

    const [ownerResult, userResult] = await Promise.all([ownerSend, userSend]);

    if (ownerResult.error) {
      console.error('Resend owner error', ownerResult.error);
      return NextResponse.json(
        {
          error:
            'Versand an uns ist fehlgeschlagen. Bitte später erneut versuchen.',
        },
        { status: 502 },
      );
    }

    if (userResult?.error) {
      console.error('Resend user error', userResult.error);
    }

    return NextResponse.json({ ok: true, id: data.submissionId });
  } catch (error) {
    console.error('Anfrage submit failed', error);
    return NextResponse.json(
      {
        error:
          'Versand fehlgeschlagen. Bitte prüfen Sie Ihre Verbindung und versuchen Sie es erneut.',
      },
      { status: 500 },
    );
  }
}
