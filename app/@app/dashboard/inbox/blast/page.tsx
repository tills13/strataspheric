import { mustAuth } from "../../../../../auth";
import { DashboardLayout } from "../../../../../components/DashboardLayout";
import { SendIcon } from "../../../../../components/Icon/SendIcon";
import { SendInboxMessageFields } from "../../../../../components/SendInboxMessageForm/SendInboxMessageFields";
import { Stack } from "../../../../../components/Stack";
import { StatusButton } from "../../../../../components/StatusButton";
import { Text } from "../../../../../components/Text";
import { assertCan } from "../../../../../data/users/permissions";
import { sendInboxBlastAction } from "../actions";

export default async function Page() {
  const session = await mustAuth();
  assertCan(session.user, "stratas.inbox_blasts.create");

  return (
    <DashboardLayout title="Send to All Members" subPageTitle="Send to All">
      <Stack gap="normal">
        <Text color="secondary">
          This message will be sent to every member of your strata via email and
          will appear in the strata inbox.
        </Text>
        <form action={sendInboxBlastAction}>
          <Stack>
            <SendInboxMessageFields showSubjectInput />
            <StatusButton color="primary" icon={<SendIcon />} type="submit">
              Send Blast
            </StatusButton>
          </Stack>
        </form>
      </Stack>
    </DashboardLayout>
  );
}
