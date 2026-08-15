import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

const CORPORATE_EMAIL = "sale@tarpstandart.ru";

export type ContactFormPayload = {
  name: string;
  company?: string;
  contact: string;
  topic: string;
  message: string;
};

function getRequiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function createTransporter(): Transporter {
  const host = getRequiredEnv("SMTP_HOST");
  const port = Number(process.env.SMTP_PORT ?? "587");
  const user = getRequiredEnv("SMTP_USER");
  const pass = getRequiredEnv("SMTP_PASS");

  if (Number.isNaN(port) || port <= 0) {
    throw new Error(`Invalid SMTP_PORT value: "${process.env.SMTP_PORT}"`);
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

function buildEmailContent(data: ContactFormPayload) {
  const subject = `Новая заявка с сайта: ${data.topic}`;
  const text = [
    "Новая заявка с формы обратной связи на сайте ТарпСтандарт",
    "",
    `Имя: ${data.name}`,
    `Компания: ${data.company?.trim() || "—"}`,
    `Телефон или Email: ${data.contact}`,
    `Тема: ${data.topic}`,
    "",
    "Сообщение:",
    data.message,
  ].join("\n");

  const html = `
    <h2>Новая заявка с формы обратной связи</h2>
    <p><strong>Имя:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Компания:</strong> ${escapeHtml(data.company?.trim() || "—")}</p>
    <p><strong>Телефон или Email:</strong> ${escapeHtml(data.contact)}</p>
    <p><strong>Тема:</strong> ${escapeHtml(data.topic)}</p>
    <p><strong>Сообщение:</strong></p>
    <p>${escapeHtml(data.message).replace(/\n/g, "<br />")}</p>
  `;

  return { subject, text, html };
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function sendContactFormEmail(data: ContactFormPayload): Promise<void> {
  const transporter = createTransporter();
  const recipient = process.env.CONTACT_RECIPIENT_EMAIL?.trim() || CORPORATE_EMAIL;
  const from = process.env.SMTP_FROM?.trim() || getRequiredEnv("SMTP_USER");
  const { subject, text, html } = buildEmailContent(data);

  await transporter.sendMail({
    from,
    to: recipient,
    replyTo: data.contact.includes("@") ? data.contact : undefined,
    subject,
    text,
    html,
  });
}
