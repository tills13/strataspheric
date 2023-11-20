"use server";

import { createUserPasswordResetToken } from "../../../../../db/userPasswordResetTokens/createUserPasswordResetToken";
import { deleteUserPasswordResetToken } from "../../../../../db/userPasswordResetTokens/deleteUserPasswordResetToken";
import { getUserPasswordResetToken } from "../../../../../db/userPasswordResetTokens/getUserPasswordResetToken";
import { getUser } from "../../../../../db/users/getUser";
import { updateUser } from "../../../../../db/users/updateUser";
import { sendEmail } from "../../../../../utils/sendEmail";

const domain =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://strataspheric.app";

export async function requestPasswordResetAction(fd: FormData) {
  const emailAddress = fd.get("email_address");

  if (typeof emailAddress !== "string" || emailAddress === "") {
    throw new Error("invalid");
  }

  const u = await getUser(emailAddress);

  if (!u) {
    return;
  }

  let token = await getUserPasswordResetToken({ userId: u.id });

  if (!token) {
    token = await createUserPasswordResetToken({ userId: u.id });
  }

  await sendEmail(
    u.email,
    "Strataspheric: Password Reset",
    `
    A password reset has been requested for your account on Strataspheric.
    If this was not you, you can ignore this email.
  
    To reset your password, <a href="${domain}/forgot?token=${token.token}">click here</a>.
  `,
  );
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