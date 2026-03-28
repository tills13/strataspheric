"use server";

import { revalidatePath } from "next/cache";

import { withAdminAuth } from "../../../../../auth/admin";
import { updateUser } from "../../../../../data/users/updateUser";
import * as formdata from "../../../../../utils/formdata";

export const updateUserAction = withAdminAuth(
  async (_session, userId: string, fd: FormData) => {
    await updateUser(userId, {
      name: formdata.getString(fd, "name"),
      status:
        formdata.getEnum(fd, "status", [
          "pending",
          "active",
          "suspended",
        ] as const) ?? "active",
      accountType:
        formdata.getEnum(fd, "accountType", ["user", "realtor"] as const) ??
        "user",
      isAdmin: fd.get("isAdmin") ? 1 : 0,
    });

    revalidatePath(`/admin/users/${userId}`);
    revalidatePath("/admin/users");
  },
);
