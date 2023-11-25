"use client";

import * as styles from "./style.css";

import { useSession } from "next-auth/react";
import React, { startTransition } from "react";

import { can } from "../../data/users/permissions";
import { classnames } from "../../utils/classnames";
import { DropdownActions, filterIsAction } from "../DropdownActions";
import { Header } from "../Header";
import { DeleteIcon } from "../Icon/DeleteIcon";

export interface Props {
  additionalActions?: React.ComponentProps<typeof DropdownActions>["actions"];
  className?: string;
  deleteWidget?: () => void;
  widgetTitle?: React.ReactNode;
}

export function AbstractWidget({
  additionalActions = [],
  className,
  deleteWidget,
  children,
  widgetTitle,
}: React.PropsWithChildren<Props>) {
  const { data: session } = useSession();

  const widgetActions = [
    ...additionalActions,
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
    <div className={classnames(styles.abstractWidget, className)}>
      <div className={styles.abstractWidgetHeader}>
        {widgetTitle && <Header priority={2}>{widgetTitle}</Header>}

        {widgetActions.length !== 0 && (
          <DropdownActions actions={widgetActions} />
        )}
      </div>
      <div className={styles.abstractWidgetBody}>{children}</div>
    </div>
  );
}
