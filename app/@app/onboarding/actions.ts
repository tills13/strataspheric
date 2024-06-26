"use server";

import { redirect } from "next/navigation";

import * as formdata from "../../../utils/formdata";

export async function completeOnboardingAction(fd: FormData) {
  redirect("/dashboard");
}
