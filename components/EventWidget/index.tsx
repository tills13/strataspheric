import * as styles from "./style.css";

import { StrataWidget } from "../../db";
import { can } from "../../db/users/permissions";
import {
  AbstractWidget,
  type Props as AbstractWidgetProps,
} from "../AbstractWidget";
import { Header } from "../Header";
import { NewEventForm } from "../NewEventForm";
import { EventWidgetList } from "./EventWidgetList";
import { getWidgetEvents } from "../../db/widgets/getWidgetEvents";
import { auth } from "../../auth";

interface Props extends AbstractWidgetProps {
  createEvent: (fd: FormData) => void;
  widget: StrataWidget;
}

export async function EventWidget({
  createEvent,
  deleteWidget,
  widget,
}: Props) {
  const session = await auth();
  const events = await getWidgetEvents(widget.id, 10, 0);

  return (
    <AbstractWidget
      className={styles.eventWidget}
      deleteWidget={deleteWidget}
      widget={widget}
    >
      <EventWidgetList events={events} />

      {can(session?.user, "stratas.events.create") && (
        <div className={styles.eventWidgetFooter}>
          <Header priority={4}>New Event</Header>
          <NewEventForm createEvent={createEvent} widgetId={widget.id} />
        </div>
      )}
    </AbstractWidget>
  );
}
