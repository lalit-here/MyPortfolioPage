import { readBoundedJson, sanitizePlainText } from "@/lib/input-validation";
import { Resend } from "resend";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
};

const MAX_NAME = 80;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 2000;

function sanitizeEmail(input: unknown): string | null {
  if (typeof input !== "string") return null;
  const email = input.trim().toLowerCase();
  if (!email || email.length > MAX_EMAIL) return null;
  if (/[\u0000-\u001f\u007f<>"'`]/.test(email)) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return null;
  return email;
}

function sanitizeMessage(input: unknown): string | null {
  if (typeof input !== "string") return null;
  const message = input.replace(/\0/g, "").replace(/\r\n/g, "\n").trim();
  if (!message || message.length > MAX_MESSAGE) return null;
  if (/[\u0001-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(message)) return null;
  return message;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  const parsed = await readBoundedJson<ContactPayload>(request);
  if (!parsed.ok) return parsed.response;

  const name = sanitizePlainText(parsed.value.name, MAX_NAME);
  const email = sanitizeEmail(parsed.value.email);
  const message = sanitizeMessage(parsed.value.message);

  if (!name || !email || !message) {
    return Response.json({ error: "Please provide a valid name, email, and message." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim() || process.env.CONTACT_EMAIL?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim() || "Portfolio Contact <onboarding@resend.dev>";

  if (!apiKey || !to) {
    return Response.json({ error: "Contact inbox is not configured yet." }, { status: 503 });
  }

  const resend = new Resend(apiKey);
  const submittedAt = new Date().toISOString();
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `Portfolio contact: ${name}`,
    text: `New portfolio message\n\nName: ${name}\nEmail: ${email}\nSubmitted: ${submittedAt}\n\n${message}`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
        <h2 style="margin: 0 0 16px;">New portfolio message</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Submitted:</strong> ${escapeHtml(submittedAt)}</p>
        <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
        <p>${safeMessage}</p>
      </div>
    `,
  });

  if (error) {
    return Response.json({ error: "Could not send message. Please try again later." }, { status: 502 });
  }

  return Response.json({ ok: true });
}

export function GET() {
  return Response.json({ error: "Method not allowed" }, { status: 405 });
}
