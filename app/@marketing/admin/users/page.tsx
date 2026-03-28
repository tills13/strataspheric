import { Badge } from "../../../../components/Badge";
import { Button } from "../../../../components/Button";
import { Group } from "../../../../components/Group";
import { PersonIcon } from "../../../../components/Icon/PersonIcon";
import { ExternalLink } from "../../../../components/Link/ExternalLink";
import { Stack } from "../../../../components/Stack";
import { Table } from "../../../../components/Table";
import { TableRow } from "../../../../components/Table/TableRow";
import { Text } from "../../../../components/Text";
import { listUsers } from "../../../../data/users/listUsers";

export default async function AdminUsersPage() {
  const users = await listUsers();

  return (
    <Stack p="normal" gap="normal">
      <Text as="h1" fontSize="large" fw="bold">
        Users
      </Text>
      <Table>
        {users.map((user) => (
          <TableRow
            key={user.id}
            rowId={user.id}
            link={`/admin/users/${user.id}`}
            actions={
              user.isAdmin !== 1 ? (
                <Group gap="xs">
                  <ExternalLink
                    href={`/api/admin/assume/${user.id}`}
                    noUnderline
                  >
                    <Button
                      icon={<PersonIcon />}
                      style="tertiary"
                      color="default"
                      size="small"
                    />
                  </ExternalLink>
                </Group>
              ) : undefined
            }
            content={
              <Group gap="small" align="center">
                <Stack gap="xs">
                  <Group gap="small" align="center">
                    <Text as="span" fw="bold">
                      {user.name}
                    </Text>
                    {user.isAdmin === 1 && (
                      <Badge level="warning" fontSize="small">
                        Admin
                      </Badge>
                    )}
                  </Group>
                  <Text as="span" fontSize="small" color="secondary">
                    {user.email}
                  </Text>
                </Stack>
              </Group>
            }
            rowEnd={
              <Group gap="small" align="center">
                <Badge
                  level={user.status === "active" ? "success" : "default"}
                  fontSize="small"
                >
                  {user.status}
                </Badge>
              </Group>
            }
          />
        ))}
      </Table>
      {users.length === 0 && (
        <Text color="secondary" ta="center" p="normal">
          No users found.
        </Text>
      )}
    </Stack>
  );
}
