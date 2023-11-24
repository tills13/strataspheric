import * as abstractWidgetStyles from "../AbstractWidget/style.css";
import * as styles from "./style.css";

import { startTransition } from "react";

import { Event } from "../../db";
import { DropdownActions } from "../DropdownActions";
import { Header } from "../Header";
import { DeleteIcon } from "../Icon/DeleteIcon";

interface Props {
  deleteEvent: (eventId: string) => void;
  events: Event[];
  widgetId: string;
}

export function EventWidgetList({ deleteEvent, events, widgetId }: Props) {
  return (
    <div className={abstractWidgetStyles.abstractWidgetList}>
      {events.length === 0 && <div>no events</div>}

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
            <span suppressHydrationWarning>{event.date.toLocaleString()}</span>
            <DropdownActions
              actions={[
                {
                  label: "Delete Event",
                  action: () =>
                    startTransition(() => {
                      deleteEvent(event.id);
                    }),
                  icon: <DeleteIcon />,
                },
              ]}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
