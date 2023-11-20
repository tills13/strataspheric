import * as abstractWidgetStyles from "../AbstractWidget/style.css";

import { Header } from "../Header";
import { Event } from "../../db";

interface Props {
  events: Event[];
}

export function EventWidgetList({ events }: Props) {
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
            <span suppressHydrationWarning>{event.date.toLocaleString()}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
