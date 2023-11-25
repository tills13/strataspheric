import { Suspense } from "react";

import { StrataWidget } from "../data";
import { ServerEventWidget } from "./EventWidget/ServerEventWidget";
import { ServerFileWidget } from "./FileWidget/ServerFileWidget";
import { Header } from "./Header";
import { WidgetSkeleton } from "./Skeleton/WidgetSkeleton";

interface Props {
  createEvent: (fd: FormData) => void;
  deleteEvent: (eventId: string) => void;
  createFile: (fd: FormData) => void;
  deleteFile: (fileId: string) => void;
  deleteWidget: () => void;
  widget: StrataWidget;
}

export function Widget({
  createEvent,
  createFile,
  deleteEvent,
  deleteFile,
  deleteWidget,
  widget,
}: Props) {
  switch (widget.type) {
    case "event": {
      return (
        <Suspense
          fallback={
            <WidgetSkeleton
              title={<Header priority={2}>{widget.title}</Header>}
            />
          }
        >
          <ServerEventWidget
            createEvent={createEvent}
            deleteEvent={deleteEvent}
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
            <WidgetSkeleton
              title={<Header priority={2}>{widget.title}</Header>}
            />
          }
        >
          <ServerFileWidget
            createFile={createFile}
            deleteFile={deleteFile}
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
