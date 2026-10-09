'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import {
  Field,
  Form,
  reset,
  useField,
  useForm,
  type FormStore,
  type SubmitHandler,
} from '@formisch/react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import {
  AnfrageSchema,
  anfrageInitialInput,
  type ContactMethod,
} from '@/components/forms/anfrage-schema';

const errorClassName = 'mt-1.5 text-sm text-destructive';

function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="border-border space-y-1 border-b pb-3">
      <h2 className="font-variable text-foreground text-lg font-semibold tracking-tight">
        {title}
      </h2>
      {subtitle ? (
        <p className="text-muted-foreground text-sm">{subtitle}</p>
      ) : null}
    </div>
  );
}

type TextFieldPath = ['name'] | ['email'] | ['phone'];

function TextField({
  form,
  path,
  label,
  type = 'text',
  autoComplete,
}: {
  form: FormStore<typeof AnfrageSchema>;
  path: TextFieldPath;
  label: string;
  type?: 'text' | 'email' | 'tel';
  autoComplete?: string;
}) {
  return (
    <Field
      of={form}
      path={path}
    >
      {(field) => (
        <div className="space-y-1.5">
          <Label htmlFor={field.props.name}>{label}</Label>
          <Input
            {...field.props}
            id={field.props.name}
            value={field.input ?? ''}
            type={type}
            autoComplete={autoComplete}
            aria-invalid={Boolean(field.errors)}
            className="h-10"
          />
          {field.errors ? (
            <p className={errorClassName}>{field.errors[0]}</p>
          ) : null}
        </div>
      )}
    </Field>
  );
}

const CONTACT_OPTIONS: ReadonlyArray<{
  value: ContactMethod;
  title: string;
  hint: string;
}> = [
  { value: 'email', title: 'E-Mail', hint: 'Wir antworten schriftlich.' },
  { value: 'phone', title: 'Anruf', hint: 'Wir melden uns telefonisch.' },
];

function ContactFields({ form }: { form: FormStore<typeof AnfrageSchema> }) {
  const contact = useField(form, { path: ['contact'] });
  const wantsCall = contact.input === 'phone';

  return (
    <div className="space-y-5">
      <Field
        of={form}
        path={['contact']}
      >
        {(field) => (
          <fieldset className="space-y-1.5">
            <legend className="mb-1.5 text-sm leading-none font-medium">
              Wie dürfen wir uns melden?
            </legend>
            <RadioGroup
              name={field.props.name}
              value={field.input ?? 'email'}
              onValueChange={(value) => field.onChange(value as ContactMethod)}
              className="grid gap-3 sm:grid-cols-2"
            >
              {CONTACT_OPTIONS.map((option) => (
                <label
                  key={option.value}
                  className="group border-input has-data-[state=checked]:border-primary has-data-[state=checked]:bg-primary/5 has-focus-visible:border-ring has-focus-visible:ring-ring/50 hover:border-foreground/30 dark:bg-input/30 flex cursor-pointer flex-col gap-0.5 rounded-lg border px-4 py-3 transition-colors duration-300 ease-out has-focus-visible:ring-3"
                >
                  <RadioGroupItem
                    value={option.value}
                    id={`${field.props.name}-${option.value}`}
                  />
                  <span className="text-foreground text-sm leading-snug font-medium">
                    {option.title}
                  </span>
                  <span className="text-muted-foreground text-sm leading-snug transition-opacity duration-500 ease-out group-hover:opacity-80">
                    {option.hint}
                  </span>
                </label>
              ))}
            </RadioGroup>
            {field.errors ? (
              <p className={errorClassName}>{field.errors[0]}</p>
            ) : null}
          </fieldset>
        )}
      </Field>

      <TextField
        form={form}
        path={['email']}
        label={wantsCall ? 'E-Mail (optional)' : 'E-Mail'}
        type="email"
        autoComplete="email"
      />

      {wantsCall ? (
        <div className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-2 motion-safe:fill-mode-both motion-safe:duration-500 motion-safe:ease-out">
          <TextField
            form={form}
            path={['phone']}
            label="Telefon"
            type="tel"
            autoComplete="tel"
          />
        </div>
      ) : null}
    </div>
  );
}

