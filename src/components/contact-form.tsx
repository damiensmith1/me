"use client";

import { useState, type FormEvent } from "react";
import { contactSchema } from "@/lib/validations/contact";
import { Button } from "@/components/ui/button";
import { CheckIcon, SpinnerIcon } from "@/components/icons";

type Status = "idle" | "submitting" | "success" | "error";

const inputClasses =
  "w-full border-0 border-b border-border bg-transparent px-0 py-2.5 text-sm text-foreground placeholder:text-muted/70 focus:border-accent focus:outline-none transition-colors";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setErrors({});
    setErrorMessage(null);

    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
      company: String(formData.get("company") ?? ""),
    };

    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (typeof key === "string" && !fieldErrors[key]) {
          fieldErrors[key] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage(
        "Something went wrong sending that. Please try again, or email me directly.",
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <div>
        <label
          htmlFor="name"
          className="font-mono text-xs uppercase tracking-widest text-muted"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          className={`mt-2 ${inputClasses}`}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name ? (
          <p id="name-error" className="mt-1.5 text-xs text-error">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div>
        <label
          htmlFor="email"
          className="font-mono text-xs uppercase tracking-widest text-muted"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          className={`mt-2 ${inputClasses}`}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email ? (
          <p id="email-error" className="mt-1.5 text-xs text-error">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div>
        <label
          htmlFor="message"
          className="font-mono text-xs uppercase tracking-widest text-muted"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={`mt-2 resize-none ${inputClasses}`}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message ? (
          <p id="message-error" className="mt-1.5 text-xs text-error">
            {errors.message}
          </p>
        ) : null}
      </div>

      {/* Honeypot — hidden from real visitors, catches basic bots. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {status === "error" && errorMessage ? (
        <p className="text-sm text-error">{errorMessage}</p>
      ) : null}

      {status === "success" ? (
        <p className="flex items-center gap-2 text-sm text-success">
          <CheckIcon className="h-4 w-4 shrink-0" />
          Message sent — I&apos;ll get back to you within a day or two.
        </p>
      ) : null}

      <Button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? (
          <>
            <SpinnerIcon className="h-4 w-4" /> Sending
          </>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  );
}
