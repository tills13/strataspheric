import { notFound } from "next/navigation";

import { Button } from "../../../../../components/Button";
import { Checkbox } from "../../../../../components/Checkbox";
import { Group } from "../../../../../components/Group";
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
        <InfoPanel level="warning">
          <Stack gap="small">
            <Text as="span" fw="bold">
              Assume User
            </Text>
            <Text as="span" fontSize="small">
              Temporarily sign in as this user. You will see the app as they see
              it. A warning bar will appear at the top of the screen while
              assuming.
            </Text>
            <InternalLink href={`/api/admin/assume/${user.id}`}>
              <Button color="warning">Assume {user.name}</Button>
            </InternalLink>
          </Stack>
        </InfoPanel>
      )}
    </Stack>
  );
}
