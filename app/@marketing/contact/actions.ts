"use server";

import { auth } from "../../../auth";
import { getString } from "../../../utils/formdata";
import { sendEmail } from "../../../utils/sendEmail";

export type SubmitContactFormActionState = {
  success?: boolean;
};

export async function submitContactFormActionReducer(
  state: SubmitContactFormActionState,
  fd: FormData,
): Promise<SubmitContactFormActionState> {
  const name = getString(fd, "name");
  const email = getString(fd, "email");
  const subject = getString(fd, "subject");
  const message = getString(fd, "message");

  const u = await auth();

  // @todo santize
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
}
