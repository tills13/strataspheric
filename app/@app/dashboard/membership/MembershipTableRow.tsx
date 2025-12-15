import { auth } from "../../../../auth";
import { Badge } from "../../../../components/Badge";
import { Group } from "../../../../components/Group";
import { RemoveIcon } from "../../../../components/Icon/RemoveIcon";
import { StatusButton } from "../../../../components/StatusButton";
import { TableRow } from "../../../../components/Table/TableRow";
import { Text } from "../../../../components/Text";
import { StrataMembership } from "../../../../data/memberships/getStrataMembership";
import { can, roleLabels } from "../../../../data/users/permissions";
import { deleteStrataMembershipAction } from "./actions";

interface Props {
  membership: StrataMembership;
}

export async function MembershipTableRow({ membership }: Props) {
  const session = await auth();

  const canUpsert = can(session?.user, "stratas.memberships.edit");

  return (
    <TableRow
      actions={
        <>
          {canUpsert && (
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
        </>
      }
      content={
        <Group flex={1}>
          {membership.unit && <Badge>Unit {membership.unit}</Badge>}
          <Text fw="bold" whiteSpace="nowrap" color="primary">
            {membership.name}
          </Text>
          <Text color="secondary">{roleLabels[membership.role]}</Text>
        </Group>
      }
      rowId={membership.id}
      link={canUpsert ? `/dashboard/membership/${membership.id}` : undefined}
    />
  );
}
