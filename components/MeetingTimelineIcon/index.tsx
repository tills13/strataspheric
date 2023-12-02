import * as iconStyles from "../Icon/style.css";
import * as styles from "./style.css";

import React from "react";

import { classnames } from "../../utils/classnames";
import { ChatIcon } from "../Icon/ChatIcon";
import { EventIcon } from "../Icon/EventIcon";
import { ForumIcon } from "../Icon/ForumIcon";
import { TextDocumentIcon } from "../Icon/TextDocumentIcon";

interface Props {
  type: "event" | "file" | "inbox_message" | "chat";
}

export function MeetingTimelineIcon({ type }: Props) {
  const iconClassName = classnames(iconStyles.icon, styles.timelineIconIcon);

  switch (type) {
    case "chat": {
      return <ChatIcon className={iconClassName} />;
    }
    case "file": {
      return <TextDocumentIcon className={iconClassName} />;
    }
    case "event": {
      return <EventIcon className={iconClassName} />;
    }
    case "inbox_message": {
      return <ForumIcon className={iconClassName} />;
    }
    default: {
      return null;
    }
  }
}
