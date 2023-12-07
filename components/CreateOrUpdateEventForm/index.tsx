"use client";

import * as styles from "./style.css";

import { useTransition } from "react";

import { Event } from "../../data";
import { Button } from "../Button";
import { ElementGroup } from "../ElementGroup";
import { Input } from "../Input";
import { StatusButton } from "../StatusButton";

export function formatDefaultDate(d: Date) {
  return d.toISOString().substring(0, 16);
}

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
    <form className={styles.newEventForm} action={upsertEvent}>
      <Input name="name" placeholder="Name" defaultValue={event?.name} />
      <Input
        name="date"
        type="datetime-local"
        placeholder="Date"
        defaultValue={
          defaultDate ||
          (event ? formatDefaultDate(new Date(event.date)) : undefined)
        }
      />

      <Input
        name="description"
        placeholder="Description"
        defaultValue={event?.description}
      />

      <ElementGroup>
        <StatusButton type="submit">{event ? "Update" : "Create"}</StatusButton>

        {event && deleteEvent && (
          <StatusButton
            onClick={() => {
              startTransition(() => {
                deleteEvent();
              });
            }}
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
