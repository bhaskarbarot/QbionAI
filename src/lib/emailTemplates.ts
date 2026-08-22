import { SITE } from "@/lib/constants";

const COLORS = {
  headerBg: "#070c0a",
  pageBg: "#f2f6f3",
  cardBg: "#ffffff",
  green: "#16a34a",
  lime: "#a3e635",
  text: "#1f2a24",
  muted: "#5b6b62",
  border: "#e4ece6",
  soft: "#f2f9f4",
  softBorder: "#dbeee0",
};

function escapeHtml(v: string) {
  return v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function shell(bodyHtml: string) {
  return `<!DOCTYPE html>
<html lang="en">
<body style="margin:0;padding:0;background:${COLORS.pageBg};font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${COLORS.pageBg};padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:${COLORS.cardBg};border-radius:18px;overflow:hidden;border:1px solid ${COLORS.border};">
          <tr>
            <td style="background:${COLORS.headerBg};padding:26px 36px;">
              <span style="font-size:22px;font-weight:800;color:#ffffff;letter-spacing:-0.02em;font-family:Arial,Helvetica,sans-serif;">qubion<span style="color:${COLORS.lime};">.ai</span></span>
            </td>
          </tr>
          ${bodyHtml}
          <tr>
            <td style="padding:22px 36px;background:${COLORS.soft};border-top:1px solid ${COLORS.softBorder};">
              <p style="margin:0 0 4px;font-size:12px;color:${COLORS.muted};">© ${new Date().getFullYear()} ${SITE.name}. ${SITE.subline}.</p>
              <p style="margin:0;font-size:12px;color:${COLORS.muted};">${SITE.email} &nbsp;•&nbsp; ${SITE.phone} &nbsp;•&nbsp; ${SITE.location}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function contactBlock() {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 4px;">
      <tr><td style="padding:3px 0;font-size:14px;color:${COLORS.text};">
        <span style="display:inline-block;width:78px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:${COLORS.green};">Email</span>
        <a href="mailto:${SITE.email}" style="color:${COLORS.text};text-decoration:none;">${SITE.email}</a>
      </td></tr>
      <tr><td style="padding:3px 0;font-size:14px;color:${COLORS.text};">
        <span style="display:inline-block;width:78px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:${COLORS.green};">Phone</span>
        <a href="tel:${SITE.phone.replace(/\s/g, "")}" style="color:${COLORS.text};text-decoration:none;">${SITE.phone}</a>
      </td></tr>
      <tr><td style="padding:3px 0;font-size:14px;color:${COLORS.text};">
        <span style="display:inline-block;width:78px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:${COLORS.green};">Location</span>
        ${SITE.location}
      </td></tr>
    </table>`;
}

export function welcomeEmailHtml(data: { name: string; message: string }) {
  const firstName = escapeHtml(data.name.split(" ")[0]);
  const message = escapeHtml(data.message.trim());
  const excerpt = message.length > 220 ? message.slice(0, 220) + "…" : message;

  const body = `
    <tr>
      <td style="padding:36px;">
        <h1 style="margin:0 0 16px;font-size:21px;color:${COLORS.text};font-family:Arial,Helvetica,sans-serif;">Hi ${firstName},</h1>
        <p style="margin:0 0 16px;font-size:15px;line-height:1.65;color:${COLORS.text};">
          Thanks for reaching out to <strong>${SITE.name}</strong>. We've received your message and a member of our team will connect with you within <strong>2 working days</strong>.
        </p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:22px 0;background:${COLORS.soft};border:1px solid ${COLORS.softBorder};border-radius:12px;">
          <tr><td style="padding:18px 22px;">
            <p style="margin:0 0 6px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:${COLORS.green};">What you told us</p>
            <p style="margin:0;font-size:14px;line-height:1.6;color:${COLORS.muted};">"${excerpt}"</p>
          </td></tr>
        </table>
        <p style="margin:0 0 14px;font-size:15px;line-height:1.65;color:${COLORS.text};">
          If anything is urgent, you can reach us directly:
        </p>
        ${contactBlock()}
        <div style="margin-top:26px;">
          <a href="https://qubionai.in" style="display:inline-block;padding:12px 28px;background:${COLORS.green};color:#ffffff;font-size:14px;font-weight:700;border-radius:999px;text-decoration:none;">Visit Our Website</a>
        </div>
        <p style="margin:26px 0 0;font-size:14px;color:${COLORS.muted};">Talk soon,<br/>The ${SITE.name} Team</p>
      </td>
    </tr>`;

  return shell(body);
}

export function leadNotificationHtml(data: {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service?: string;
  message: string;
}) {
  const rows: [string, string][] = [
    ["Name", data.name],
    ["Email", data.email],
  ];
  if (data.company) rows.push(["Company", data.company]);
  if (data.phone) rows.push(["Phone", data.phone]);
  if (data.service) rows.push(["Service", data.service]);

  const rowsHtml = rows
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:9px 0;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:${COLORS.green};width:110px;vertical-align:top;border-bottom:1px solid ${COLORS.border};">${escapeHtml(label)}</td>
        <td style="padding:9px 0;font-size:14px;color:${COLORS.text};border-bottom:1px solid ${COLORS.border};">${escapeHtml(value)}</td>
      </tr>`
    )
    .join("");

  const body = `
    <tr>
      <td style="padding:36px;">
        <span style="display:inline-block;margin-bottom:14px;padding:5px 14px;background:${COLORS.soft};border:1px solid ${COLORS.softBorder};border-radius:999px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:${COLORS.green};">New Website Lead</span>
        <h1 style="margin:0 0 18px;font-size:21px;color:${COLORS.text};font-family:Arial,Helvetica,sans-serif;">${escapeHtml(data.name)} just reached out</h1>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
          ${rowsHtml}
        </table>
        <p style="margin:0 0 6px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:${COLORS.green};">Message</p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${COLORS.soft};border:1px solid ${COLORS.softBorder};border-radius:12px;margin-bottom:26px;">
          <tr><td style="padding:16px 20px;font-size:14px;line-height:1.6;color:${COLORS.text};">${escapeHtml(data.message.trim())}</td></tr>
        </table>
        <a href="mailto:${data.email}" style="display:inline-block;padding:12px 28px;background:${COLORS.green};color:#ffffff;font-size:14px;font-weight:700;border-radius:999px;text-decoration:none;">Reply To ${escapeHtml(data.name.split(" ")[0])}</a>
      </td>
    </tr>`;

  return shell(body);
}
