import { notFound } from "next/navigation";

import { Button } from "../../../../../components/Button";
import { Checkbox } from "../../../../../components/Checkbox";
import { Group } from "../../../../../components/Group";
import { Header } from "../../../../../components/Header";
import { InfoPanel } from "../../../../../components/InfoPanel";
import { Input } from "../../../../../components/Input";
import { InternalLink } from "../../../../../components/Link/InternalLink";
import { Select } from "../../../../../components/Select";
import { Stack } from "../../../../../components/Stack";
import { StatusButton } from "../../../../../components/StatusButton";
import { Text } from "../../../../../components/Text";
import { getFullUserById } from "../../../../../data/users/getUser";
import { updateUserAction } from "./actions";

interface Props {
  params: Promise<{ userId: string }>;
}

export default async function AdminUserEditPage({ params }: Props) {
  const { userId } = await params;
  const user = await getFullUserById(userId);

  if (!user) {
    notFound();
  }

  const updateUserWithId = updateUserAction.bind(null, user.id);

  return (
    <Stack p="normal" gap="normal">
      <Text as="h1" fontSize="large" fw="bold">
        Edit User: {user.name}
      </Text>

      <form action={updateUserWithId}>
        <Stack gap="normal">
          <Input name="name" placeholder="Name" defaultValue={user.name} />
          <Input placeholder="Email" defaultValue={user.email} disabled />
          <Select name="status" label="Status" defaultValue={user.status}>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
          </Select>
          <Select
            name="accountType"
            label="Account Type"
            defaultValue={user.accountType}
          >
            <option value="user">User</option>
            <option value="realtor">Realtor</option>
          </Select>
          <Group gap="normal" align="center">
            <Checkbox name="isAdmin" defaultChecked={user.isAdmin === 1} />
            <Text as="label">Admin</Text>
          </Group>
          <Group justify="end">
            <StatusButton type="submit">Save</StatusButton>
          </Group>
        </Stack>
      </form>

      {user.isAdmin !== 1 && (
        <InfoPanel
          level="warning"
          header={<Header as="h3">Assume {user.name}</Header>}
        >
          <Stack gap="normal">
            <Text as="span" fontSize="small">
              Temporarily sign in as this user. You will see the app as they see
              it.
            </Text>
            <InternalLink href={`/api/admin/assume/${user.id}`}>
              <Button color="warning">Assume</Button>
            </InternalLink>
          </Stack>
        </InfoPanel>
      )}
    </Stack>
  );
}
