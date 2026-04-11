import { auth } from "../../../../auth";
import { Button } from "../../../../components/Button";
import { Group } from "../../../../components/Group";
import { EmailIcon } from "../../../../components/Icon/EmailIcon";
import { PhoneIcon } from "../../../../components/Icon/PhoneIcon";
import { RemoveIcon } from "../../../../components/Icon/RemoveIcon";
import { ExternalLink } from "../../../../components/Link/ExternalLink";
import { StatusButton } from "../../../../components/StatusButton";
import { TableRow } from "../../../../components/Table/TableRow";
import { Text } from "../../../../components/Text";
import { StrataMembership } from "../../../../data/memberships/getStrataMembership";
import { can, roleLabels } from "../../../../data/users/permissions";
import { deleteStrataMembershipAction } from "./actions";

interface Props {
  membership: StrataMembership & { unitNumbers?: string[] };
}

export async function MembershipTableRow({ membership }: Props) {
  const session = await auth();

  const canUpsert = can(session?.user, "stratas.memberships.edit");

  return (
    <TableRow
      actions={
        <Group gap="xs">
          {membership.email && (
            <ExternalLink href={`mailto:${membership.email}`} noUnderline>
              <Button
                icon={<EmailIcon />}
                style="tertiary"
                color="default"
                size="small"
              />
            </ExternalLink>
          )}
          {membership.phoneNumber && (
            <ExternalLink href={`tel:${membership.phoneNumber}`} noUnderline>
              <Button
                icon={<PhoneIcon />}
                style="tertiary"
                color="default"
                size="small"
              />
            </ExternalLink>
          )}
          {canUpsert && membership.role !== "administrator" && (
            <StatusButton
              action={deleteStrataMembershipAction.bind(
                undefined,
                membership.userId,
              )}
              icon={<RemoveIcon />}
              style="tertiary"
              color="error"
              size="small"
            />
          )}
        </Group>
      }
      content={
        <Group flex={1}>
          <Text fw="bold" whiteSpace="nowrap" color="primary">
            {membership.name}
          </Text>
          <Text color="secondary">{roleLabels[membership.role]}</Text>
          {membership.unitNumbers && membership.unitNumbers.length > 0 && (
            <Text color="grey400" fontSize="small">
              Unit {membership.unitNumbers.join(", ")}
            </Text>
          )}
        </Group>
      }
      rowId={membership.userId}
      link={`/dashboard/membership/${membership.userId}`}
    />
  );
}
