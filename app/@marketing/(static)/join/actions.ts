"use server";

import { redirect } from "next/navigation";

import { findStrataMemberships } from "../../../../data/strataMemberships/findStrataMemberships";
import { getStrataById } from "../../../../data/stratas/getStrataById";
import { deleteUserPasswordResetToken } from "../../../../data/userPasswordResetTokens/deleteUserPasswordResetToken";
import { getUserPasswordResetToken } from "../../../../data/userPasswordResetTokens/getUserPasswordResetToken";
import { createUser } from "../../../../data/users/createUser";
import { getUser } from "../../../../data/users/getUser";
import { updateUser } from "../../../../data/users/updateUser";
import * as formdata from "../../../../utils/formdata";

export type JoinFormState =
  | {
      success: false;
      error: string;
    }
  | {
      success: true;
    }
  | null;

export async function joinAction(
  _formState: JoinFormState,
  fd: FormData,
): Promise<JoinFormState> {
  const email = formdata.getString(fd, "email");
  const name = formdata.getString(fd, "name");
  const password = formdata.getString(fd, "password");
  const confirmPassword = formdata.getString(fd, "confirmPassword");
  const isRealtor = formdata.getBoolean(fd, "isRealtor");

  if (password !== confirmPassword) {
    return {
      success: false,
      error: "passwords do not match",
    };
  }

  try {
    const existingUser = await getUser(email);

    if (existingUser) {
      await updateUser(existingUser.id, { name, password });
    } else {
      await createUser({
        email,
        password,
        accountType: isRealtor ? "realtor" : "user",
        name,
      });
    }
  } catch (e) {
    return {
      success: false,
      error: e,
    };
  }

  return { success: true };
}

export async function joinFromTokenAction(token: string, fd: FormData) {
  const password = fd.get("password");
  const confirmPassword = fd.get("confirm_password");

  if (
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
