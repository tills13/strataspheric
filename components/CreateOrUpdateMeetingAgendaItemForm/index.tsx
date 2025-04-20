"use client";

import { s } from "../../sprinkles.css";
import * as styles from "./style.css";

import React, { useState } from "react";

import { upsertAgendaItemAction } from "../../app/@app/dashboard/meetings/[meetingId]/actions";
import { MeetingAgendaItem } from "../../data/meetings/listMeetingAgendaItems";
import { classnames } from "../../utils/classnames";
import { AttachFileField } from "../AttachFileField";
import { FileAttachmentChip } from "../FileAttachmentChip";
import { AddIcon } from "../Icon/AddIcon";
import { SaveIcon } from "../Icon/SaveIcon";
import { Input } from "../Input";
import { Stack } from "../Stack";
import { StatusButton } from "../StatusButton";
import { TextArea } from "../TextArea";

interface Props {
  agendaItem?: MeetingAgendaItem;
  meetingId: string;
  onCreateOrUpdateAgendaItem?: () => void;
}

export function CreateOrUpdateMeetingAgendaItemForm({
  agendaItem,
  meetingId,
  onCreateOrUpdateAgendaItem,
}: Props) {
  return (
    <form
      action={async (fd) => {
        await upsertAgendaItemAction(meetingId, agendaItem?.id, fd);
        onCreateOrUpdateAgendaItem?.();
      }}
    >
      <Stack>
        <Input
          className={s({ w: "full" })}
          name="title"
          label="Title"
          defaultValue={agendaItem?.title}
        />

        <TextArea
          className={s({ w: "full" })}
          name="description"
          label="Description"
          defaultValue={agendaItem?.description}
        />

        <div className={classnames(styles.fileAttachmentContainer)}>
          <AttachFileField
            className={styles.fileAttachmentButton}
            defaultValue={agendaItem?.file}
            name="fileId"
          />
        </div>

        <StatusButton
          color={agendaItem ? "primary" : "success"}
          iconRight={agendaItem ? <SaveIcon /> : <AddIcon />}
          style="primary"
          type="submit"
        >
          {agendaItem ? "Update Agenda Item" : "Add Agenda Item"}
        </StatusButton>
      </Stack>
    </form>
  );
}
