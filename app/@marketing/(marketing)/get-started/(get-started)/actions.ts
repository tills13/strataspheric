"use server";

import { redirect } from "next/navigation";
import { createMember } from "../../../../../data/members/createMember";
import { createStrataMember } from "../../../../../data/members/createStrataMember";
import { createPlan } from "../../../../../data/plans/createPlan";
import { createStrata } from "../../../../../data/stratas/createStrata";
import { updateStrata } from "../../../../../data/stratas/updateStrata";
import { createWidget } from "../../../../../data/widgets/createWidget";
import { addCustomDomain } from "../../../../../cloudflare/pages/addCustomDomain";
import { createRecord } from "../../../../../cloudflare/dns/createRecord";
import { CF_PAGES_PROJECT_ID } from "../../../../../cloudflare/constants";

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
  const strataDomain = fd.get("strata_domain");
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

  const numSeats = fd.get("num_seats");

  if (typeof numSeats !== "string" || numSeats === "") {
    throw new Error("missing or invalid fields");
  }

  // ----

  const memberId = await createMember(email, password);

  if (!memberId) {
    throw new Error("failed to create member");
  }

  const strataId = await createStrata(strataName, strataDomain, isPublic);

  if (!strataId) {
    throw new Error("failed to create strata");
  }

  await updateStrata(strataId, { numUnits: parseInt(numUnits, 10) });
  await createStrataMember(strataId, memberId, {
    email,
    name,
    role: "administrator",
    isPaid: true,
  });

  await createWidget(strataId, "Minutes", "file");
  await createWidget(strataId, "Documents", "file");
  await createWidget(strataId, "Events", "event");

  await createPlan(strataId, parseInt(numSeats, 10));

  const [createDnsRecordResponse] = await createRecord(
    "CNAME",
    strataDomain,
    CF_PAGES_PROJECT_ID + ".pages.dev"
  );

  console.log(createDnsRecordResponse);

  if (!createDnsRecordResponse.success) {
    throw new Error("unable to create DNS record");
  }

  const [rJson] = await addCustomDomain(strataDomain);

  console.log(rJson);

  if (!rJson.success) {
    throw new Error("unable to create custom domain");
  }

  redirect("/get-started/" + strataDomain);
}
