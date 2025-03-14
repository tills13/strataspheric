import { EventWidget } from ".";
import { getWidgetEvents } from "../../data/widgets/getWidgetEvents";

type EventWidgetProps = React.ComponentProps<typeof EventWidget>;

export async function ServerEventWidget({
  createEvent,
  deleteEvent,
  deleteWidget,
  upsertStrataWidget,
  widget,
}: EventWidgetProps) {
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
