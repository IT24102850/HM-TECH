import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { siteConfig } from "@/lib/site";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, budget, message } = body || {};

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT || 587);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const fromAddress = process.env.SMTP_FROM || siteConfig.email;
    const toAddress = process.env.CONTACT_TO || siteConfig.email;

    if (!smtpHost || !smtpUser || !smtpPass) {
      return NextResponse.json(
        {
          error:
            "Email is not configured. Add SMTP_HOST, SMTP_USER, SMTP_PASS, and optionally CONTACT_TO to your environment variables.",
        },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: `HM Tech Contact <${fromAddress}>`,
      to: toAddress,
      replyTo: email,
      subject: `New project inquiry from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Company: ${company || "N/A"}
Budget: ${budget || "N/A"}

Project details:
${message}
      `,
      html: `
        <h2>New project inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || "N/A"}</p>
        <p><strong>Budget:</strong> ${budget || "N/A"}</p>
        <p><strong>Project details:</strong></p>
        <p>${message.replace(/\n/g, "<br />")}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form email error:", error);
    return NextResponse.json(
      {
        error: "The message could not be sent. Please check your SMTP settings or try again later.",
      },
      { status: 500 }
    );
  }
}
