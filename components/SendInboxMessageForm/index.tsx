"use client";

import React, { useCallback, useState } from "react";

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
  const [formKey, setFormKey] = useState(0);

  const resetForm = useCallback(() => setFormKey((k) => k + 1), []);

  return (
    <form
      key={formKey}
      action={async (fd) => {
        await createInboxMessageAction(threadId, fd);
        resetForm();
      }}
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
