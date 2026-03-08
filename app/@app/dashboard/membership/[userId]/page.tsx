import { s } from "../../../../../sprinkles.css";

import { redirect } from "next/navigation";

import { auth } from "../../../../../auth";
import { Badge } from "../../../../../components/Badge";
import { Button } from "../../../../../components/Button";
import { CreateOrUpdateStrataMembershipForm } from "../../../../../components/CreateOrUpdateStrataMembershipForm";
import { CreateOrUpdateStrataMembershipFormFields } from "../../../../../components/CreateOrUpdateStrataMembershipForm/CreateOrUpdateStrataMembershipFormFields";
import { UserPermissionsFields } from "../../../../../components/CreateOrUpdateStrataMembershipForm/UserPermissionsFields";
import { DashboardLayout } from "../../../../../components/DashboardLayout";
import { Details } from "../../../../../components/Details";
import { DetailsRow } from "../../../../../components/Details/DetailsRow";
import { Group } from "../../../../../components/Group";
import { EmailIcon } from "../../../../../components/Icon/EmailIcon";
import { PhoneIcon } from "../../../../../components/Icon/PhoneIcon";
import { ExternalLink } from "../../../../../components/Link/ExternalLink";
import { getStrataMembership } from "../../../../../data/memberships/getStrataMembership";
import { mustGetCurrentStrata } from "../../../../../data/stratas/getStrataByDomain";
import {
  can,
  getAssignableRoles,
  isRoleHigherThan,
  roleLabels,
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

  const canEditInformation = can(session?.user, "stratas.memberships.edit");
  const canEditPermissions = can(session?.user, "stratas.memberships.*");

  const currentUserRole = currentUserMembership?.role ?? "owner";
  const isEditingSelf = session?.user.id === userId;
  const canEditMonthlyFee = canEditInformation && !isEditingSelf;
  const isTargetHigherRole = isRoleHigherThan(membership.role, currentUserRole);

  // Disable role select if:
  // 1. Target member has higher role than current user
  // 2. Admin is editing themselves (cannot demote self)
  const strataRoleSelectDisabled =
    isTargetHigherRole ||
    (isEditingSelf && currentUserRole === "administrator");

  // Only show roles at or below current user's level
  const availableRoles = getAssignableRoles(currentUserRole);

  return (
    <DashboardLayout title={membership.name}>
      <Details className={s({ p: "normal" })}>
        <DetailsRow
          title="Unit"
          description={membership.unit ?? <Badge>No Unit</Badge>}
        />
        <DetailsRow title="Role" description={roleLabels[membership.role]} />
        {membership.monthlyFee != null && (
          <DetailsRow
            title="Monthly Fee"
            description={`$${membership.monthlyFee}`}
          />
        )}
      </Details>
      <Group ph="normal" equalWidthChildren>
        <ExternalLink href={`mailto:${membership.email}`} noUnderline>
          <Button
            color="primary"
            icon={<EmailIcon />}
            style="secondary"
            iconTextBehaviour="centerRemainder"
            fullWidth
          >
            Email
          </Button>
        </ExternalLink>
        <ExternalLink href={`tel:${membership.phoneNumber}`} noUnderline>
          <Button
            color="primary"
            icon={<PhoneIcon />}
            style="secondary"
            iconTextBehaviour="centerRemainder"
            fullWidth
          >
            Phone
          </Button>
        </ExternalLink>
      </Group>

      {(canEditInformation || canEditPermissions) && (
        <CreateOrUpdateStrataMembershipForm
          className={s({ p: "normal" })}
          membership={membership}
        >
          {canEditInformation && (
            <CreateOrUpdateStrataMembershipFormFields
              membership={membership}
              strataRoleSelectDisabled={strataRoleSelectDisabled}
              availableRoles={availableRoles}
              canEditMonthlyFee={canEditMonthlyFee}
            />
          )}
          {canEditPermissions && (
            <UserPermissionsFields membership={membership} />
          )}
        </CreateOrUpdateStrataMembershipForm>
      )}
    </DashboardLayout>
  );
}
