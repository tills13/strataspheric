import React from "react";

import { createInboxMessageAction } from "../../app/@app/dashboard/inbox/actions";
import { SendIcon } from "../Icon/SendIcon";
import { Stack } from "../Stack";
import { StatusButton } from "../StatusButton";

interface Props {
  className?: string;
  threadId?: string;
}

export function SendInboxMessageForm({
  className,
  threadId,
  children,
}: React.PropsWithChildren<Props>) {
  return (
    <form
      action={createInboxMessageAction.bind(undefined, threadId)}
      className={className}
    >
      <Stack>
        {children}

        <StatusButton color="primary" icon={<SendIcon />} type="submit">
          Send Message
        </StatusButton>
      </Stack>
    </form>
  );
}
