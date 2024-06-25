"use server";

import { revalidatePath } from "next/cache";

import { auth } from "../../../../auth";
import { protocol, tld } from "../../../../constants";
import { createStrataMembership } from "../../../../data/strataMemberships/createStrataMembership";
import { deleteStrataMembership } from "../../../../data/strataMemberships/deleteStrataMembership";
import { updateStrataMembership } from "../../../../data/strataMemberships/updateStrataMembership";
import { mustGetCurrentStrata } from "../../../../data/stratas/getStrataByDomain";
import { createUserPasswordResetToken } from "../../../../data/userPasswordResetTokens/createUserPasswordResetToken";
import { createUser } from "../../../../data/users/createUser";
import { getUser } from "../../../../data/users/getUser";
import { Role, can, p } from "../../../../data/users/permissions";
import * as formdata from "../../../../utils/formdata";
import { sendEmail } from "../../../../utils/sendEmail";

export async function deleteStrataMembershipAction(userId: string) {
  const session = await auth();
  const strata = await mustGetCurrentStrata();

  if (
    !session?.user ||
    !can(session.user, p("stratas", "memberships", "delete"))
  ) {
    throw new Error("not allowed");
  }

  await deleteStrataMembership(strata.id, userId);

  revalidatePath("/dashboard/membership");
}

export async function upsertStrataMembershipAction(
  userId: string | undefined,
  fd: FormData,
) {
  const session = await auth();
  const strata = await mustGetCurrentStrata();

  if (
    !session?.user ||
    !can(
      session.user,
      p("stratas", "memberships", "edit"),
      p("stratas", "memberships", "create"),
    )
  ) {
    throw new Error("not allowed");
  }

  const email = formdata.getString(fd, "email");
  const name = formdata.getString(fd, "name");
  const phoneNumber = formdata.getString(fd, "phone_number");
  const unit = formdata.getString(fd, "unit");
  const role = formdata.getString(fd, "role");
  const password = formdata.getString(fd, "password");

  if (email === "" || name === "" || unit === "" || role === "") {
    throw new Error("invalid fields");
  }

  if (userId) {
    const membershipUpdate = {
      unit,
      role: role as Role,
      phoneNumber,
    };

    if (
      Object.entries(membershipUpdate).filter(([, value]) => !!value).length ===
      0
    ) {
      return;
    }

    await updateStrataMembership(strata.id, userId, membershipUpdate);
  } else {
    const existingUser = await getUser(email);

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
}

export async function approveStrataMembershipAction(userId: string) {
  const session = await auth();
  const strata = await mustGetCurrentStrata();

  if (
    !session?.user ||
    !can(
      session.user,
      p("stratas", "memberships", "edit"),
      p("stratas", "memberships", "create"),
    )
  ) {
    throw new Error("not allowed");
  }

  await updateStrataMembership(strata.id, userId, { role: "owner" });
  revalidatePath("/dashboard/membership");
}
