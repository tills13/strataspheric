import { s } from "../../sprinkles.css";
import * as styles from "./style.css";

import React, { useState } from "react";

import { MeetingAgendaItem } from "../../data/meetings/getMeetingAgendaItems";
import { AttachFileField } from "../AttachFileField";
import { Input } from "../Input";
import { StatusButton } from "../StatusButton";
import { TextArea } from "../TextArea";

interface Props {
  upsertFile: (fd: FormData) => any;
  upsertMeetingAgendaItem: (fd: FormData) => void;
  agendaItem?: MeetingAgendaItem;
}

export function CreateOrUpdateMeetingAgendaItemForm({
  upsertFile,
  upsertMeetingAgendaItem,
  agendaItem,
}: Props) {
  return (
    <form action={upsertMeetingAgendaItem}>
      <Input
        className={styles.input}
        name="title"
        placeholder="Title"
        defaultValue={agendaItem?.title}
      />

      <TextArea
        className={styles.input}
        name="description"
        placeholder="Description"
        defaultValue={agendaItem?.description}
      />

      <AttachFileField
        buttonClassName={s({ mb: "small" })}
        defaultValue={
          agendaItem?.fileId && agendaItem?.fileName
            ? { id: agendaItem.fileId, name: agendaItem.fileName }
            : undefined
        }
        name="fileId"
        upsertFile={upsertFile}
      />

      <StatusButton type="submit">
        {agendaItem ? "Update Agenda Item" : "Create Agenda Item"}
      </StatusButton>
    </form>
  );
}
