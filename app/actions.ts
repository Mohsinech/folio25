"use server";

import { Resend } from "resend";

export type ContactPayload = {
  kind: "project" | "hiring";
  name: string;
  email: string;
  answers: { label: string; value: string }[];
  /** Honeypot: real visitors never see or fill this field. */
  website?: string;
};

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendEmail(payload: ContactPayload) {
  // Bots fill the honeypot; report success so they move on.
  if (payload.website) return { success: true };

  const name = payload.name?.trim().slice(0, 200) ?? "";
  const email = payload.email?.trim().slice(0, 200) ?? "";
  if (!name || !EMAIL_RE.test(email)) return { success: false };

  const answers = (Array.isArray(payload.answers) ? payload.answers : [])
    .slice(0, 20)
    .map((a) => ({
      label: String(a.label ?? "").slice(0, 60),
      value: String(a.value ?? "").slice(0, 4000),
    }))
    .filter((a) => a.label && a.value);

  const kind = payload.kind === "hiring" ? "Hiring inquiry" : "Project inquiry";

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: "Portfolio Contact <contact@mohssinechedgane.com>",
      to: ["chedganemouhssine@gmail.com"],
      subject: `${kind} from ${name}`,
      replyTo: email,
      html: `
        <h2>${kind} from ${escapeHtml(name)}</h2>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${answers
          .map(
            (a) =>
              `<p><strong>${escapeHtml(a.label)}:</strong><br />${escapeHtml(a.value).replaceAll("\n", "<br />")}</p>`,
          )
          .join("")}
      `,
    });
    return { success: !error };
  } catch {
    return { success: false };
  }
}
