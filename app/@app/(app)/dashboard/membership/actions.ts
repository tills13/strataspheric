"use server";

import { revalidatePath } from "next/cache";

import { auth } from "../../../../../auth";
import { StrataMembershipUpdate } from "../../../../../data";
import { createStrataMembership } from "../../../../../data/strataMemberships/createStrataMembership";
import { deleteStrataMember } from "../../../../../data/strataMemberships/deleteStrataMember";
import { updateStrataMembership } from "../../../../../data/strataMemberships/updateStrataMembership";
import { getStrataById } from "../../../../../data/stratas/getStrataById";
import { createUserPasswordResetToken } from "../../../../../data/userPasswordResetTokens/createUserPasswordResetToken";
import { createUser } from "../../../../../data/users/createUser";
import { getUser } from "../../../../../data/users/getUser";
import { Role } from "../../../../../data/users/permissions";
import * as formdata from "../../../../../utils/formdata";
import { sendEmail } from "../../../../../utils/sendEmail";

export async function deleteStrataMemberAction(
  strataId: string,
  memberId: string,
) {
  await deleteStrataMember(strataId, memberId);
  revalidatePath("/dashboard/membership");
}

const domain =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://strataspheric.app";

export async function addStrataMemberAction(strataId: string, fd: FormData) {
  const session = await auth();

  if (!session || !session.user) {
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

  let userId: string;
  const existingUser = await getUser(email);

  if (existingUser) {
    userId = existingUser.id;
  } else {
    const newUser = await createUser({ email, password });
    userId = newUser.id;

    const strata = await getStrataById(strataId);

    if (!strata) {
      throw new Error("wow");
    }

    const token = await createUserPasswordResetToken({ userId });

    await sendEmail(
      email,
      "Welcome to Strataspheric",
      `
      <h1>Welcome to Strataspheric</h1>
      
      <p>${session.user.name} has invited you to join <b>${strata.name}</b> on Strataspheric.</p>
    
      <p>To finish setting up your account, <a href="${domain}/join?token=${token.token}">click here</a>.</p>
    `,
    );
  }

  await createStrataMembership({
    strataId,
    userId,
    email,
    name,
    phoneNumber,
    unit,
    role: role as Role,
  });

  revalidatePath("/dashboard/membership");
}

export async function updateStrataMemberAction(
  strataId: string,
  userId: string,
  fd: FormData,
) {
  const email = formdata.getString(fd, "email");
  const name = formdata.getString(fd, "name");
  const phoneNumber = formdata.getString(fd, "phone_number");
  const unit = formdata.getString(fd, "unit");
  const role = formdata.getString(fd, "role");

  let update: StrataMembershipUpdate = {};

  if (email !== "") {
    update.email = email;
  }

  if (name !== "") {
    update.name = name;
  }

  if (phoneNumber !== "") {
    update.phoneNumber = phoneNumber;
  }

  if (unit !== "") {
    update.unit = unit;
  }

  if (role !== "") {
    update.role = role as Role;
  }

  if (Object.keys(update).length === 0) {
    return;
  }

  await updateStrataMembership(strataId, userId, update);

  revalidatePath("/dashboard/membership");
}

export async function approveStrataMembershipAction(
  strataId: string,
  userId: string,
) {
  await updateStrataMembership(strataId, userId, { role: "owner" });
  revalidatePath("/dashboard/membership");
}
