import { Badge } from "../../../../components/Badge";
import { Group } from "../../../../components/Group";
import { RemoveIcon } from "../../../../components/Icon/RemoveIcon";
import { StatusButton } from "../../../../components/StatusButton";
import { TableRow } from "../../../../components/Table/TableRow";
import { Text } from "../../../../components/Text";
import { StrataMembership } from "../../../../data/memberships/getStrataMembership";
import { deleteStrataMembershipAction } from "./actions";

interface Props {
  membership: StrataMembership;
}

export function MembershipTableRow({ membership }: Props) {
  return (
    <TableRow
      actions={
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
      }
      content={
        <Group flex={1}>
          {membership.unit && <Badge>Unit {membership.unit}</Badge>}
          <Text fw="bold" whiteSpace="nowrap" color="primary">
            {membership.name}
          </Text>
          <Text color="secondary">{membership.role}</Text>
        </Group>
      }
      rowId={membership.id}
      link={`/dashboard/membership/${membership.id}`}
    />
  );
}
