"use server";

import { isValidEmail } from "@/lib/domain";

export type FormStatus = "invalid" | "unconfigured" | "error" | "success";

export type FormResult = {
  status: FormStatus;
  message: string;
};

function endpoint(name: "CONTACT_ENDPOINT" | "NEWSLETTER_ENDPOINT") {
  const value = process.env[name]?.trim();
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return null;
    return url.toString();
  } catch {
    return null;
  }
}

async function postJson(url: string, body: Record<string, string>) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(8000),
  });
  return response.ok;
}

export async function submitContact(formData: FormData): Promise<FormResult> {
  const company = String(formData.get("company") ?? "").trim();
  if (company) {
    return { status: "error", message: "The message could not be submitted." };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (name.length < 2) {
    return { status: "invalid", message: "Enter your name." };
  }
  if (!isValidEmail(email)) {
    return { status: "invalid", message: "Enter a valid email address, such as name@example.com." };
  }
  if (subject.length < 2) {
    return { status: "invalid", message: "Enter a subject." };
  }
  if (message.length < 10) {
    return { status: "invalid", message: "Enter a message of at least a short sentence." };
  }

  const url = endpoint("CONTACT_ENDPOINT");
  if (!url) {
    return {
      status: "unconfigured",
      message: "Your message was not sent. A contact delivery service is not connected yet.",
    };
  }

  try {
    const ok = await postJson(url, { name, email, subject, message });
    if (!ok) {
      return { status: "error", message: "The message could not be delivered. Please try again later." };
    }
    return { status: "success", message: "Your message was sent." };
  } catch {
    return { status: "error", message: "The message could not be delivered. Please try again later." };
  }
}

export async function submitNewsletter(formData: FormData): Promise<FormResult> {
  const company = String(formData.get("company") ?? "").trim();
  if (company) {
    return { status: "error", message: "The subscription could not be submitted." };
  }

  const email = String(formData.get("email") ?? "").trim();
  if (!email) {
    return { status: "invalid", message: "Enter an email address." };
  }
  if (!isValidEmail(email)) {
    return { status: "invalid", message: "Enter a valid email address, such as name@example.com." };
  }

  const url = endpoint("NEWSLETTER_ENDPOINT");
  if (!url) {
    return {
      status: "unconfigured",
      message: "This address was not subscribed. Newsletter delivery is not connected yet.",
    };
  }

  try {
    const ok = await postJson(url, { email });
    if (!ok) {
      return { status: "error", message: "The subscription could not be completed. Please try again later." };
    }
    return { status: "success", message: "You are subscribed. Watch your inbox for a confirmation if the provider sends one." };
  } catch {
    return { status: "error", message: "The subscription could not be completed. Please try again later." };
  }
}
