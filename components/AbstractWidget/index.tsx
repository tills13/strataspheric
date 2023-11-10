"use client";

import * as styles from "./style.css";

import React from "react";
import { type Widget } from "../../data/widgets";
import { classnames } from "../../utils/classnames";
import { useSession } from "next-auth/react";
import { can } from "../../data/members/permissions";
import { Header } from "../Header";
import { RemoveButton } from "../RemoveButton";

export interface Props {
  className?: string;
  deleteWidget?: (widgetId: string) => void;
  widget: Widget;
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
