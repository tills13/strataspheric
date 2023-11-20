"use client";

import * as styles from "./style.css";

import { useSession } from "next-auth/react";
import React from "react";

import { StrataWidget } from "../../db";
import { can } from "../../db/users/permissions";
import { classnames } from "../../utils/classnames";
import { Header } from "../Header";
import { RemoveButton } from "../RemoveButton";

export interface Props {
  className?: string;
  deleteWidget?: (widgetId: string) => void;
  widget: StrataWidget;
}

export function AbstractWidget({
  className,
  deleteWidget,
  children,
  widget,
}: React.PropsWithChildren<Props>) {
  const { data: session } = useSession();

  return (
    <div className={classnames(styles.abstractWidget, className)}>
      <div className={styles.abstractWidgetHeader}>
        <Header priority={2}>{widget.title}</Header>
        {deleteWidget && can(session?.user, "stratas.widgets.delete") && (
          <RemoveButton onClick={deleteWidget.bind(undefined, widget.id)} />
        )}
      </div>
      <div className={styles.abstractWidgetBody}>{children}</div>
    </div>
  );
}
