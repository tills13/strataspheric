"use server";

import { headers } from "next/headers";

import { auth } from "../../../auth";
import { withErrorReporting } from "../../../utils/actions";
import { getString } from "../../../utils/formdata";
import { validateTurnstileToken } from "../../../utils/forms";
import { sendEmail } from "../../../utils/sendEmail";

export type SubmitContactFormActionState = {
  errorMessage?: string;
  success?: boolean;
};

export const submitContactFormActionReducer = withErrorReporting(
  async (
    state: SubmitContactFormActionState,
    fd: FormData,
  ): Promise<SubmitContactFormActionState> => {
    const connectingIp = headers().get("CF-Connecting-IP");
    const token = getString(fd, "turnstileToken");

    await validateTurnstileToken(token, connectingIp || "");

    const name = getString(fd, "name");
    const email = getString(fd, "email");
    const subject = getString(fd, "subject");
    const message = getString(fd, "message");

    const u = await auth();

    await sendEmail(
      ["tills13@gmail.com"],
      `Contact Form: ${subject}`,
      `
        From: &lt;${name}&gt; ${email} <br/>
        User Information: </br>
        <pre>
            ID: ${u?.user.id}
            Name: ${u?.user.name}
            Email: ${u?.user.email}
        </pre>
        <hr/>
        ${message}
    `.trim(),
    );

    return { success: true };
  },
);
