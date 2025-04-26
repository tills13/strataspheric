import React from "react";

import { EventWidget } from ".";
import { getWidgetEvents } from "../../data/widgets/getWidgetEvents";

type EventWidgetProps = Omit<
  React.ComponentProps<typeof EventWidget>,
  "initialEvents"
>;

export async function ServerEventWidget({
  strataId,
  widget,
}: EventWidgetProps) {
  const events = await getWidgetEvents(widget.id, 10, 0);

  return (
    <EventWidget initialEvents={events} strataId={strataId} widget={widget} />
  );
}
