"use server";

import { revalidatePath } from "next/cache";

import { protocol, tld } from "../../../../constants";
import { createStrataMembership } from "../../../../data/memberships/createStrataMembership";
import { deleteStrataMembership } from "../../../../data/memberships/deleteStrataMembership";
import { getStrataMembership } from "../../../../data/memberships/getStrataMembership";
import { updateStrataMembership } from "../../../../data/memberships/updateStrataMembership";
import { mustGetCurrentStrata } from "../../../../data/stratas/getStrataByDomain";
import { createUserPasswordResetToken } from "../../../../data/userPasswordResetTokens/createUserPasswordResetToken";
import { createUser } from "../../../../data/users/createUser";
import { getUserByEmail } from "../../../../data/users/getUser";
import {
  Permission,
  Role,
  allPermissions,
  rolePermissionsEqualCustomPermissions,
} from "../../../../data/users/permissions";
import { withPermissions } from "../../../../utils/actions";
import * as formdata from "../../../../utils/formdata";
import { sendEmail } from "../../../../utils/sendEmail";

export const deleteStrataMembershipAction = withPermissions(
  ["stratas.memberships.delete"],
  async (_, userId: string) => {
    const strata = await mustGetCurrentStrata();
    await deleteStrataMembership(strata.id, userId);

    revalidatePath("/dashboard/membership");
  },
);

export const upsertStrataMembershipAction = withPermissions(
  ["stratas.memberships.edit", "stratas.memberships.create"],
  async (session, userId: string | undefined, fd: FormData) => {
    const strata = await mustGetCurrentStrata();

    const email = formdata.getString(fd, "email");
    const name = formdata.getString(fd, "name");
    const phoneNumber = formdata.getString(fd, "phone_number");
    const unit = formdata.getString(fd, "unit");
    const role = formdata.getString(fd, "role");
    const password = formdata.getString(fd, "password");
    const rawPermissions = formdata.getObject(fd, "permission");

    if (userId) {
      const membership = await getStrataMembership(strata.id, userId);

      const parsedPermissions = Object.entries(rawPermissions)
        .filter(
          ([, permissionCheckboxValue]) => permissionCheckboxValue === "on",
        )
        .filter((entry): entry is [Permission, "on"] =>
          allPermissions.includes(entry[0] as Permission),
        )
        .map(([permissionName]) => permissionName);

      const permissions = rolePermissionsEqualCustomPermissions(
        membership.role,
        parsedPermissions,
      )
        ? rawPermissions
          ? // undefined -> don't update, null -> clear
            null
          : undefined
        : parsedPermissions;

      await updateStrataMembership(strata.id, userId, {
        unit,
        role: role as Role,
        phoneNumber,
        ...(permissions !== undefined && {
          rawPermissions:
            permissions === null ? null : JSON.stringify(permissions),
        }),
      });
    } else {
      const existingUser = await getUserByEmail(email);

      if (existingUser) {
        userId = existingUser.id;
      } else {
        const newUser = await createUser({
          email,
          name,
          password,
          status: "pending",
        });

        userId = newUser.id;

        const token = await createUserPasswordResetToken({ userId });

        await sendEmail(
          email,
          "Welcome to Strataspheric",
          `
          <h1>Welcome to Strataspheric</h1>
          
          <p>${session.user.name} has invited you to join <b>${strata.name}</b> on Strataspheric.</p>
        
          <p>To finish setting up your account, <a href="${protocol}//${tld}/join?token=${token.token}">click here</a>.</p>
        `,
        );
      }

      await createStrataMembership({
        strataId: strata.id,
        userId,
        phoneNumber,
        unit,
        role: role as Role,
      });
    }

    revalidatePath("/dashboard/membership");
  },
);

export const approveStrataMembershipAction = withPermissions(
  ["stratas.memberships.edit", "stratas.memberships.create"],
  async (_, userId: string) => {
    const strata = await mustGetCurrentStrata();
    await updateStrataMembership(strata.id, userId, { role: "owner" });

    revalidatePath("/dashboard/membership");
  },
);
