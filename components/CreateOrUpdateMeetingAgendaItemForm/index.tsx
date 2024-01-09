import { s } from "../../sprinkles.css";
import * as styles from "./style.css";

import React, { useState } from "react";

import { MeetingAgendaItem } from "../../data/meetings/getMeetingAgendaItems";
import { AttachFileField } from "../AttachFileField";
import { AddIcon } from "../Icon/AddIcon";
import { SaveIcon } from "../Icon/SaveIcon";
import { Input } from "../Input";
import { StatusButton } from "../StatusButton";
import { TextArea } from "../TextArea";

interface Props {
  agendaItem?: MeetingAgendaItem;
  onCreateOrUpdateAgendaItem?: () => void;
  upsertFile: (fd: FormData) => any;
  upsertMeetingAgendaItem: (fd: FormData) => any;
}

export function CreateOrUpdateMeetingAgendaItemForm({
  agendaItem,
  onCreateOrUpdateAgendaItem,
  upsertFile,
  upsertMeetingAgendaItem,
}: Props) {
  return (
    <form
      action={async (fd) => {
        await upsertMeetingAgendaItem(fd);
        onCreateOrUpdateAgendaItem?.();
      }}
    >
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

      <StatusButton
        color={agendaItem ? "primary" : "success"}
        iconRight={agendaItem ? <SaveIcon /> : <AddIcon />}
        style="secondary"
        type="submit"
      >
        {agendaItem ? "Update Agenda Item" : "Create Agenda Item"}
      </StatusButton>
    </form>
  );
}
