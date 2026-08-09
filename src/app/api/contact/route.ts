import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { SITE } from "@/lib/constants";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, company, phone, service, budget, message } = body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "Name, email and message are required." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email.trim())) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error("SMTP env vars are not set — contact form cannot send email.");
    return NextResponse.json(
      { error: "Email delivery is not configured yet. Please email us directly." },
      { status: 503 }
    );
  }

  const port = Number(SMTP_PORT) || 587;
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const fromAddress = process.env.CONTACT_FROM_EMAIL || SMTP_USER;
  const toAddress = process.env.CONTACT_TO_EMAIL || SITE.email;

  try {
    await transporter.sendMail({
      from: `"Qubion.Ai Website" <${fromAddress}>`,
      to: toAddress,
      replyTo: email.trim(),
      subject: `New project inquiry from ${name.trim()}`,
      text: [
        `Name: ${name.trim()}`,
        `Email: ${email.trim()}`,
        company ? `Company: ${company.trim()}` : null,
        phone ? `Phone: ${phone.trim()}` : null,
        service ? `Service: ${service}` : null,
        budget ? `Budget: ${budget}` : null,
        "",
        "Message:",
        message.trim(),
      ]
        .filter(Boolean)
        .join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form send failed:", err);
    return NextResponse.json({ error: "Could not send your message. Please try again." }, { status: 500 });
  }
}
