import { EventWidget } from ".";
import { getWidgetEvents } from "../../data/widgets/getWidgetEvents";
import { type Props as AbstractWidgetProps } from "../AbstractWidget";

interface Props extends AbstractWidgetProps {
  createEvent: (fd: FormData) => Promise<void>;
  deleteEvent: (eventId: string) => Promise<void>;
}

export async function ServerEventWidget({
  createEvent,
  deleteEvent,
  deleteWidget,
  upsertStrataWidget,
  widget,
}: Props) {
  const events = await getWidgetEvents(widget.id, 10, 0);

  return (
    <EventWidget
      createEvent={createEvent}
      deleteEvent={deleteEvent}
      deleteWidget={deleteWidget}
      initialEvents={events}
      widget={widget}
      upsertStrataWidget={upsertStrataWidget}
    />
  );
}
