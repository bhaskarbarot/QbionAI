"use client";

import { useState, type FormEvent } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import Button from "@/components/shared/Button";

const SERVICES = ["AI Solutions", "AI Powered Design", "Automation", "Performance Advertising", "Not sure yet"];

type Status = "idle" | "loading" | "success" | "error";
type Fields = "name" | "email" | "phone" | "message";

const fieldCls =
  "w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3.5 text-[14px] text-white placeholder:text-muted-2 outline-none transition focus:border-glow/60 focus:bg-white/[0.06] focus:shadow-[0_0_0_4px_rgba(74,222,128,0.16)]";
const errCls = "border-rose-500/60 focus:border-rose-500";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

function validateName(v: string) {
  if (!v.trim()) return "Please enter your name.";
  if (v.trim().length < 2) return "Please enter your full name.";
  return "";
}

function validateEmail(v: string) {
  const value = v.trim();
  if (!value) return "Please enter your email.";
  if (!EMAIL_RE.test(value)) return "Please enter a valid email address.";
  return "";
}

function validatePhone(v: string) {
  const value = v.trim();
  if (!value) return "";
  const digits = value.replace(/[^\d]/g, "").replace(/^91/, "");
  if (digits.length !== 10) return "Please enter a valid 10 digit phone number.";
  if (/^(\d)\1{9}$/.test(digits)) return "Please enter a real phone number.";
  return "";
}

function validateMessage(v: string) {
  if (!v.trim()) return "Please tell us a bit about your project.";
  if (v.trim().length < 10) return "Please add a few more details.";
  return "";
}

const validators: Record<Fields, (v: string) => string> = {
  name: validateName,
  email: validateEmail,
  phone: validatePhone,
  message: validateMessage,
};

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [agree, setAgree] = useState(false);
  const [touched, setTouched] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<Fields, string>>>({});

  function validateField(field: Fields, value: string) {
    const err = validators[field](value);
    setFieldErrors((prev) => ({ ...prev, [field]: err }));
    return err;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched(true);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    const errors: Partial<Record<Fields, string>> = {};
    (Object.keys(validators) as Fields[]).forEach((field) => {
      const err = validators[field](data[field] || "");
      if (err) errors[field] = err;
    });
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0 || !agree) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(json.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      form.reset();
      setAgree(false);
      setTouched(false);
      setFieldErrors({});
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="liquid-glass flex flex-col items-center rounded-3xl px-8 py-14 text-center">
        <CheckCircle2 size={40} className="mb-4 text-emerald-400" />
        <h3 className="mb-2 font-display text-xl text-white">Message Sent</h3>
        <p className="max-w-sm text-[14px] text-muted">
          Thanks for reaching out. We will connect with you within 2 working days. Check your inbox, a
          confirmation email is on its way.
        </p>
        <Button variant="ghost" className="mt-6" onClick={() => setStatus("idle")}>
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="liquid-glass rounded-3xl p-6 sm:p-9" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block font-display text-xs font-medium uppercase tracking-wide text-muted">
            Full Name *
          </label>
          <input
            id="name"
            name="name"
            placeholder="Priya Sharma"
            autoComplete="name"
            className={`${fieldCls} ${touched && fieldErrors.name ? errCls : ""}`}
            onBlur={(e) => validateField("name", e.target.value)}
          />
          {touched && fieldErrors.name && (
            <p className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-400">
              <AlertCircle size={12} /> {fieldErrors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block font-display text-xs font-medium uppercase tracking-wide text-muted">
            Work Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@company.com"
            autoComplete="email"
            className={`${fieldCls} ${touched && fieldErrors.email ? errCls : ""}`}
            onBlur={(e) => validateField("email", e.target.value)}
          />
          {touched && fieldErrors.email && (
            <p className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-400">
              <AlertCircle size={12} /> {fieldErrors.email}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="company" className="mb-2 block font-display text-xs font-medium uppercase tracking-wide text-muted">
            Company
          </label>
          <input id="company" name="company" placeholder="Company name" autoComplete="organization" className={fieldCls} />
        </div>
        <div>
          <label htmlFor="phone" className="mb-2 block font-display text-xs font-medium uppercase tracking-wide text-muted">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="95100 25235"
            autoComplete="tel"
            className={`${fieldCls} ${touched && fieldErrors.phone ? errCls : ""}`}
            onBlur={(e) => validateField("phone", e.target.value)}
          />
          {touched && fieldErrors.phone && (
            <p className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-400">
              <AlertCircle size={12} /> {fieldErrors.phone}
            </p>
          )}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="service" className="mb-2 block font-display text-xs font-medium uppercase tracking-wide text-muted">
            Service You Need
          </label>
          <select id="service" name="service" defaultValue="" className={fieldCls}>
            <option value="" disabled>Select a service</option>
            {SERVICES.map((s) => (
              <option key={s} value={s} className="bg-space-2">{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="message" className="mb-2 block font-display text-xs font-medium uppercase tracking-wide text-muted">
          Project Details *
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="What are you trying to build, and what would a good outcome look like?"
          className={`${fieldCls} min-h-[130px] resize-y ${touched && fieldErrors.message ? errCls : ""}`}
          onBlur={(e) => validateField("message", e.target.value)}
        />
        {touched && fieldErrors.message && (
          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-400">
            <AlertCircle size={12} /> {fieldErrors.message}
          </p>
        )}
      </div>

      <label className="mt-5 flex items-start gap-3 text-[13px] text-muted">
        <input
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-violet"
        />
        I agree to be contacted about my inquiry and accept the{" "}
        <a href="/privacy" className="text-glow-2 hover:underline">Privacy Policy</a>.
      </label>
      {touched && !agree && (
        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-400">
          <AlertCircle size={12} /> Please accept the privacy policy to continue.
        </p>
      )}

      {status === "error" && (
        <p className="mt-4 flex items-center gap-1.5 text-sm text-rose-400">
          <AlertCircle size={14} /> {errorMsg}
        </p>
      )}

      <Button type="submit" size="lg" className="mt-6 w-full sm:w-auto">
        {status === "loading" ? (
          <>
            <Loader2 size={17} className="animate-spin" /> Sending
          </>
        ) : (
          "Send Message"
        )}
      </Button>
      <p className="mt-4 font-display text-xs text-muted-2">We reply within 2 working days.</p>
    </form>
  );
}
