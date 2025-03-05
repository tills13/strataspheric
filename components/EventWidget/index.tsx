"use client";

import * as styles from "./style.css";

import { useSession } from "next-auth/react";
import { useState } from "react";

import { StrataWidget } from "../../data";
import { can, p } from "../../data/users/permissions";
import {
  AbstractWidget,
  type Props as AbstractWidgetProps,
} from "../AbstractWidget";
import { CreateOrUpdateEventForm } from "../CreateOrUpdateEventForm";
import { AddIcon } from "../Icon/AddIcon";
import { Modal } from "../Modal";
import { EventWidgetList } from "./EventWidgetList";

interface Props extends AbstractWidgetProps {
  initialEvents: React.ComponentProps<typeof EventWidgetList>["events"];
  createEvent: (fd: FormData) => Promise<void>;
  deleteEvent: (eventId: string) => Promise<void>;
  widget: StrataWidget;
}

export function EventWidget({
  initialEvents,
  createEvent,
  deleteEvent,
  deleteWidget,
  upsertStrataWidget,
  widget,
}: Props) {
  const { data: session } = useSession();
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <AbstractWidget
      additionalActions={[
        can(
          session?.user,
          p("stratas", "events", "create"),
          p("stratas", "widgets", "edit"),
        ) && {
          label: "Add Event",
          action: () => setShowCreateModal(true),
          icon: <AddIcon />,
        },
      ]}
      className={styles.eventWidget}
      deleteWidget={deleteWidget}
      upsertStrataWidget={upsertStrataWidget}
      widgetTitle={widget.title}
      widget={widget}
    >
      <EventWidgetList deleteEvent={deleteEvent} events={initialEvents} />

      {showCreateModal && (
        <Modal
          closeModal={() => setShowCreateModal(false)}
          title={"Add Event to " + widget.title}
        >
          <CreateOrUpdateEventForm upsertEvent={createEvent} />
        </Modal>
      )}
    </AbstractWidget>
  );
}
