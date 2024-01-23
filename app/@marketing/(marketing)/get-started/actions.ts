"use server";

import { redirect } from "next/navigation";

import { auth } from "../../../../auth";
import { CF_PAGES_PROJECT_ID } from "../../../../cloudflare/constants";
import { createRecord } from "../../../../cloudflare/dns/createRecord";
import { addCustomDomain } from "../../../../cloudflare/pages/addCustomDomain";
import { createStrataMembership } from "../../../../data/strataMemberships/createStrataMembership";
import { createPlan } from "../../../../data/strataPlans/createStrataPlan";
import { createStrata } from "../../../../data/stratas/createStrata";
import { updateStrata } from "../../../../data/stratas/updateStrata";
import { createUser } from "../../../../data/users/createUser";
import { createWidget } from "../../../../data/widgets/createWidget";
import * as formdata from "../../../../utils/formdata";

export type SubmitGetStartedState =
  | {
      success: false;
      error: string;
    }
  | never;

export async function submitGetStarted(
  _state: SubmitGetStartedState,
  fd: FormData,
): Promise<SubmitGetStartedState> {
  const session = await auth();

  const name = formdata.getString(fd, "name");
  const email = formdata.getString(fd, "email");
  const password = formdata.getString(fd, "password");
  const confirmPassword = formdata.getString(fd, "confirmPassword");

  if (!session) {
    if (name === "" || email === "" || password === "") {
      return { success: false, error: "missing or invalid fields" };
    }

    if (password !== confirmPassword) {
      return { success: false, error: "passwords do not match" };
    }
  }

  const strataName = formdata.getString(fd, "strata_name");
  const strataDomain = formdata.getString(fd, "strata_domain");
  const isPublic = formdata.getBoolean(fd, "is_public");
  const numUnits = formdata.getInteger(fd, "num_units");

  if (strataName === "" || strataDomain === "" || isNaN(numUnits)) {
    return { success: false, error: "missing or invalid fields" };
  }

  let userId: string;

  if (!session) {
    const newUser = await createUser({
      accountType: "user",
      name,
      email,
      password,
    });

    userId = newUser.id;
  } else {
    userId = session.user.id;
  }

  const { id: strataId } = await createStrata({
    domain: strataDomain,
    domainRecordId: "",
    name: strataName,
    numUnits,
    isPublic: isPublic ? 1 : 0,
  });

  if (!strataId) {
    return {
      success: false,
      error: "failed to create strata",
    };
  }

  await createStrataMembership({
    strataId,
    userId,
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
      return {
        success: false,
        error: "unable to create DNS record",
      };
    }

    await updateStrata(strataId, {
      domainRecordId: createDnsRecordResponse.result.id,
    });

    const [rJson] = await addCustomDomain(strataDomain);

    if (!rJson.success) {
      return {
        success: false,
        error: "unable to create custom domain",
      };
    }
  }

  redirect("/get-started/" + strataDomain);
}
