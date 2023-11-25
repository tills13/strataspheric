"use server";

import { redirect } from "next/navigation";

import { createStrataMembership } from "../data/strataMemberships/createStrataMembership";
import { createUser } from "../data/users/createUser";

export async function requestToJoinStrataAction(formData: FormData) {
  const strataId = formData.get("strata_id");
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  if (
    typeof strataId !== "string" ||
    strataId === "" ||
    typeof name !== "string" ||
    name === "" ||
    typeof email !== "string" ||
    email === "" ||
    typeof password !== "string" ||
    password === ""
  ) {
    throw new Error("invalid fields");
  }

  const { id: userId } = await createUser({ email, password });

  if (!userId) {
    throw new Error("failed");
  }

  await createStrataMembership({
    strataId,
    userId,
    name,
    email,
    role: "pending",
  });

  redirect("/?action=signin");
}
