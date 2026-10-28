"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { site } from "@/app/data";
import { sendEmail, type ContactPayload } from "@/app/actions";
import styles from "./contact.module.css";

export type ContactTab = "project" | "hiring" | "email";

type ChoiceField = { kind: "check" | "radio"; id: string; label: string; options: string[] };
type InputField = { kind: "text" | "email" | "area"; id: string; label: string; placeholder: string; required?: boolean };
type Field = ChoiceField | InputField;
const isChoice = (f: Field): f is ChoiceField => f.kind === "check" || f.kind === "radio";

const projectFields: Field[] = [
  {
    kind: "check",
    id: "scope",
    label: "Scope",
    options: [
      "Website or landing page",
      "E-commerce store",
      "Web app or SaaS",
      "UI design",
      "Performance and SEO",
      "Not sure yet",
    ],
  },
  { kind: "radio", id: "format", label: "Format", options: ["One-off project", "Freelance support", "Ongoing retainer"] },
  {
    kind: "radio",
    id: "budget",
    label: "Budget",
    options: ["Under $1,500", "$1,500 – $3,000", "$3,000 – $6,000", "$6,000+", "Let's chat first"],
  },
  { kind: "text", id: "name", label: "Name", placeholder: "Enter name", required: true },
  { kind: "email", id: "email", label: "Email", placeholder: "Enter email", required: true },
  { kind: "text", id: "company", label: "Company", placeholder: "Enter company or project name" },
  { kind: "text", id: "timeline", label: "Timeline", placeholder: "Start date and deadline" },
  { kind: "area", id: "note", label: "Note", placeholder: "A few words about the project or links" },
];

