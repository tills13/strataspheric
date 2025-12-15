import { s } from "../../../../../sprinkles.css";

import { redirect } from "next/navigation";

import { auth } from "../../../../../auth";
import { CreateOrUpdateStrataMembershipForm } from "../../../../../components/CreateOrUpdateStrataMembershipForm";
import { CreateOrUpdateStrataMembershipFormFields } from "../../../../../components/CreateOrUpdateStrataMembershipForm/CreateOrUpdateStrataMembershipFormFields";
import { UserPermissionsFields } from "../../../../../components/CreateOrUpdateStrataMembershipForm/UserPermissionsFields";
import { DashboardLayout } from "../../../../../components/DashboardLayout";
import { getStrataMembership } from "../../../../../data/memberships/getStrataMembership";
import { mustGetCurrentStrata } from "../../../../../data/stratas/getStrataByDomain";
import {
  can,
  getAssignableRoles,
  isRoleHigherThan,
} from "../../../../../data/users/permissions";

export default async function Page({
  params,
}: PageProps<"/dashboard/membership/[userId]">) {
  const [session, { userId }, strata] = await Promise.all([
    auth(),
    params,
    mustGetCurrentStrata(),
  ]);

  const [membership, currentUserMembership] = await Promise.all([
    getStrataMembership(strata.id, userId),
    session?.user.id
      ? getStrataMembership(strata.id, session.user.id)
      : undefined,
  ]);

  if (!can(session?.user, "stratas.memberships.edit")) {
    redirect("/membership");
  }

  const currentUserRole = currentUserMembership?.role ?? "owner";
  const isEditingSelf = session?.user.id === userId;
  const isTargetHigherRole = isRoleHigherThan(membership.role, currentUserRole);

  // Disable role select if:
  // 1. Target member has higher role than current user
  // 2. Admin is editing themselves (cannot demote self)
  const strataRoleSelectDisabled =
    isTargetHigherRole || (isEditingSelf && currentUserRole === "administrator");

  // Only show roles at or below current user's level
  const availableRoles = getAssignableRoles(currentUserRole);

  return (
    <DashboardLayout>
      <CreateOrUpdateStrataMembershipForm
        className={s({ p: "normal" })}
        membership={membership}
      >
        <CreateOrUpdateStrataMembershipFormFields
          membership={membership}
          strataRoleSelectDisabled={strataRoleSelectDisabled}
          availableRoles={availableRoles}
        />
        <UserPermissionsFields membership={membership} />
      </CreateOrUpdateStrataMembershipForm>
    </DashboardLayout>
  );
}
