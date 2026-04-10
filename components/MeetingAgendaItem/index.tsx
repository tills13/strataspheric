"use client";

import * as styles from "./style.css";

import React, { useCallback, useState, useTransition } from "react";

import {
  imperativeUpdateAgendaItemAction,
  removeItemFromAgendaAction,
  reorderAgendaItemAction,
} from "../../app/@app/dashboard/meetings/[meetingId]/actions";
import { type MeetingAgendaItem } from "../../data/meetings/listMeetingAgendaItems";
import { type MeetingAttendeeWithUser } from "../../data/meetings/listMeetingAttendees";
import { classnames } from "../../utils/classnames";
import { Button } from "../Button";
import { CreateOrUpdateMeetingAgendaItemForm } from "../CreateOrUpdateMeetingAgendaItemForm";
import { EditMeetingAgendaItemButton } from "../EditMeetingAgendaItemButton";
import { FileAttachmentChip } from "../FileAttachmentChip";
import { Group } from "../Group";
import { Header } from "../Header";
import { AddIcon } from "../Icon/AddIcon";
import { CheckmarkIcon } from "../Icon/CheckmarkIcon";
import { DownIcon } from "../Icon/DownIcon";
import { UpIcon } from "../Icon/UpIcon";
import { InboxMessageQuote } from "../InboxMessageQuote";
import { InvoiceChip } from "../InvoiceChip";
import { Modal } from "../Modal";
import { RemoveButton } from "../RemoveButton";
import { Stack } from "../Stack";
import { TextArea } from "../TextArea";
import { MeetingAgendaItemCheckbox } from "./Checkbox";
import { VoteTracker } from "./VoteTracker";

function formatOrdinal(n: number): string {
  return String(n).padStart(2, "0");
}

interface Props {
  agendaItem: MeetingAgendaItem;
  attendees: MeetingAttendeeWithUser[];
  className?: string;
  index: number;
  isFirst: boolean;
  isLast: boolean;
  meetingId: string;
}

export function MeetingAgendaItem({
  agendaItem,
  attendees,
  index,
  isFirst,
  isLast,
  meetingId,
}: Props) {
  const [pending, startTransition] = useTransition();
  const [showInsertModal, setShowInsertModal] = useState(false);

  const onBlur = useCallback(
    (e: React.FocusEvent<HTMLTextAreaElement>) =>
      startTransition(async () =>
        imperativeUpdateAgendaItemAction(meetingId, agendaItem.id, {
          minutes: e.currentTarget.value,
        }),
      ),
    [meetingId, agendaItem.id],
  );

  const reorder = useCallback(
    (direction: "up" | "down") =>
      startTransition(() =>
        reorderAgendaItemAction(meetingId, agendaItem.id, direction),
      ),
    [meetingId, agendaItem.id],
  );

  const isDone = agendaItem.done === 1;

  return (
    <>
      <div
        className={classnames(
          isDone ? styles.agendaItemWrapperDone : styles.agendaItemWrapper,
        )}
      >
        <div className={styles.ordinalColumn}>
          <div
            className={isDone ? styles.ordinalNumberDone : styles.ordinalNumber}
          >
            {formatOrdinal(index)}
            {isDone && (
              <span className={styles.ordinalCheckmark}>
                <CheckmarkIcon style={{ color: "white" }} />
              </span>
            )}
          </div>
          {!isLast && (
            <div className={isDone ? styles.trackLineDone : styles.trackLine} />
          )}
        </div>

        <Stack
          className={classnames(
            styles.agendaItemContent,
            isDone ? styles.agendaItemDone : styles.agendaItem,
          )}
        >
          <Group justify="space-between">
            <Group>
              <MeetingAgendaItemCheckbox
                allVotesIn={
                  agendaItem.type === "vote"
                    ? agendaItem.votes.length >= attendees.length &&
                      attendees.length > 0
                    : undefined
                }
                done={agendaItem.done}
                isVoteItem={agendaItem.type === "vote"}
                itemId={agendaItem.id}
                meetingId={meetingId}
              />

              <Header className={styles.headerHeader} as="h4">
                {agendaItem.title}
              </Header>
            </Group>

            {!isDone && (
              <Group gap="small">
                <Button
                  disabled={isFirst || pending}
                  icon={<UpIcon />}
                  onClick={() => reorder("up")}
                  size="small"
                  style="tertiary"
                />
                <Button
                  disabled={isLast || pending}
                  icon={<DownIcon />}
                  onClick={() => reorder("down")}
                  size="small"
                  style="tertiary"
                />
                <Button
                  disabled={pending}
                  icon={<AddIcon />}
                  onClick={() => setShowInsertModal(true)}
                  size="small"
                  style="tertiary"
                />
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

          {agendaItem.type === "item" && (
            <>
              {agendaItem.message && (
                <InboxMessageQuote
                  source={agendaItem.message}
                  linkType="direct"
                />
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
                <InvoiceChip
                  invoice={agendaItem.invoice}
                  showMarkPaid={false}
                />
              )}
            </>
          )}

          {agendaItem.type === "vote" && (
            <VoteTracker
              agendaItemId={agendaItem.id}
              attendees={attendees}
              disabled={isDone || pending}
              meetingId={meetingId}
              votes={agendaItem.votes}
            />
          )}

          <TextArea
            defaultValue={agendaItem.minutes || ""}
            disabled={pending || isDone}
            label={
              agendaItem.type === "discussion" ? "Discussion Notes" : "Minutes"
            }
            onBlur={onBlur}
            placeholder={
              agendaItem.type === "discussion"
                ? "Record the discussion here..."
                : "Minutes"
            }
          />
        </Stack>
      </div>

      {showInsertModal && (
        <Modal
          closeModal={() => setShowInsertModal(false)}
          title="Insert Agenda Item"
        >
          <CreateOrUpdateMeetingAgendaItemForm
            meetingId={meetingId}
            afterItemId={agendaItem.id}
            onCreateOrUpdateAgendaItem={() => setShowInsertModal(false)}
          />
        </Modal>
      )}
    </>
  );
}
