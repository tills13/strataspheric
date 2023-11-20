import { Suspense } from "react";

import { StrataWidget } from "../db";
import { EventWidget } from "./EventWidget";
import { FileWidget } from "./FileWidget";
import { Header } from "./Header";
import { Skeleton } from "./Skeleton";

interface Props {
  createEvent: (fd: FormData) => void;
  createFile: (fd: FormData) => void;
  deleteWidget: (widgetId: string) => void;
  widget: StrataWidget;
}

export function Widget({
  createEvent,
  createFile,
  deleteWidget,
  widget,
}: Props) {
  switch (widget.type) {
    case "event": {
      return (
        <Suspense
          fallback={
            <Skeleton title={<Header priority={2}>{widget.title}</Header>} />
          }
        >
          <EventWidget
            createEvent={createEvent}
            deleteWidget={deleteWidget}
            widget={widget}
          />
        </Suspense>
      );
    }

    case "file": {
      return (
        <Suspense
          fallback={
            <Skeleton title={<Header priority={2}>{widget.title}</Header>} />
          }
        >
          <FileWidget
            createFile={createFile}
            deleteWidget={deleteWidget}
            widget={widget}
          />
        </Suspense>
      );
    }

    default: {
      return null;
    }
  }
}
