import { SendIcon } from "../Icon/SendIcon";
import { Stack } from "../Stack";
import { StatusButton } from "../StatusButton";

interface Props {
  className?: string;

  sendInboxMessage: (fd: FormData) => void;
}

export function SendInboxMessageForm({
  className,
  children,
  sendInboxMessage,
}: React.PropsWithChildren<Props>) {
  return (
    <form action={sendInboxMessage} className={className}>
      <Stack>
        {children}

        <StatusButton color="primary" iconRight={<SendIcon />} type="submit">
          Send Message
        </StatusButton>
      </Stack>
    </form>
  );
}
