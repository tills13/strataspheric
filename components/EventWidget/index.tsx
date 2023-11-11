import * as styles from "./style.css";
import * as abstractWidgetStyles from "../AbstractWidget/style.css";

import { EventWidget as IEventWidget } from "../../data/widgets";
import {
  AbstractWidget,
  type Props as AbstractWidgetProps,
} from "../AbstractWidget";
import { NewEventForm } from "../NewEventForm";
import { Header } from "../Header";
import { can } from "../../data/members/permissions";
import { auth } from "../../auth";

interface Props extends AbstractWidgetProps {
  createEvent: (fd: FormData) => void;
  widget: IEventWidget;
}

export async function EventWidget({
  createEvent,
  deleteWidget,
  widget,
}: Props) {
  const session = await auth();

  return (
    <AbstractWidget
      className={styles.eventWidget}
      deleteWidget={deleteWidget}
      widget={widget}
    >
      <div className={abstractWidgetStyles.abstractWidgetList}>
        {widget.events.length === 0 && <div>no events</div>}

        {widget.events.map((event) => (
          <div
            key={event.id}
            className={abstractWidgetStyles.abstractWidgetListItem}
          >
            <div>
              <Header priority={3}>{event.name}</Header>
              <p>{event.description}</p>
              <span suppressHydrationWarning>
                {event.date.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {can(session?.user, "stratas.events.create") && (
        <div className={styles.eventWidgetFooter}>
          <Header priority={4}>New Event</Header>
          <NewEventForm createEvent={createEvent} widgetId={widget.id} />
        </div>
      )}
    </AbstractWidget>
  );
}
