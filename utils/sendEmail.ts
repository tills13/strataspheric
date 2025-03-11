import { createEmail } from "../data/emails/createEmail";
import { ServerActionError } from "./actions";

const FROM_ADDR = process.env.EMAIL_FROM_ADDR || "no-reply@strataspheric.app";

export async function sendEmail(
  to: string | string[],
  subject: string,
  html: string,
) {
  console.log("[debug] sending email to", to);

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

  const rJson = (await r.json()) as { id: string } | { message: string };
  if (r.status !== 200) {
    throw new ServerActionError(
      "[resend] failed to send email: " +
        (rJson.message || "an unknown error occured"),
      "Something went wrong, please try again later.x",
    );
  }

  await createEmail(rJson.id);

  return rJson;
}
