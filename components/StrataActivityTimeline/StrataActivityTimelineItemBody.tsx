import { Invoice } from "../../data";
import { StrataActivity } from "../../data/meetings/listStrataActivity";
import { FileAttachmentChip } from "../FileAttachmentChip";
import { InboxMessageQuote } from "../InboxMessageQuote";
import { InvoiceChip } from "../InvoiceChip";

interface Props {
  activity: StrataActivity;
}

export function StrataActivityTimelineItemBody({ activity }: Props) {
  if (activity.type === "file") {
    return (
      <FileAttachmentChip
        fileName={activity.fileName}
        filePath={activity.filePath}
      />
    );
  } else if (activity.type === "invoice") {
    return (
      <InvoiceChip
        invoice={{
          id: activity.invoiceId,
          amount: activity.invoiceAmount,
          description: activity.invoiceDescription,
          identifier: activity.invoiceIdentifier,
          isPaid: activity.invoiceIsPaid,
          status: activity.invoiceStatus as Invoice["status"],
        }}
      />
    );
  } else if (activity.type === "inbox_message") {
    return (
      <InboxMessageQuote
        source={{
          id: activity.messageId,
          message: activity.messageMessage,
          senderName: activity.sourceUserName || "Someone",
          sentAt: activity.date,
          threadId: activity.messageThreadId,
        }}
        linkType="direct"
      />
    );
  } else if (activity.type === "chat") {
    return (
      <InboxMessageQuote
        source={{
          id: activity.chatId,
          message: activity.chatMessage,
          senderName: activity.sourceUserName || "Someone",
          sentAt: activity.date,
          threadId: activity.chatThreadId!,
        }}
        linkType="direct"
      />
    );
  }

  throw new Error("unhandled activity type: " + activity.type);
}
