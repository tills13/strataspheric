"use client";

import * as styles from "./style.css";

import React, { startTransition, useState } from "react";

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
  deleteWidget?: () => Promise<void>;
  widgetTitle?: React.ReactNode;
  widget: StrataWidget;
  upsertStrataWidget: (fd: FormData) => Promise<void>;
}

export function AbstractWidget({
  additionalActions = [],
  className,
  deleteWidget,
  children,
  widget,
  widgetTitle,
  upsertStrataWidget,
}: React.PropsWithChildren<Props>) {
  const session = useSession();
  const [showEditWidgetModal, setShowEditWidgetModal] = useState(false);

  const widgetActions = [
    ...additionalActions,
    can(session?.user, "stratas.widgets.edit") &&
      deleteWidget && {
        label: "Edit Widget",
        action: () => setShowEditWidgetModal(true),
        icon: <EditIcon />,
      },
    can(session?.user, "stratas.widgets.delete") &&
      deleteWidget && {
        label: "Delete Widget",
        action: () =>
          startTransition(() => {
            deleteWidget();
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
              buttonSize="small"
              buttonStyle="tertiary"
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
          <CreateOrUpdateStrataWidgetForm
            widget={widget}
            upsertStrataWidget={upsertStrataWidget}
          />
        </Modal>
      )}
    </>
  );
}
