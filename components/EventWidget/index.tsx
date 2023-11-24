"use client";

import * as styles from "./style.css";

import { useSession } from "next-auth/react";
import { useState } from "react";

import { StrataWidget } from "../../db";
import { can } from "../../db/users/permissions";
import {
  AbstractWidget,
  type Props as AbstractWidgetProps,
} from "../AbstractWidget";
import { AddIcon } from "../Icon/AddIcon";
import { Modal } from "../Modal";
import { NewEventForm } from "../NewEventForm";
import { EventWidgetList } from "./EventWidgetList";

interface Props extends AbstractWidgetProps {
  initialEvents: React.ComponentProps<typeof EventWidgetList>["events"];
  createEvent: (fd: FormData) => void;
  deleteEvent: (eventId: string) => void;
  widget: StrataWidget;
}

export function EventWidget({
  initialEvents,
  createEvent,
  deleteEvent,
  deleteWidget,
  widget,
}: Props) {
  const { data: session } = useSession();
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <AbstractWidget
      additionalActions={[
        can(session?.user, "stratas.events.create") && {
          label: "Add Event",
          action: () => setShowCreateModal(true),
          icon: <AddIcon />,
        },
      ]}
      className={styles.eventWidget}
      deleteWidget={deleteWidget}
      widgetTitle={widget.title}
    >
      <EventWidgetList
        deleteEvent={deleteEvent}
        events={initialEvents}
        widgetId={widget.id}
      />

      {showCreateModal && (
        <Modal
          closeModal={() => setShowCreateModal(false)}
          title={"Add Event to " + widget.title}
        >
          <NewEventForm createEvent={createEvent} />
        </Modal>
      )}
    </AbstractWidget>
  );
}
