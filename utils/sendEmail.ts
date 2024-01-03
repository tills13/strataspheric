import { createEmail } from "../data/emails/createEmail";

const FROM_ADDR = process.env.EMAIL_FROM_ADDR || "no-reply@strataspheric.app";

export async function sendEmail(
  to: string | string[],
  subject: string,
  html: string,
) {
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: `Strataspheric <${FROM_ADDR}>`,
      to: typeof to === "string" ? [to] : to,
      subject,
      html,
    }),
  });

  const rJson = await r.json();

  await createEmail(rJson.id);

  return rJson;
}
