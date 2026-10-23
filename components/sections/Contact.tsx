"use client";

import { useCallback, useState } from "react";
import { site } from "@/data/site";
import { contactSchema } from "@/lib/validators";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { Button } from "@/components/ui/Button";
import { Toast } from "@/components/ui/Toast";

type Status = "idle" | "loading" | "success" | "error";

type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [toast, setToast] = useState<{ message: string; tone: "success" | "error" } | null>(
    null,
  );
  const [successMessage, setSuccessMessage] = useState("");

  const dismissToast = useCallback(() => setToast(null), []);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = {
      name: String(new FormData(form).get("name") ?? ""),
      email: String(new FormData(form).get("email") ?? ""),
      message: String(new FormData(form).get("message") ?? ""),
      company: String(new FormData(form).get("company") ?? ""),
    };

    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      const errors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (key === "name" || key === "email" || key === "message") {
          errors[key] ??= issue.message;
        }
      }
      setFieldErrors(errors);
      setFormError("Check the highlighted fields and try again.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setFieldErrors({});
    setFormError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const body = (await response.json()) as {
        ok?: boolean;
        preview?: boolean;
        error?: string;
        fields?: Record<string, string[] | undefined>;
      };

      if (!response.ok || !body.ok) {
        const nextFields: FieldErrors = {};
        for (const [key, messages] of Object.entries(body.fields ?? {})) {
          if ((key === "name" || key === "email" || key === "message") && messages?.[0]) {
            nextFields[key] = messages[0];
          }
        }
        setFieldErrors(nextFields);
        const message = body.error ?? "The message could not be sent.";
        setFormError(message);
        setStatus("error");
        setToast({ message, tone: "error" });
        return;
      }

      form.reset();
      const message = body.preview
        ? "Message checked. Email delivery is not configured in this environment."
        : "Message sent. I will reply by email.";
      setSuccessMessage(message);
      setStatus("success");
      setToast({ message, tone: "success" });
    } catch {
      const message = "Network error. Please try again, or email me directly.";
      setFormError(message);
      setStatus("error");
      setToast({ message, tone: "error" });
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="section scroll-mt-24">
      <div className="shell grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        <div>
          <SectionHeading
            id="contact-title"
            eyebrow="Contact"
            title="Tell me what you want to ship."
            description="A short note is enough: the product, the constraint, and whether you want a conversation."
          />
          <a
            href={`mailto:${site.email}`}
            className="mt-6 inline-flex min-h-11 items-center text-lg font-medium text-accent"
          >
            {site.email}
          </a>
          <a
            href={site.phoneHref}
            className="mt-2 inline-flex min-h-11 items-center text-lg font-medium text-accent"
          >
            {site.phone}
          </a>
          <p className="mt-3 text-sm text-muted">{site.location}</p>
          <SocialLinks className="mt-6" />
        </div>

        <form onSubmit={onSubmit} className="surface p-6 sm:p-7" noValidate>
          {formError ? (
            <p role="alert" className="mb-4 text-sm text-danger">
              {formError}
            </p>
          ) : null}
          {status === "success" ? (
            <p role="status" className="mb-4 text-sm text-success">
              {successMessage}
            </p>
          ) : null}

          <div className="grid gap-4">
            <Field
              id="name"
              label="Name"
              error={fieldErrors.name}
              disabled={status === "loading"}
              autoComplete="name"
              minLength={2}
              maxLength={80}
              required
            />
            <Field
              id="email"
              label="Email"
              type="email"
              error={fieldErrors.email}
              disabled={status === "loading"}
              autoComplete="email"
              maxLength={120}
              required
            />
            <div>
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                minLength={10}
                maxLength={2000}
                rows={6}
                disabled={status === "loading"}
                aria-invalid={fieldErrors.message ? true : undefined}
                aria-describedby={fieldErrors.message ? "message-error" : undefined}
                className="mt-2 w-full min-w-0 rounded-2xl border border-border bg-background px-3 py-3 text-base outline-none"
              />
              {fieldErrors.message ? (
                <p id="message-error" className="mt-2 text-sm text-danger">
                  {fieldErrors.message}
                </p>
              ) : null}
            </div>
          </div>

          <div className="sr-only" aria-hidden="true">
            <label htmlFor="company">Company</label>
            <input id="company" name="company" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="mt-5">
            <Button type="submit" disabled={status === "loading"} aria-busy={status === "loading"}>
              {status === "loading" ? "Sending…" : "Send message"}
            </Button>
          </div>
        </form>
      </div>
      {toast ? <Toast message={toast.message} tone={toast.tone} onClose={dismissToast} /> : null}
    </section>
  );
}

function Field({
  id,
  label,
  error,
  type = "text",
  ...props
}: {
  id: string;
  label: string;
  error?: string;
  type?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className="mt-2 w-full min-w-0 rounded-2xl border border-border bg-background px-3 py-3 text-base outline-none"
        {...props}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
