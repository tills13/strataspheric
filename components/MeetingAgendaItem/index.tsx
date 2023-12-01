"use client";

import * as iconButtonStyles from "../IconButton/style.css";
import * as styles from "./style.css";
import { style } from "@vanilla-extract/css";

import React, { startTransition } from "react";

import { MeetingAgendaItemUpdate } from "../../data";
import { type MeetingAgendaItem as IMeetingAgendaItem } from "../../data/meetings/getMeetingAgendaItems";
import { classnames } from "../../utils/classnames";
import { Checkbox } from "../Checkbox";
import { EditMeetingAgendaItemButton } from "../EditMeetingAgendaItemButton";
import { FileAttachmentChip } from "../FileAttachmentChip";
import { Header } from "../Header";
import { RemoveButton } from "../RemoveButton";

interface Props {
  className?: string;
  agendaItem: IMeetingAgendaItem;
  imperativeUpdateAgendaItem: (
    agendaItemUpdate: MeetingAgendaItemUpdate,
  ) => void;
  removeAgendaItem: () => void;
  updateAgendaItem: (fd: FormData) => void;
}

export function MeetingAgendaItem({
  agendaItem,
  imperativeUpdateAgendaItem,
  removeAgendaItem,
  updateAgendaItem,
}: Props) {
  return (
    <div
      className={classnames(
        agendaItem.done === 1 ? styles.agendaItemDone : styles.agendaItem,
      )}
    >
      <div className={styles.header}>
        <Checkbox
          onChange={() => {
            startTransition(() => {
              imperativeUpdateAgendaItem({
                done: agendaItem.done === 1 ? 0 : 1,
              });
            });
          }}
          checked={agendaItem.done === 1}
        />
        <Header priority={3}>{agendaItem.title}</Header>

        <div className={styles.agendaItemActions}>
          <EditMeetingAgendaItemButton
            agendaItem={agendaItem}
            buttonClassName={classnames(
              iconButtonStyles.iconButton,
              iconButtonStyles.iconButtonSizes.small,
            )}
            updateMeetingAgendaItem={updateAgendaItem}
          />
          <RemoveButton
            onClick={removeAgendaItem}
            className={classnames(
              iconButtonStyles.iconButton,
              iconButtonStyles.iconButtonSizes.small,
            )}
          />
        </div>
      </div>

      <p className={styles.agendaItemDescription}>{agendaItem.description}</p>

      {agendaItem.fileId && (
        <FileAttachmentChip
          fileName={agendaItem.fileName}
          filePath={agendaItem.filePath}
        />
      )}
    </div>
  );
}