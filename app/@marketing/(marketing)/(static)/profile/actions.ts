"use server";

import "next-auth/react";

import { auth } from "../../../../../auth";
import { updateUser } from "../../../../../data/users/updateUser";
import * as formdata from "../../../../../utils/formdata";

interface UpdateUserActionState {
  success: boolean | undefined;
}

export async function updateUserActionReducer(
  state: UpdateUserActionState,
  fd: FormData,
): Promise<UpdateUserActionState> {
  const u = await auth();

  if (!u) {
    return { success: false };
  }

  const name = formdata.getString(fd, "name");
  const password = formdata.getString(fd, "password");
  const confirmPassword = formdata.getString(fd, "confirmPassword");

  if (password !== confirmPassword) {
    return { success: false };
  }

  await updateUser(u.user.id, { name });

  return {
    success: true,
  };
}
