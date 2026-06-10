"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type ContactFormData = {
  name: string;
  email: string;
  org: string;
  service: string;
  budget: string;
  message: string;
};

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

export async function sendEmail(formData: ContactFormData) {
  const { name, email, org, service, budget, message } = formData;

  try {
    const data = await resend.emails.send({
      from: "Portfolio Contact <contact@mohssinechedgane.com>",
      to: ["chedganemouhssine@gmail.com"],
      subject: `New Inquiry from ${name}`,
      replyTo: email,
      html: `
        <h2>New Inquiry from ${escapeHtml(name)}</h2>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Organization:</strong> ${escapeHtml(org)}</p>
        <p><strong>Service:</strong> ${escapeHtml(service)}</p>
        <p><strong>Budget:</strong> ${escapeHtml(budget)}</p>
        <hr />
        <h3>Message:</h3>
        <p>${escapeHtml(message).replaceAll("\n", "<br />")}</p>
      `,
    });

    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
}
