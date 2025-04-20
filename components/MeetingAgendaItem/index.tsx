import * as styles from "./style.css";

import React from "react";

import { removeItemFromAgendaAction } from "../../app/@app/dashboard/meetings/[meetingId]/actions";
import { type MeetingAgendaItem as IMeetingAgendaItem } from "../../data/meetings/listMeetingAgendaItems";
import { classnames } from "../../utils/classnames";
import { EditMeetingAgendaItemButton } from "../EditMeetingAgendaItemButton";
import { FileAttachmentChip } from "../FileAttachmentChip";
import { Header } from "../Header";
import { InboxMessageQuote } from "../InboxMessageQuote";
import { InvoiceChip } from "../InvoiceChip";
import { RemoveButton } from "../RemoveButton";
import { MeetingAgendaItemCheckbox } from "./Checkbox";

interface Props {
  agendaItem: IMeetingAgendaItem;
  className?: string;
  meetingId: string;
}

export function MeetingAgendaItem({ agendaItem, meetingId }: Props) {
  return (
    <div
      className={classnames(
        agendaItem.done === 1 ? styles.agendaItemDone : styles.agendaItem,
      )}
    >
      <div className={styles.header}>
        <MeetingAgendaItemCheckbox
          done={agendaItem.done}
          itemId={agendaItem.id}
          meetingId={meetingId}
        />

        <Header className={styles.headerHeader} as="h4">
          {agendaItem.title}
        </Header>

        <div className={styles.agendaItemActions}>
          <EditMeetingAgendaItemButton
            agendaItem={agendaItem}
            meetingId={meetingId}
            size="small"
            style="tertiary"
          />
          <RemoveButton
            action={removeItemFromAgendaAction.bind(
              undefined,
              meetingId,
              agendaItem.id,
            )}
            color="error"
            size="small"
            style="tertiary"
          />
        </div>
      </div>

      {agendaItem.description && (
        <p className={styles.agendaItemDescription}>{agendaItem.description}</p>
      )}

      {agendaItem.message && (
        <InboxMessageQuote source={agendaItem.message} linkType="direct" />
      )}

      {agendaItem.chat && (
        <InboxMessageQuote source={agendaItem.chat} linkType="direct" />
      )}

      {agendaItem.file && (
        <FileAttachmentChip
          fileName={agendaItem.file.name}
          filePath={agendaItem.file.path}
        />
      )}

      {agendaItem.invoice && <InvoiceChip invoice={agendaItem.invoice} />}
    </div>
  );
}
