import { Resend } from "resend";
import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations/contact";
import { siteConfig } from "@/lib/content";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const fromAddress =
  process.env.RESEND_FROM_EMAIL || "Contact Form <onboarding@resend.dev>";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const { name, email, message, company } = parsed.data;

  // Honeypot triggered — respond as if it worked so bots learn nothing.
  if (company) {
    return NextResponse.json({ ok: true });
  }

  if (!resend) {
    console.error("RESEND_API_KEY is not configured");
    return NextResponse.json(
      { error: "Email service is not configured" },
      { status: 500 },
    );
  }

  try {
    const { error } = await resend.emails.send({
      from: fromAddress,
      to: siteConfig.email,
      replyTo: email,
      subject: `New message from ${name} via damiensmith.dev`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send message" },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form submission failed:", err);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 },
    );
  }
}
