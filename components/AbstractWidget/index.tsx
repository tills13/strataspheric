"use client";

import * as styles from "./style.css";

import React, { startTransition, useState } from "react";

import { deleteWidgetAction } from "../../app/@app/dashboard/actions";
import { StrataWidget } from "../../data";
import { can } from "../../data/users/permissions";
import { useSession } from "../../hooks/useSession";
import { classnames } from "../../utils/classnames";
import { CreateOrUpdateStrataWidgetForm } from "../CreateOrUpdateStrataWidgetForm";
import { DropdownActions, filterIsAction } from "../DropdownActions";
import { Header } from "../Header";
import { DeleteIcon } from "../Icon/DeleteIcon";
import { EditIcon } from "../Icon/EditIcon";
import { Modal } from "../Modal";

export interface Props {
  additionalActions?: React.ComponentProps<typeof DropdownActions>["actions"];
  className?: string;
  strataId: string;
  widgetTitle?: React.ReactNode;
  widget: StrataWidget;
}

export function AbstractWidget({
  additionalActions = [],
  className,
  children,
  strataId,
  widget,
  widgetTitle,
}: React.PropsWithChildren<Props>) {
  const session = useSession();
  const [showEditWidgetModal, setShowEditWidgetModal] = useState(false);

  const widgetActions = [
    ...additionalActions,
    can(session?.user, "stratas.widgets.edit") && {
      label: "Edit Widget",
      action: () => setShowEditWidgetModal(true),
      icon: <EditIcon />,
    },
    can(session?.user, "stratas.widgets.delete") && {
      label: "Delete Widget",
      action: () =>
        startTransition(() => {
          deleteWidgetAction(widget.id);
        }),
      icon: <DeleteIcon />,
    },
  ].filter(filterIsAction);

  return (
    <>
      <div className={classnames(styles.abstractWidget, className)}>
        <div className={styles.abstractWidgetHeader}>
          {widgetTitle && <Header as="h2">{widgetTitle}</Header>}

          {widgetActions.length !== 0 && (
            <DropdownActions
              actions={widgetActions}
              buttonStyle="tertiary"
              mobileOnlyOpenLabel="Widget Actions"
            />
          )}
        </div>
        <div className={styles.abstractWidgetBody}>{children}</div>
      </div>
      {showEditWidgetModal && (
        <Modal
          closeModal={() => setShowEditWidgetModal(false)}
          title={`Edit ${widgetTitle}`}
        >
          <CreateOrUpdateStrataWidgetForm strataId={strataId} widget={widget} />
        </Modal>
      )}
    </>
  );
}
