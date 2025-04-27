"use client";

import * as styles from "./style.css";

import React, { useCallback, useTransition } from "react";

import {
  imperativeUpdateAgendaItemAction,
  removeItemFromAgendaAction,
} from "../../app/@app/dashboard/meetings/[meetingId]/actions";
import { type MeetingAgendaItem } from "../../data/meetings/listMeetingAgendaItems";
import { classnames } from "../../utils/classnames";
import { EditMeetingAgendaItemButton } from "../EditMeetingAgendaItemButton";
import { FileAttachmentChip } from "../FileAttachmentChip";
import { Group } from "../Group";
import { Header } from "../Header";
import { InboxMessageQuote } from "../InboxMessageQuote";
import { InvoiceChip } from "../InvoiceChip";
import { Panel } from "../Panel";
import { RemoveButton } from "../RemoveButton";
import { Stack } from "../Stack";
import { TextArea } from "../TextArea";
import { MeetingAgendaItemCheckbox } from "./Checkbox";

interface Props {
  agendaItem: MeetingAgendaItem;
  className?: string;
  meetingId: string;
}

export function MeetingAgendaItem({ agendaItem, meetingId }: Props) {
  const [pending, startTransition] = useTransition();

  const onBlur = useCallback(
    (e: React.FocusEvent<HTMLTextAreaElement>) =>
      startTransition(async () =>
        imperativeUpdateAgendaItemAction(meetingId, agendaItem.id, {
          minutes: e.currentTarget.value,
        }),
      ),
    [meetingId, agendaItem.id],
  );

  return (
    <Panel
      className={classnames(
        agendaItem.done === 1 ? styles.agendaItemDone : styles.agendaItem,
      )}
    >
      <Stack>
        <Group justify="space-between">
          <Group>
            <MeetingAgendaItemCheckbox
              done={agendaItem.done}
              itemId={agendaItem.id}
              meetingId={meetingId}
            />

            <Header className={styles.headerHeader} as="h4">
              {agendaItem.title}
            </Header>
          </Group>

          {agendaItem.done !== 1 && (
            <Group gap="small">
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
            </Group>
          )}
        </Group>

        {agendaItem.description && (
          <p className={styles.agendaItemDescription}>
            {agendaItem.description}
          </p>
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

        {agendaItem.invoice && (
          <InvoiceChip invoice={agendaItem.invoice} showMarkPaid={false} />
        )}

        <TextArea
          defaultValue={agendaItem.minutes || ""}
          disabled={pending || agendaItem.done === 1}
          onBlur={onBlur}
          placeholder="Minutes"
        />
      </Stack>
    </Panel>
  );
}
