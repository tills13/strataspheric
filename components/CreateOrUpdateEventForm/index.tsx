"use client";

import * as styles from "./style.css";

import { useTransition } from "react";

import { Event } from "../../data";
import { classnames } from "../../utils/classnames";
import { formatDateForDatetime } from "../../utils/datetime";
import { getString } from "../../utils/formdata";
import { ElementGroup } from "../ElementGroup";
import { Input } from "../Input";
import { StatusButton } from "../StatusButton";

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
        const startDate = getString(fd, "startDate");
        const endDate = getString(fd, "endDate");

        // const tzOffset = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const rawTzOffset = new Date().getTimezoneOffset() / 60;
        const isNegative = rawTzOffset >= 0;

        const tzOffset =
          (isNegative ? "-" : "") +
          rawTzOffset.toString().padStart(2, "0") +
          ":00";

        console.log(startDate + tzOffset);

        fd.set("startDate", startDate + tzOffset);
        fd.set("endDate", endDate + tzOffset);

        const u = await upsertEvent(fd);
        console.log(u);
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
            (event
              ? formatDateForDatetime(new Date(event.startDate))
              : undefined)
          }
        />
        <Input
          className={styles.fullWidth}
          name="endDate"
          type="datetime-local"
          placeholder="End Date"
          defaultValue={
            defaultDate ||
            (event ? formatDateForDatetime(new Date(event.endDate)) : undefined)
          }
        />
      </div>

      <Input
        name="description"
        placeholder="Description"
        defaultValue={event?.description}
      />

      <ElementGroup gap="small">
        <StatusButton type="submit">{event ? "Update" : "Create"}</StatusButton>

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
