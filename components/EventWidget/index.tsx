"use client";

import * as styles from "./style.css";

import { useState } from "react";

import { StrataWidget } from "../../data";
import { can, p } from "../../data/users/permissions";
import { useSession } from "../../hooks/useSession";
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
  strataId: string;
  widget: StrataWidget;
}

export function EventWidget({ initialEvents, strataId, widget }: Props) {
  const session = useSession();
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <AbstractWidget
      additionalActions={[
        can(session?.user, "stratas.events.create", "stratas.widgets.edit") && {
          label: "Add Event",
          action: () => setShowCreateModal(true),
          icon: <AddIcon />,
        },
      ]}
      className={styles.eventWidget}
      strataId={strataId}
      widgetTitle={widget.title}
      widget={widget}
    >
      <EventWidgetList events={initialEvents} />

      {showCreateModal && (
        <Modal
          closeModal={() => setShowCreateModal(false)}
          title={"Add Event to " + widget.title}
        >
          <CreateOrUpdateEventForm />
        </Modal>
      )}
    </AbstractWidget>
  );
}
