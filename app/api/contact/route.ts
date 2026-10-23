import { NextResponse } from "next/server";
import { Resend } from "resend";
import { rateLimit } from "@/lib/rate-limit";
import { escapeHtml } from "@/lib/utils";
import { contactSchema } from "@/lib/validators";

export const runtime = "nodejs";

function clientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || "local";
}

export function GET() {
  return NextResponse.json({ ok: false, error: "Method not allowed." }, { status: 405 });
}

export async function POST(request: Request) {
  const limit = rateLimit(clientKey(request));
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many messages. Please try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(limit.retryAfter) },
      },
    );
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json({ ok: false, error: "Unsupported content type." }, { status: 415 });
  }

  const raw = await request.text();
  if (raw.length > 20_000) {
    return NextResponse.json({ ok: false, error: "Message is too large." }, { status: 413 });
  }

  let payload: unknown;
  try {
    payload = JSON.parse(raw) as unknown;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Check the form and try again.",
        fields: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  if (parsed.data.company.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = parsed.data.name.replace(/[\r\n]+/g, " ");
  const email = parsed.data.email.replace(/[\r\n]+/g, "");
  const message = parsed.data.message;
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    if (process.env.NODE_ENV !== "production") {
      console.info("Contact form validated. Email delivery is not configured.");
      return NextResponse.json({ ok: true, preview: true });
    }
    return NextResponse.json(
      { ok: false, error: "The contact form is not configured yet." },
      { status: 503 },
    );
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Portfolio inquiry from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `<p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p><p>${escapeHtml(message).replaceAll("\n", "<br>")}</p>`,
    });
  } catch (error) {
    console.error("Contact delivery failed", error);
    return NextResponse.json(
      { ok: false, error: "The message could not be sent. Please email me directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
