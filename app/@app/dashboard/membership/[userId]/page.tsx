import { redirect } from "next/navigation";

import { auth } from "../../../../../auth";
import { Badge } from "../../../../../components/Badge";
import { Button } from "../../../../../components/Button";
import { CreateOrUpdateStrataMembershipForm } from "../../../../../components/CreateOrUpdateStrataMembershipForm";
import { UserPermissionsFields } from "../../../../../components/CreateOrUpdateStrataMembershipForm/UserPermissionsFields";
import { DashboardLayout } from "../../../../../components/DashboardLayout";
import { Details } from "../../../../../components/Details";
import { DetailsRow } from "../../../../../components/Details/DetailsRow";
import { Group } from "../../../../../components/Group";
import { EmailIcon } from "../../../../../components/Icon/EmailIcon";
import { PhoneIcon } from "../../../../../components/Icon/PhoneIcon";
import { Input } from "../../../../../components/Input";
import { ExternalLink } from "../../../../../components/Link/ExternalLink";
import { StrataRoleSelect } from "../../../../../components/StrataRoleSelect";
import { Text } from "../../../../../components/Text";
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

  const strataRoleSelectDisabled =
    isTargetHigherRole ||
    (isEditingSelf && currentUserRole === "administrator");

  const availableRoles = getAssignableRoles(currentUserRole);

  const canEdit = canEditInformation || canEditPermissions;

  const content = (
    <>
      <Details>
        <DetailsRow
          title="Name"
          description={
            canEditInformation ? (
              <Input
                name="name"
                type="text"
                defaultValue={membership.name}
                disabled={!!membership}
                required
              />
            ) : (
              <Text>{membership.name}</Text>
            )
          }
        />
        <DetailsRow
          title="Unit"
          description={
            canEditInformation ? (
              <Input
                name="unit"
                type="text"
                defaultValue={membership.unit || undefined}
                required
              />
            ) : (
              <Text>{membership.unit ?? <Badge>No Unit</Badge>}</Text>
            )
          }
        />
        <DetailsRow
          title="Email"
          description={
            canEditInformation ? (
              <Input
                name="email"
                type="email"
                defaultValue={membership.email}
                disabled={!!membership}
                required
              />
            ) : (
              <Text>{membership.email}</Text>
            )
          }
        />
        <DetailsRow
          title="Phone"
          description={
            canEditInformation ? (
              <Input
                name="phone_number"
                type="text"
                defaultValue={membership.phoneNumber || undefined}
              />
            ) : membership.phoneNumber ? (
              <Text>{membership.phoneNumber}</Text>
            ) : null
          }
        />
        <DetailsRow
          title="Role"
          description={
            canEditInformation ? (
              <StrataRoleSelect
                key={membership.role}
                name="role"
                defaultValue={membership.role || "owner"}
                disabled={strataRoleSelectDisabled}
                availableRoles={availableRoles}
                required
              />
            ) : (
              <Text>{roleLabels[membership.role]}</Text>
            )
          }
        />
        {canEditMonthlyFee && (
          <DetailsRow
            title="Monthly Fee"
            description={
              <Input
                name="monthly_fee"
                type="number"
                defaultValue={membership.monthlyFee ?? undefined}
                min={0}
              />
            }
          />
        )}
        {!canEditMonthlyFee &&
          canEditInformation &&
          membership.monthlyFee != null && (
            <DetailsRow
              title="Monthly Fee"
              description={<Text>${membership.monthlyFee}</Text>}
            />
          )}
      </Details>

      <Group equalWidthChildren>
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
        {membership.phoneNumber && (
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
        )}
      </Group>

      {canEditPermissions && (
        <UserPermissionsFields membership={membership} />
      )}
    </>
  );

  return (
    <DashboardLayout title={membership.name}>
      {canEdit ? (
        <CreateOrUpdateStrataMembershipForm membership={membership}>
          {content}
        </CreateOrUpdateStrataMembershipForm>
      ) : (
        content
      )}
    </DashboardLayout>
  );
}
