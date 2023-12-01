import * as iconStyles from "../Icon/style.css";
import * as styles from "./style.css";

import React from "react";

import { classnames } from "../../utils/classnames";
import { ChatIcon } from "../Icon/ChatIcon";
import { EventIcon } from "../Icon/EventIcon";
import { ForumIcon } from "../Icon/ForumIcon";
import { TextDocumentIcon } from "../Icon/TextDocumentIcon";

interface Props {
  className?: string;
  type: "event" | "file" | "inbox_message" | "chat";
}

export function MeetingTimelineIcon({ className, type }: Props) {
  let icon: React.ReactNode | undefined;

  const iconClassName = classnames(
    iconStyles.icon,
    // iconStyles.iconVariants.primary,
    styles.timelineIconIcon,
  );

  if (type === "chat") {
    icon = <ChatIcon className={iconClassName} />;
  } else if (type === "file") {
    icon = <TextDocumentIcon className={iconClassName} />;
  } else if (type === "event") {
    icon = <EventIcon className={iconClassName} />;
  } else if (type === "inbox_message") {
    icon = <ForumIcon className={iconClassName} />;
  }

  if (!icon) {
    return null;
  }

  return (
    <div className={classnames(styles.timelineIcon, className)}>{icon}</div>
  );
}
