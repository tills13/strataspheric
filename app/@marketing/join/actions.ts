"use server";

import { redirect } from "next/navigation";

import { createStrataMembership } from "../../../data/memberships/createStrataMembership";
import { listStrataMemberships } from "../../../data/memberships/listStrataMemberships";
import { getCurrentStrata } from "../../../data/stratas/getStrataByDomain";
import { getStrataById } from "../../../data/stratas/getStrataById";
import { deleteUserPasswordResetToken } from "../../../data/userPasswordResetTokens/deleteUserPasswordResetToken";
import { getUserPasswordResetToken } from "../../../data/userPasswordResetTokens/getUserPasswordResetToken";
import { createUser } from "../../../data/users/createUser";
import { getUser } from "../../../data/users/getUser";
import { updateUser } from "../../../data/users/updateUser";
import * as formdata from "../../../utils/formdata";

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
  const strata = await getCurrentStrata();

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

    if (existingUser && existingUser.status !== "pending") {
      throw new Error("User already exists.");
    }

    if (existingUser) {
      await updateUser(existingUser.id, { name, password });
    } else {
      const u = await createUser({
        accountType: isRealtor ? "realtor" : "user",
        email,
        name,
        password,
        status: "active",
      });

      if (strata) {
        await createStrataMembership({
          strataId: strata.id,
          userId: u.id,
          role: "pending",
        });
      }
    }
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : `${e}`,
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

  const [membership] = await listStrataMemberships({
    userId: resetToken.userId,
  });

  if (!membership) {
    throw new Error("");
  }

  const strata = await getStrataById(membership.strataId);

  if (!strata) {
    throw new Error("");
  }

  redirect(
    (process.env.NODE_ENV === "development" ? "http://" : "https://") +
      strata.domain,
  );
}
