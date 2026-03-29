import { Badge } from "../../../../components/Badge";
import { Button } from "../../../../components/Button";
import { Group } from "../../../../components/Group";
import { RightIcon } from "../../../../components/Icon/RightIcon";
import { ExternalLink } from "../../../../components/Link/ExternalLink";
import { Stack } from "../../../../components/Stack";
import { Table } from "../../../../components/Table";
import { TableRow } from "../../../../components/Table/TableRow";
import { Text } from "../../../../components/Text";
import { protocol } from "../../../../constants";
import { listAdminStratas } from "../../../../data/admin/getAdminStrata";

export default async function AdminStratasPage() {
  const stratas = await listAdminStratas();

  return (
    <Stack p="normal" gap="normal">
      <Text as="h1" fontSize="large" fw="bold">
        Stratas
      </Text>
      <Table>
        {stratas.map((strata) => (
          <TableRow
            key={strata.id}
            rowId={strata.id}
            link={`/admin/stratas/${strata.id}`}
            actions={
              <Group gap="xs">
                <ExternalLink
                  href={`${protocol}//${strata.domain}`}
                  noUnderline
                >
                  <Button
                    icon={<RightIcon />}
                    style="tertiary"
                    color="default"
                    size="small"
                  />
                </ExternalLink>
              </Group>
            }
            content={
              <Group gap="small" align="center">
                <Stack gap="xs">
                  <Text as="span" fw="bold">
                    {strata.name}
                  </Text>
                  <Text as="span" fontSize="small" color="secondary">
                    {strata.domain}
                  </Text>
                </Stack>
              </Group>
            }
            rowEnd={
              <Group gap="small" align="center">
                <Text as="span" fontSize="small" color="secondary">
                  {strata.numUnits} units
                </Text>
                <Badge
                  level={strata.status === "active" ? "success" : "warning"}
                  fontSize="small"
                >
                  {strata.status ?? "unknown"}
                </Badge>
              </Group>
            }
          />
        ))}
      </Table>
      {stratas.length === 0 && (
        <Text color="secondary" ta="center" p="normal">
          No stratas found.
        </Text>
      )}
    </Stack>
  );
}
