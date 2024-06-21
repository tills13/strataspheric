import * as styles from "./style.css";

import React from "react";

import { MeetingAgendaItemUpdate } from "../../data";
import { type MeetingAgendaItem as IMeetingAgendaItem } from "../../data/meetings/getMeetingAgendaItems";
import { classnames } from "../../utils/classnames";
import { EditMeetingAgendaItemButton } from "../EditMeetingAgendaItemButton";
import { FileAttachmentChip } from "../FileAttachmentChip";
import { Header } from "../Header";
import { InboxMessageQuote } from "../InboxMessageQuote";
import { RemoveButton } from "../RemoveButton";
import { MeetingAgendaItemCheckbox } from "./Checkbox";

interface Props {
  className?: string;
  agendaItem: IMeetingAgendaItem;
  imperativeUpdateAgendaItem: (
    agendaItemUpdate: MeetingAgendaItemUpdate,
  ) => void;
  removeAgendaItem: () => void;
  updateAgendaItem: (fd: FormData) => void;
  upsertFile: (fd: FormData) => any;
}

export function MeetingAgendaItem({
  agendaItem,
  imperativeUpdateAgendaItem,
  removeAgendaItem,
  updateAgendaItem,
  upsertFile,
}: Props) {
  return (
    <div
      className={classnames(
        agendaItem.done === 1 ? styles.agendaItemDone : styles.agendaItem,
      )}
    >
      <div className={styles.header}>
        <MeetingAgendaItemCheckbox
          done={agendaItem.done}
          imperativeUpdateAgendaItem={imperativeUpdateAgendaItem}
        />

        <Header className={styles.headerHeader} priority={3}>
          {agendaItem.title}
        </Header>

        <div className={styles.agendaItemActions}>
          <EditMeetingAgendaItemButton
            agendaItem={agendaItem}
            size="small"
            style="tertiary"
            upsertFile={upsertFile}
            updateMeetingAgendaItem={updateAgendaItem}
          />
          <RemoveButton
            action={removeAgendaItem}
            color="error"
            size="small"
            style="tertiary"
          />
        </div>
      </div>

      {agendaItem.description && (
        <p className={styles.agendaItemDescription}>{agendaItem.description}</p>
      )}

      {agendaItem.messageId && (
        <InboxMessageQuote
          message={agendaItem.messageMessage}
          messageId={agendaItem.messageId}
          messageThreadId={agendaItem.messageThreadId}
          senderName={agendaItem.messageSenderName}
          timestamp={agendaItem.messageSentAt}
          linkType="direct"
        />
      )}

      {agendaItem.chatId && (
        <InboxMessageQuote
          message={agendaItem.chatMessage}
          messageId={agendaItem.chatId}
          messageThreadId={agendaItem.chatThreadId}
          senderName={agendaItem.chatSenderName}
          timestamp={agendaItem.chatSentAt}
          linkType="direct"
        />
      )}

      {agendaItem.fileId && agendaItem.filePath && (
        <FileAttachmentChip
          fileName={agendaItem.fileName}
          filePath={agendaItem.filePath}
        />
      )}
    </div>
  );
}
