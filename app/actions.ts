"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: any) {
  const { name, email, org, service, budget, message } = formData;

  try {
    const data = await resend.emails.send({
      // CHANGE THIS LINE: Use any address @yourdomain
      from: "Portfolio Contact <contact@mohssinechedgane.me>",

      // Now you can send to ANY email you want
      to: ["chedganemouhssine@gmail.com"],

      subject: `New Inquiry from ${name}`,
      replyTo: email,
      html: `
        <h2>New Inquiry from ${name}</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Organization:</strong> ${org}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Budget:</strong> ${budget}</p>
        <hr />
        <h3>Message:</h3>
        <p>${message}</p>
      `,
    });

    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
}
