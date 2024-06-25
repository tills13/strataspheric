"use server";

import { revalidatePath } from "next/cache";

import { auth } from "../../auth";
import { createStrataMembership } from "../../data/strataMemberships/createStrataMembership";
import { mustGetCurrentStrata } from "../../data/stratas/getStrataByDomain";

export async function joinStrataAction() {
  const strata = await mustGetCurrentStrata();
  const session = await auth();

  if (!session?.user) {
    return;
  }

  await createStrataMembership({
    role: "pending",
    strataId: strata.id,
    userId: session.user.id,
  });

  revalidatePath("*");
}
