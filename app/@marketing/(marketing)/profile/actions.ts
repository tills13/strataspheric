"use server";

import { auth } from "../../../../auth";
import { updateStrataMembership } from "../../../../data/memberships/updateStrataMembership";
import { updateUser } from "../../../../data/users/updateUser";
import * as formdata from "../../../../utils/formdata";

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

  const entries = Array.from(fd.entries());
  for (const [key] of entries) {
    if (key.startsWith("membership_")) {
      const strataId = key.replace("membership_", "");
      const isChecked = fd.get(`notifyEvents_${strataId}`) === "on";
      await updateStrataMembership(strataId, u.user.id, {
        notifyEvents: isChecked ? 1 : 0,
      });
    }
  }

  return {
    success: true,
  };
}
