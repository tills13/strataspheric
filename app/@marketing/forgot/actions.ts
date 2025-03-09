"use server";

import { protocol, tld } from "../../../constants";
import { createUserPasswordResetToken } from "../../../data/userPasswordResetTokens/createUserPasswordResetToken";
import { deleteUserPasswordResetToken } from "../../../data/userPasswordResetTokens/deleteUserPasswordResetToken";
import { getUserPasswordResetToken } from "../../../data/userPasswordResetTokens/getUserPasswordResetToken";
import { getUser } from "../../../data/users/getUser";
import { updateUser } from "../../../data/users/updateUser";
import { sendEmail } from "../../../utils/sendEmail";

export interface RequestResetPasswordFormState {
  error?: string;
  success?: boolean;
}

export async function requestPasswordResetActionReducer(
  state: RequestResetPasswordFormState,
  fd: FormData,
): Promise<RequestResetPasswordFormState> {
  const emailAddress = fd.get("email_address");

  if (typeof emailAddress !== "string" || emailAddress === "") {
    return {
      success: false,
      error: 'required field "email" is missing',
    };
  }

  const u = await getUser(emailAddress);

  if (!u) {
    return { success: true };
  }

  try {
    let token = await getUserPasswordResetToken({ userId: u.id });

    if (!token) {
      token = await createUserPasswordResetToken({ userId: u.id });
    }

    const r = await sendEmail(
      u.email,
      "Strataspheric: Password Reset",
      `
    A password reset has been requested for your account on Strataspheric.
    If this was not you, you can ignore this email.

    To reset your password, <a href="${protocol}//${tld}/forgot?token=${token.token}">click here</a>.
  `,
    );
  } catch (e) {
    // do nothing but log the error
    console.log(e);
  } finally {
    return { success: true };
  }
}

export async function resetPasswordAction(fd: FormData) {
  const token = fd.get("token");
  const password = fd.get("password");
  const confirmPassword = fd.get("confirm_password");

  if (
    typeof token !== "string" ||
    token === "" ||
    typeof password !== "string" ||
    typeof confirmPassword !== "string" ||
    password === "" ||
    password !== confirmPassword
  ) {
    throw new Error("invalid input");
  }

  const resetToken = await getUserPasswordResetToken({ token });

  if (!resetToken) {
    throw new Error("token does not exist");
  }

  await updateUser(resetToken.userId, { password });
  await deleteUserPasswordResetToken(resetToken.token);
}
