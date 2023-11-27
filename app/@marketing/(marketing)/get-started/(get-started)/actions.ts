"use server";

import { redirect } from "next/navigation";

import { CF_PAGES_PROJECT_ID } from "../../../../../cloudflare/constants";
import { createRecord } from "../../../../../cloudflare/dns/createRecord";
import { addCustomDomain } from "../../../../../cloudflare/pages/addCustomDomain";
import { createStrataMembership } from "../../../../../data/strataMemberships/createStrataMembership";
import { createPlan } from "../../../../../data/strataPlans/createStrataPlan";
import { createStrata } from "../../../../../data/stratas/createStrata";
import { updateStrata } from "../../../../../data/stratas/updateStrata";
import { createUser } from "../../../../../data/users/createUser";
import { createWidget } from "../../../../../data/widgets/createWidget";

export async function submitGetStarted(fd: FormData) {
  const name = fd.get("name");
  const email = fd.get("email");
  const password = fd.get("password");
  const confirmPassword = fd.get("confirm_password");

  if (
    typeof name !== "string" ||
    name === "" ||
    typeof email !== "string" ||
    email === "" ||
    typeof password !== "string" ||
    password === ""
  ) {
    throw new Error("missing or invalid fields");
  }

  if (password !== confirmPassword) {
    throw new Error("password don't match");
  }

  const strataName = fd.get("strata_name");
  let strataDomain = fd.get("strata_domain");
  const isPublic = fd.get("is_public") === "on";

  const numUnits = fd.get("num_units");

  if (
    typeof strataName !== "string" ||
    strataName === "" ||
    typeof strataDomain !== "string" ||
    strataDomain === "" ||
    typeof numUnits !== "string" ||
    numUnits === ""
  ) {
    throw new Error("missing or invalid fields");
  }

  // ----

  const { id: userId } = await createUser({ email, password });

  if (!userId) {
    throw new Error("failed to create user");
  }

  if (process.env.NODE_ENV === "development") {
    strataDomain = "localhost:3000";
  }

  const { id: strataId } = await createStrata({
    domain: strataDomain,
    name: strataName,
    numUnits: parseInt(numUnits, 10),
    isPublic: isPublic ? 1 : 0,
  });

  if (!strataId) {
    throw new Error("failed to create strata");
  }

  await createStrataMembership({
    strataId,
    userId,
    email,
    name,
    role: "administrator",
  });

  await createWidget({ strataId, title: "Minutes", type: "file" });
  await createWidget({ strataId, title: "Documents", type: "file" });
  await createWidget({ strataId, title: "Events", type: "event" });

  await createPlan({
    enableInbox: 1,
    strataId,
  });

  if (process.env.NODE_ENV !== "development") {
    const [createDnsRecordResponse] = await createRecord(
      "CNAME",
      strataDomain,
      CF_PAGES_PROJECT_ID + ".pages.dev",
    );

    if (!createDnsRecordResponse.success) {
      throw new Error("unable to create DNS record");
    }

    const [rJson] = await addCustomDomain(strataDomain);

    if (!rJson.success) {
      throw new Error("unable to create custom domain");
    }
  }

  redirect("/get-started/" + strataDomain);
}
