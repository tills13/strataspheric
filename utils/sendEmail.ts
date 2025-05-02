import { createEmail } from "../data/emails/createEmail";
import { ServerActionError } from "./actions";

const FROM_ADDR = process.env.EMAIL_FROM_ADDR || "no-reply@strataspheric.app";

/** @todo templates */
export async function sendEmail(
  to: string | string[],
  subject: string,
  html: string,
) {
  console.log("[debug] sending email to", to);

  const response = await fetch("https://api.resend.com/emails", {
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

  // @todo typing
  const rJson = (await response.json()) as unknown; // as { id: string } | { message: string };

  if (
    response.status !== 200 ||
    !rJson ||
    typeof rJson !== "object" ||
    !("id" in rJson) ||
    typeof rJson.id !== "string"
  ) {
    let internalErrorMessage = "an unknown error occured";

    if (
      rJson !== null &&
      typeof rJson === "object" &&
      "message" in rJson &&
      typeof rJson.message === "string"
    ) {
      internalErrorMessage = rJson.message;
    }

    throw new ServerActionError(
      "[resend] failed to send email: " + internalErrorMessage,
      "Something went wrong, please try again later.",
    );
  }

  await createEmail(rJson.id);

  return rJson;
}