const hiringFields: Field[] = [
  { kind: "radio", id: "type", label: "Role type", options: ["Full-time", "Contract", "Agency partnership"] },
  { kind: "radio", id: "location", label: "Location", options: ["Remote", "Hybrid", "On-site in Morocco"] },
  { kind: "text", id: "name", label: "Name", placeholder: "Enter name", required: true },
  { kind: "email", id: "email", label: "Email", placeholder: "Enter email", required: true },
  { kind: "text", id: "company", label: "Company", placeholder: "Enter company name" },
  { kind: "text", id: "role", label: "Role", placeholder: "Job title or a link to the listing" },
  { kind: "area", id: "note", label: "Note", placeholder: "Anything else I should know" },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
type Status = "idle" | "sending" | "sent" | "failed";

export default function ContactSheet({
  isOpen,
  tab,
  onTab,
  onClose,
}: {
  isOpen: boolean;
  tab: ContactTab;
  onTab: (t: ContactTab) => void;
  onClose: () => void;
}) {
  const sheetRef = useRef<HTMLElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const [values, setValues] = useState<Record<string, string | string[]>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);

  const close = () => {
    onClose();
    // /contact opens the sheet over the home page; closing returns to home.
    if (pathname === "/contact") router.replace("/", { scroll: false });
  };

  // Lock page scroll, remember focus, and focus the active tab when opening.
  useEffect(() => {
    if (!isOpen) return;
    lastFocus.current = document.activeElement as HTMLElement | null;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    const id = setTimeout(() => sheetRef.current?.querySelector<HTMLElement>('[aria-selected="true"]')?.focus(), 60);
    return () => {
      clearTimeout(id);
      html.style.overflow = prev;
      lastFocus.current?.focus?.();
    };
  }, [isOpen]);

  // Escape closes; Tab stays inside the sheet.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key !== "Tab" || !sheetRef.current) return;
      const f = [...sheetRef.current.querySelectorAll<HTMLElement>("button, input, textarea, a[href]")].filter(
        (el) => !(el as HTMLButtonElement).disabled && el.offsetParent !== null,
      );
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) {
        e.preventDefault();
        f[f.length - 1].focus();
      } else if (!e.shiftKey && document.activeElement === f[f.length - 1]) {
        e.preventDefault();
        f[0].focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const switchTab = (t: ContactTab) => {
    onTab(t);
    setErrors({});
    setStatus("idle");
    bodyRef.current?.scrollTo({ top: 0 });
  };

  const setValue = (id: string, v: string | string[]) => {
    setValues((s) => ({ ...s, [id]: v }));
    if (errors[id]) setErrors((e) => ({ ...e, [id]: "" }));
  };

  const toggle = (id: string, option: string) => {
    const cur = Array.isArray(values[id]) ? (values[id] as string[]) : [];
    setValue(id, cur.includes(option) ? cur.filter((o) => o !== option) : [...cur, option]);
  };

  const onSubmit = async (e: React.FormEvent, fields: Field[]) => {
    e.preventDefault();
    if (status === "sending") return;
    const name = String(values.name ?? "").trim();
    const email = String(values.email ?? "").trim();
    const er: Record<string, string> = {};
    if (!name) er.name = "Add your name.";
    if (!EMAIL_RE.test(email)) er.email = "Add an email address I can reply to.";
    setErrors(er);
    if (Object.keys(er).length) return;

    const answers = fields
      .filter((f) => f.id !== "name" && f.id !== "email")
      .map((f) => {
        const v = values[f.id];
        return { label: f.label, value: Array.isArray(v) ? v.join(", ") : String(v ?? "").trim() };
      })
      .filter((a) => a.value);

    const payload: ContactPayload = {
      kind: tab === "hiring" ? "hiring" : "project",
      name,
      email,
      answers,
      website: String(values.website ?? ""),
    };
    setStatus("sending");
    const res = await sendEmail(payload);
    if (res.success) {
      setStatus("sent");
      setValues({});
    } else setStatus("failed");
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const el = document.getElementById("contact-address");
      if (el) window.getSelection()?.selectAllChildren(el);
    }
  };

  const renderField = (f: Field, i: number) => {
    const n = String(i + 1).padStart(2, "0");
    if (isChoice(f)) {
      const cur = values[f.id];
      return (
        <div key={f.id} className={styles.row} role="group" aria-labelledby={`contact-${f.id}-label`}>
          <span className={styles.q} id={`contact-${f.id}-label`}>
            <span className={styles.n}>{n}</span>
            {f.label}
          </span>
          <div className={styles.opts}>
            {f.options.map((o) => (
              <label key={o} className={styles.opt}>
                <input
                  type={f.kind === "check" ? "checkbox" : "radio"}
                  name={f.id}
                  value={o}
                  checked={f.kind === "check" ? Array.isArray(cur) && cur.includes(o) : cur === o}
                  onChange={() => (f.kind === "check" ? toggle(f.id, o) : setValue(f.id, o))}
                />
                {o}
              </label>
            ))}
          </div>
        </div>
      );
    }
    const inputId = `contact-${f.id}`;
    const err = errors[f.id];
    const common = {
      id: inputId,
      name: f.id,
      placeholder: f.placeholder,
      value: String(values[f.id] ?? ""),
      "aria-invalid": !!err,
      "aria-describedby": err ? `${inputId}-error` : undefined,
    };
    return (
      <div key={f.id} className={styles.row}>
        <label className={styles.q} htmlFor={inputId}>
          <span className={styles.n}>{n}</span>
          {f.label}
          {f.required && "*"}
        </label>
        {f.kind === "area" ? (
          <textarea {...common} rows={2} onChange={(e) => setValue(f.id, e.target.value)} />
        ) : (
          <input
            {...common}
            type={f.kind === "email" ? "email" : "text"}
            autoComplete={f.id === "email" ? "email" : f.id === "name" ? "name" : "off"}
            onChange={(e) => setValue(f.id, e.target.value)}
          />
        )}
        {err && (
          <p id={`${inputId}-error`} className={styles.err}>
            {err}
          </p>
        )}
      </div>
    );
  };

  const form = (title: string, aside: React.ReactNode, fields: Field[]) => (
    <>
      <div className={styles.intro}>
        <h2 id="contact-title">{title}</h2>
        <div className={styles.aside}>{aside}</div>
      </div>
      {status === "sent" ? (
        <div className={styles.done} role="status">
          <h3>Message sent.</h3>
          <p>Thanks. I&apos;ll reply by email.</p>
          <button type="button" className={styles.pill} onClick={() => setStatus("idle")}>
            Send another
          </button>
        </div>
      ) : (
        <form className={styles.rows} onSubmit={(e) => onSubmit(e, fields)} noValidate>
          {fields.map(renderField)}
          <div className={styles.honeypot} aria-hidden="true">
            <label htmlFor="contact-website">Website</label>
            <input
              id="contact-website"
              tabIndex={-1}
              autoComplete="off"
              value={String(values.website ?? "")}
              onChange={(e) => setValue("website", e.target.value)}
            />
          </div>
          <div className={styles.sendRow}>
            <p className={styles.mono}>
              {status === "failed" ? (
                <span role="alert" className={styles.failed}>
                  The message didn&apos;t go through. Try again or use the Email tab.
                </span>
              ) : (
                "* Required"
              )}
            </p>
            <button type="submit" className={styles.send} disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Send"}
            </button>
          </div>
        </form>
      )}
    </>
  );

  return (
    <>
      <div className={styles.scrim} data-open={isOpen} onClick={close} aria-hidden="true" data-lenis-prevent />
      <section
        ref={sheetRef}
        className={styles.sheet}
        data-open={isOpen}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-title"
        inert={!isOpen}
      >
        <div className={styles.bar}>
          <div className={styles.tabs} role="tablist" aria-label="Contact options">
            {(["project", "hiring", "email"] as const).map((t) => (
              <button
                key={t}
                type="button"
                role="tab"
                aria-selected={tab === t}
                className={styles.tab}
                onClick={() => switchTab(t)}
              >
                {t}
              </button>
            ))}
          </div>
          <button type="button" className={styles.close} onClick={close}>
            Close
          </button>
        </div>

        <div className={styles.body} ref={bodyRef} data-lenis-prevent>
          {tab === "project" &&
            form(
              "let's build something together",
              <>
                <p>Tell me about your project and I&apos;ll get back to you by email.</p>
                <p>
                  Prefer to talk?{" "}
                  <a href={site.call} target="_blank" rel="noopener noreferrer">
                    Book a free 45-minute call
                  </a>
                </p>
              </>,
              projectFields,
            )}
          {tab === "hiring" &&
            form(
              "hiring for your team?",
              <p>I&apos;m open to remote roles and agency partnerships worldwide, and on-site roles in Morocco.</p>,
              hiringFields,
            )}
          {tab === "email" && (
            <>
              <div className={styles.intro}>
                <h2 id="contact-title">or just write to me</h2>
                <div className={styles.aside}>
                  <p>Email and WhatsApp both work.</p>
                </div>
              </div>
              <div className={styles.emailPane}>
                <div>
                  <p className={styles.label}>Email</p>
                  <a id="contact-address" className={styles.big} href={`mailto:${site.email}`}>
                    {site.email}
                  </a>
                  <button type="button" className={styles.pill} onClick={copyEmail}>
                    {copied ? "Copied" : "Copy email"}
                  </button>
                </div>
                <div>
                  <p className={styles.label}>Phone and WhatsApp</p>
                  <a className={styles.big} href={`tel:${site.phone.replaceAll(" ", "")}`}>
                    {site.phone}
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
