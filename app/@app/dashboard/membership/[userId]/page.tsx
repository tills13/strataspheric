import { s } from "../../../../../sprinkles.css";

import { PageProps } from "../../../../../.next/types/app/@app/dashboard/membership/[userId]/page";
import { CreateOrUpdateStrataMembershipForm } from "../../../../../components/CreateOrUpdateStrataMembershipForm";
import { CreateOrUpdateStrataMembershipFormFields } from "../../../../../components/CreateOrUpdateStrataMembershipForm/CreateOrUpdateStrataMembershipFormFields";
import { UserPermissionsFields } from "../../../../../components/CreateOrUpdateStrataMembershipForm/UserPermissionsFields";
import { DashboardLayout } from "../../../../../components/DashboardLayout";
import { getStrataMembership } from "../../../../../data/memberships/getStrataMembership";
import { mustGetCurrentStrata } from "../../../../../data/stratas/getStrataByDomain";

export const runtime = "edge";

export default async function Page({ params }: PageProps) {
  const { userId } = await params;
  const strata = mustGetCurrentStrata();

  const membership = await getStrataMembership((await strata).id, userId);

  return (
    <DashboardLayout>
      <CreateOrUpdateStrataMembershipForm
        className={s({ ph: "normal", pb: "normal" })}
        membership={membership}
      >
        <CreateOrUpdateStrataMembershipFormFields membership={membership} />
        <UserPermissionsFields membership={membership} />
      </CreateOrUpdateStrataMembershipForm>
    </DashboardLayout>
  );
}
