"use server";

import { revalidatePath } from "next/cache";

import { withAdminAuth } from "../../../../../auth/admin";
import { updateStrataPlan } from "../../../../../data/strataPlans/updateStrataPlan";
import { updateStrata } from "../../../../../data/stratas/updateStrata";
import * as formdata from "../../../../../utils/formdata";

export const updateStrataAction = withAdminAuth(
  async (_session, strataId: string, fd: FormData) => {
    await updateStrata(strataId, {
      name: formdata.getString(fd, "name"),
      domain: formdata.getString(fd, "domain"),
      numUnits: Number(formdata.getString(fd, "numUnits")),
      status: formdata.getString(fd, "status"),
      streetAddress: formdata.getString(fd, "streetAddress") || null,
      city: formdata.getString(fd, "city") || null,
      provinceState: formdata.getString(fd, "provinceState") || null,
      postalCode: formdata.getString(fd, "postalCode") || null,
    });

    revalidatePath(`/admin/stratas/${strataId}`);
    revalidatePath("/admin/stratas");
  },
);

export const updateStrataPlanAction = withAdminAuth(
  async (_session, strataId: string, fd: FormData) => {
    await updateStrataPlan(strataId, {
      enableInbox: fd.get("enableInbox") ? 1 : 0,
      enableInvoices: fd.get("enableInvoices") ? 1 : 0,
      enableAmenities: fd.get("enableAmenities") ? 1 : 0,
      enableDirectory: fd.get("enableDirectory") ? 1 : 0,
      enableEmailNotifications: fd.get("enableEmailNotifications") ? 1 : 0,
      enableMeetings: fd.get("enableMeetings") ? 1 : 0,
    });

    revalidatePath(`/admin/stratas/${strataId}`);
  },
);
