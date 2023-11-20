const FROM_ADDR = process.env.EMAIL_FROM_ADDR || "no-reply@strataspheric.app";

export async function sendEmail(to: string, subject: string, html: string) {
  return fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: `Strataspheric <${FROM_ADDR}>`,
      to: [to],
      subject,
      html,
    }),
  });
}