export function AnfrageForm() {
  const [sent, setSent] = useState(false);
  const [sentVia, setSentVia] = useState<{
    contact: ContactMethod;
    hasEmail: boolean;
  } | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);

  const form = useForm({
    schema: AnfrageSchema,
    validate: 'submit',
    revalidate: 'input',
    initialInput: anfrageInitialInput,
  });

  const handleSubmit: SubmitHandler<typeof AnfrageSchema> = async (output) => {
    setSubmitError(null);

    const email = output.email?.trim() ?? '';
    const phone =
      output.contact === 'phone' ? (output.phone?.trim() ?? '') : '';

    try {
      const response = await fetch('/api/anfrage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionId: crypto.randomUUID(),
          name: output.name,
          contact: output.contact,
          email,
          phone,
          message: output.message,
          company: honeypotRef.current?.value ?? '',
        }),
      });

      const payload = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;

      if (!response.ok) {
        throw new Error(
          payload?.error ||
            'Versand fehlgeschlagen. Bitte versuchen Sie es erneut.',
        );
      }

      setSentVia({ contact: output.contact, hasEmail: email.length > 0 });
      setSent(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'Versand fehlgeschlagen. Bitte versuchen Sie es erneut.',
      );
    }
  };

  if (sent) {
    return (
      <div
        className="border-border bg-card rounded-xl border px-4 py-8 sm:px-6"
        role="status"
      >
        <p className="text-foreground">
          {sentVia?.contact === 'phone'
            ? 'Danke - Ihre Anfrage wurde gesendet. Wir rufen Sie an.'
            : 'Danke - Ihre Anfrage wurde gesendet. Wir antworten Ihnen per E-Mail.'}
        </p>
        {sentVia?.contact === 'phone' && sentVia.hasEmail ? (
          <p className="text-muted-foreground mt-2 text-sm">
            Sie erhalten zusätzlich eine kurze Bestätigung per E-Mail.
          </p>
        ) : null}
        <Button
          type="button"
          size="lg"
          className="mt-6 cursor-pointer rounded-full px-5"
          onClick={() => {
            reset(form, { initialInput: anfrageInitialInput });
            setSentVia(null);
            setSubmitError(null);
            setSent(false);
          }}
        >
          Neue Anfrage
        </Button>
      </div>
    );
  }

  return (
    <Form
      of={form}
      onSubmit={handleSubmit}
      className="space-y-10"
      aria-label="Anfrageformular"
    >
      <div
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
        aria-hidden
      >
        <label htmlFor="company">Firma</label>
        <input
          ref={honeypotRef}
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      <section className="space-y-5">
        <SectionHeading title="Ihre Kontaktdaten" />

        <TextField
          form={form}
          path={['name']}
          label="Name / Firma"
          autoComplete="name"
        />

        <ContactFields form={form} />
      </section>

      <section className="space-y-5">
        <SectionHeading
          title="Nachricht"
          subtitle="Schreiben Sie uns einfach Ihre Projektideen, egal wie ambitioniert oder komplex. Meistens können wir helfen."
        />
        <Field
          of={form}
          path={['message']}
        >
          {(field) => (
            <div className="space-y-1.5">
              <Label htmlFor={field.props.name}>Nachricht</Label>
              <Textarea
                {...field.props}
                id={field.props.name}
                value={field.input ?? ''}
                rows={6}
                aria-invalid={Boolean(field.errors)}
                className="min-h-32 resize-y"
              />
              {field.errors ? (
                <p className={errorClassName}>{field.errors[0]}</p>
              ) : null}
            </div>
          )}
        </Field>
      </section>

      <p className="text-muted-foreground text-sm leading-snug">
        Mit dem Absenden werden Ihre Angaben zur Bearbeitung der Anfrage gemäß
        unserer{' '}
        <Link
          href="/datenschutz"
          className="text-foreground decoration-foreground/30 hover:decoration-foreground/60 underline underline-offset-2 transition-colors"
        >
          Datenschutzerklärung
        </Link>{' '}
        verarbeitet.
      </p>

      {submitError ? (
        <p
          className={errorClassName}
          role="alert"
        >
          {submitError}
        </p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        disabled={form.isSubmitting}
        className="cursor-pointer rounded-full px-5"
      >
        {form.isSubmitting ? 'Wird gesendet…' : 'Anfrage senden'}
      </Button>
    </Form>
  );
}
