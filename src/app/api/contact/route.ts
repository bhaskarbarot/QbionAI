import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { SITE } from "@/lib/constants";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

function isValidPhone(v: string) {
  if (!v.trim()) return true;
  const digits = v.replace(/[^\d]/g, "").replace(/^91/, "");
  if (digits.length !== 10) return false;
  if (/^(\d)\1{9}$/.test(digits)) return false;
  return true;
}

export async function POST(req: Request) {
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, company, phone, service, message } = body;

  if (!name?.trim() || name.trim().length < 2) {
    return NextResponse.json({ error: "Please enter your full name." }, { status: 400 });
  }
  if (!email?.trim() || !EMAIL_RE.test(email.trim())) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (!isValidPhone(phone || "")) {
    return NextResponse.json({ error: "Please enter a valid phone number." }, { status: 400 });
  }
  if (!message?.trim() || message.trim().length < 10) {
    return NextResponse.json({ error: "Please add a few more details about your project." }, { status: 400 });
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
  const cleanName = name.trim();

  try {
    // 1. Lead notification to the team
    await transporter.sendMail({
      from: `"Qubion.Ai Website" <${fromAddress}>`,
      to: toAddress,
      replyTo: email.trim(),
      subject: `New Lead: ${cleanName}${service ? ` (${service})` : ""}`,
      text: [
        "A new lead came in from the website contact form.",
        "",
        `Name: ${cleanName}`,
        `Email: ${email.trim()}`,
        company ? `Company: ${company.trim()}` : null,
        phone ? `Phone: ${phone.trim()}` : null,
        service ? `Service: ${service}` : null,
        "",
        "Message:",
        message.trim(),
      ]
        .filter(Boolean)
        .join("\n"),
    });

    // 2. Auto reply welcome email to the person who submitted the form
    await transporter.sendMail({
      from: `"Qubion.Ai" <${fromAddress}>`,
      to: email.trim(),
      subject: "Welcome to Qubion.Ai, we've received your message",
      text: [
        `Hi ${cleanName.split(" ")[0]},`,
        "",
        "Thanks for reaching out to Qubion.Ai. We've received your message and a member of our team will connect with you within 2 working days.",
        "",
        "In the meantime, if anything is urgent, you can reach us directly at " + SITE.email + ".",
        "",
        "Talk soon,",
        "The Qubion.Ai Team",
      ].join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    const code = (err as { code?: string })?.code;
    console.error("Contact form send failed:", { code, err });

    if (code === "EAUTH") {
      return NextResponse.json(
        { error: "Email login failed. The mailbox username or password is incorrect." },
        { status: 502 }
      );
    }
    if (code === "ECONNECTION" || code === "ESOCKET" || code === "ETIMEDOUT" || code === "ECONNREFUSED") {
      return NextResponse.json(
        { error: "Could not reach the mail server. Please check the SMTP host and port." },
        { status: 502 }
      );
    }
    return NextResponse.json({ error: "Could not send your message. Please try again." }, { status: 500 });
  }
}
