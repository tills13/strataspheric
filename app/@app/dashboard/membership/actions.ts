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
  isRoleHigherThan,
  rolePermissionsEqualCustomPermissions,
  roles,
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
    const role = formdata.getEnum(fd, "role", roles);
    const password = formdata.getString(fd, "password");
    const rawPermissions = formdata.getObject(fd, "permission");

    // Get current user's membership to check their role
    const currentUserMembership = await getStrataMembership(
      strata.id,
      session.user.id,
    );
    if (!currentUserMembership) {
      throw new Error("Current user is not a member of this strata");
    }

    const currentUserRole = currentUserMembership.role;

    // Validate: Cannot assign a role higher than your own
    if (role && isRoleHigherThan(role, currentUserRole)) {
      throw new Error("Cannot assign a role higher than your own");
    }

    if (userId) {
      const membership = await getStrataMembership(strata.id, userId);

      if (!membership) {
        throw new Error("Membership not found");
      }

      // Validate: Cannot change the role of someone with a higher role
      if (isRoleHigherThan(membership.role, currentUserRole)) {
        throw new Error("Cannot modify a member with a higher role than yours");
      }

      // Validate: Administrator cannot change their own role
      if (
        session.user.id === userId &&
        currentUserRole === "administrator" &&
        role &&
        role !== "administrator"
      ) {
        throw new Error("Administrators cannot change their own role");
      }

      const parsedPermissions = Object.entries(rawPermissions)
        .filter(
          ([, permissionCheckboxValue]) => permissionCheckboxValue === "on",
        )
        .filter((entry): entry is [Permission, "on"] =>
          allPermissions.includes(entry[0] as Permission),
        )
        .map(([permissionName]) => permissionName);

      // Reset permissions to role defaults if the role is changing
      const roleChanged = role && role !== membership.role;
      const permissions = roleChanged
        ? null
        : rolePermissionsEqualCustomPermissions(membership.role, parsedPermissions)
          ? rawPermissions
            ? // undefined -> don't update, null -> clear
              null
            : undefined
          : parsedPermissions;

      // Only admins editing someone else can set monthly fee
      const isEditingSelf = session.user.id === userId;
      const monthlyFeeStr = formdata.getString(fd, "monthly_fee");
      const monthlyFee =
        !isEditingSelf && monthlyFeeStr !== ""
          ? parseInt(monthlyFeeStr, 10)
          : undefined;

      await updateStrataMembership(strata.id, userId, {
        unit,
        phoneNumber,
        ...(role && { role }),
        ...(permissions !== undefined && {
          rawPermissions:
            permissions === null ? null : JSON.stringify(permissions),
        }),
        ...(monthlyFee !== undefined && { monthlyFee }),
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

        if (!newUser) {
          throw new Error("Failed to create user");
        }

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
