import { createEvent } from "../data/events/createEvent";
import { type EventWidget as IEventWidget } from "../data/widgets";

interface Props {
  widget: IEventWidget;
}

export function EventWidget({ widget }: Props) {
  return (
    <div>
      <h3>{widget.title}</h3>
      <div>
        {widget.events.map((event) => (
          <div key={event.id}>
            <h4>{event.name}</h4>
            <p>{event.description}</p>
            <span suppressHydrationWarning>{event.date.toLocaleString()}</span>
          </div>
        ))}
      </div>

      <div>
        <h5>Add an event in {widget.title}</h5>
        <form action={createEvent}>
          <input name="widget_id" type="hidden" defaultValue={widget.id} />
          <input name="name" placeholder="Name" />
          <input name="description" placeholder="Description" />
          <input name="date" type="datetime-local" placeholder="Date" />
          <button type="submit">Add Event</button>
        </form>
      </div>
    </div>
  );
}
