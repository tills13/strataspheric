"use client";

import * as abstractWidgetStyles from "../AbstractWidget/style.css";
import * as styles from "./style.css";

import { useSession } from "next-auth/react";
import { startTransition } from "react";

import { Event } from "../../data";
import { can, p } from "../../data/users/permissions";
import { Date } from "../Date";
import { DropdownActions } from "../DropdownActions";
import { Header } from "../Header";
import { DeleteIcon } from "../Icon/DeleteIcon";
import { InfoPanel } from "../InfoPanel";

interface Props {
  deleteEvent: (eventId: string) => void;
  events: Event[];
}

export function EventWidgetList({ deleteEvent, events }: Props) {
  const { data: session } = useSession();
  return (
    <div className={abstractWidgetStyles.abstractWidgetList}>
      {events.length === 0 && (
        <InfoPanel alignment="center" level="info">
          There are no selected or upcoming events.
        </InfoPanel>
      )}

      {events.map((event) => (
        <div
          key={event.id}
          className={abstractWidgetStyles.abstractWidgetListItem}
        >
          <div>
            <Header priority={3}>{event.name}</Header>
            <p>{event.description}</p>
          </div>
          <div className={styles.eventWidgetListActions}>
            <Date timestamp={event.startDate} />
            <DropdownActions
              actions={[
                can(session?.user, p("stratas", "widgets", "edit")) && {
                  label: "Delete Event",
                  action: () =>
                    startTransition(() => {
                      deleteEvent(event.id);
                    }),
                  icon: <DeleteIcon />,
                },
              ]}
              buttonSize="small"
              buttonStyle="tertiary"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
