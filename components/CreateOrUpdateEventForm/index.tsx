"use client";

import * as styles from "./style.css";

import { useTransition } from "react";

import { Event } from "../../data";
import {
  formatDateForDatetime,
  patchTimezoneOffset,
} from "../../utils/datetime";
import { ElementGroup } from "../ElementGroup";
import { AddIcon } from "../Icon/AddIcon";
import { Input } from "../Input";
import { StatusButton } from "../StatusButton";
import { TextArea } from "../TextArea";

interface Props {
  defaultDate?: string;
  deleteEvent?: () => void;
  event?: Event;
  upsertEvent: (fd: FormData) => void;
}

export function CreateOrUpdateEventForm({
  upsertEvent,
  defaultDate,
  deleteEvent,
  event,
}: Props) {
  const [deletePending, startTransition] = useTransition();

  return (
    <form
      className={styles.newEventForm}
      action={async (fd) => {
        patchTimezoneOffset(fd, "startDate");
        patchTimezoneOffset(fd, "endDate");

        const u = await upsertEvent(fd);
      }}
    >
      <Input name="name" placeholder="Name" defaultValue={event?.name} />

      <div className={styles.dateWrapper}>
        <Input
          className={styles.fullWidth}
          name="startDate"
          type="datetime-local"
          placeholder="Start Date"
          defaultValue={
            defaultDate ||
            (event ? formatDateForDatetime(event.startDate) : undefined)
          }
        />
        <Input
          className={styles.fullWidth}
          name="endDate"
          type="datetime-local"
          placeholder="End Date"
          defaultValue={
            defaultDate ||
            (event ? formatDateForDatetime(event.endDate) : undefined)
          }
        />
      </div>

      <TextArea
        name="description"
        placeholder="Description"
        defaultValue={event?.description}
      />

      <ElementGroup gap="small">
        <StatusButton
          color="primary"
          iconRight={<AddIcon />}
          style="secondary"
          type="submit"
        >
          {event ? "Update Event" : "Create Event"}
        </StatusButton>

        {event && deleteEvent && (
          <StatusButton
            onClick={() => {
              startTransition(() => {
                deleteEvent();
              });
            }}
            color="error"
            style="secondary"
            isPending={deletePending}
            type="button"
          >
            Delete Event
          </StatusButton>
        )}
      </ElementGroup>
    </form>
  );
}
