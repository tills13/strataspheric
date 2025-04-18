import * as iconStyles from "../Icon/style.css";

import React from "react";

import { StrataActivity } from "../../data/meetings/listStrataActivity";
import { classnames } from "../../utils/classnames";
import { ChatIcon } from "../Icon/ChatIcon";
import { EventIcon } from "../Icon/EventIcon";
import { ForumIcon } from "../Icon/ForumIcon";
import { TextDocumentIcon } from "../Icon/TextDocumentIcon";

interface Props {
  type: StrataActivity["type"];
}

export function StrataActivityTimelineIcon({ type }: Props) {
  const iconClassName = classnames(iconStyles.icon);

  switch (type) {
    case "chat": {
      return <ChatIcon className={iconClassName} />;
    }
    case "invoice":
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
