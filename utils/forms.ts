"use server";

import { CF_TURNSTILE_SECRET_KEY } from "../cloudflare/constants";
import { ServerActionError } from "./actions";

export async function validateTurnstileToken(
  token: string,
  connectingIp: string,
) {
  const formData = new FormData();
  formData.append("secret", CF_TURNSTILE_SECRET_KEY);
  formData.append("response", token);
  formData.append("remoteip", connectingIp);

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      body: formData,
      method: "POST",
    },
  );

  const result = await response.json();

  console.log(
    "[debug] response from turnstile siteverify",
    JSON.stringify(result, undefined, 2),
  );

  if (!result.success) {
    throw new ServerActionError(
      "invalid turnstile token",
      "failed spam prevention verification, try again later",
    );
  }
}
