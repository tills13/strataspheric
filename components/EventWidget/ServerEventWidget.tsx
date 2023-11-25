import { EventWidget } from ".";
import { StrataWidget } from "../../data";
import { getWidgetEvents } from "../../data/widgets/getWidgetEvents";
import { type Props as AbstractWidgetProps } from "../AbstractWidget";

interface Props extends AbstractWidgetProps {
  createEvent: (fd: FormData) => void;
  deleteEvent: (eventId: string) => void;
  widget: StrataWidget;
}

export async function ServerEventWidget({
  createEvent,
  deleteEvent,
  deleteWidget,
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
    />
  );
}
