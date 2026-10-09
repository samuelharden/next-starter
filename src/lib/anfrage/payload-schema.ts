import * as v from 'valibot';

const requiredString = (message: string) =>
  v.pipe(v.string(message), v.nonEmpty(message));

const EmailFormat = v.pipe(v.string(), v.trim(), v.email());

export const AnfragePayloadSchema = v.pipe(
  v.object({
    submissionId: v.pipe(v.string(), v.uuid('Ungültige Anfrage-ID.')),
    name: requiredString('Bitte geben Sie Ihren Namen ein.'),
    contact: v.picklist(
      ['email', 'phone'],
      'Bitte wählen Sie einen Kontaktweg.',
    ),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    message: requiredString('Bitte schreiben Sie uns eine Nachricht.'),
  }),
  v.forward(
    v.partialCheck(
      [['contact'], ['email']],
      (input) =>
        input.contact !== 'email' ||
        Boolean(input.email && input.email.trim().length > 0),
      'Bitte geben Sie Ihre E-Mail-Adresse ein.',
    ),
    ['email'],
  ),
  v.forward(
    v.partialCheck(
      [['email']],
      (input) =>
        !input.email ||
        input.email.trim().length === 0 ||
        v.is(EmailFormat, input.email),
      'Ungültige E-Mail-Adresse.',
    ),
    ['email'],
  ),
  v.forward(
    v.partialCheck(
      [['contact'], ['phone']],
      (input) =>
        input.contact !== 'phone' ||
        Boolean(input.phone && input.phone.trim().length > 0),
      'Bitte geben Sie Ihre Telefonnummer ein.',
    ),
    ['phone'],
  ),
);

export type AnfragePayload = v.InferOutput<typeof AnfragePayloadSchema>;
