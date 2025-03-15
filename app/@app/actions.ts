"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { auth } from "../../auth";
import { createStrataMembership } from "../../data/strataMemberships/createStrataMembership";
import { mustGetCurrentStrata } from "../../data/stratas/getStrataByDomain";
import { updateStrata } from "../../data/stratas/updateStrata";
import * as formdata from "../../utils/formdata";
import { geolocate } from "../../utils/geolocate";

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

export async function updateStrataAction(strataId: string, fd: FormData) {
  const strataPlanId = formdata.getString(fd, "strata_id");
  const streetAddress = formdata.getString(fd, "strata_address_street_address");
  const postalCode = formdata.getString(fd, "strata_address_postal_code");
  const provinceState = formdata.getString(fd, "strata_address_province_state");
  const city = formdata.getString(fd, "strata_address_city");
  const strataName = formdata.getString(fd, "name");
  const isPublic = formdata.getBoolean(fd, "is_public");
  const bylawsFileId = formdata.getString(fd, "bylawsFileId");

  if (strataName === "") {
    throw new Error("invalid fields");
  }

  let latitude: number | undefined = undefined;
  let longitude: number | undefined = undefined;

  if (streetAddress && postalCode && city && provinceState) {
    const compiledAddress = `${streetAddress} ${city}, ${provinceState}, ${postalCode}`;
    const geolocation = await geolocate(compiledAddress);

    if (geolocation) {
      latitude = geolocation.lat;
      longitude = geolocation.long;
    }
  }

  await updateStrata(strataId, {
    name: strataName,
    strataId: strataPlanId,
    streetAddress,
    postalCode,
    city,
    provinceState,
    latitude,
    longitude,
    ...(bylawsFileId && { bylawsFileId }),
    isPublic: isPublic ? 1 : 0,
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/settings");

  console.log(headers().get("referer"));
}
