"use server";

import { redirect } from "next/navigation";

import { findStrataMemberships } from "../../../../../data/strataMemberships/findStrataMemberships";
import { getStrataById } from "../../../../../data/stratas/getStrataById";
import { deleteUserPasswordResetToken } from "../../../../../data/userPasswordResetTokens/deleteUserPasswordResetToken";
import { getUserPasswordResetToken } from "../../../../../data/userPasswordResetTokens/getUserPasswordResetToken";
import { updateUser } from "../../../../../data/users/updateUser";

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

  const memberships = await findStrataMemberships({
    userId: resetToken.userId,
  });

  if (!memberships) {
    throw new Error("");
  }

  const strata = await getStrataById(memberships[0].strataId);

  if (!strata) {
    throw new Error("");
  }

  redirect(
    (process.env.NODE_ENV === "development" ? "http://" : "https://") +
      strata.domain,
  );
}
