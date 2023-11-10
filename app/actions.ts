"use server";

import { redirect } from "next/navigation";
import { createMember } from "../data/members/createMember";
import { createStrataMember } from "../data/members/createStrataMember";

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

  const memberId = await createMember(email, password);

  if (!memberId) {
    throw new Error("failed");
  }

  await createStrataMember(strataId, memberId, {
    name,
    email,
    role: "pending",
  });

  redirect("/?action=signin");
}
