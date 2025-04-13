import { Suspense } from "react";

import { Strata, StrataWidget } from "../data";
import { ServerEventWidget } from "./EventWidget/ServerEventWidget";
import { ServerFileWidget } from "./FileWidget/ServerFileWidget";
import { Header } from "./Header";
import { ServerInfoWidget } from "./InfoWidget/ServerInfoWidget";
import { WidgetSkeleton } from "./Skeleton/WidgetSkeleton";

interface Props {
  createEvent: (fd: FormData) => Promise<void>;
  deleteEvent: (eventId: string) => Promise<void>;
  createFile: (fd: FormData) => Promise<void>;
  deleteFile: (fileId: string) => Promise<void>;
  deleteWidget: () => Promise<void>;
  upsertStrataWidget: (fd: FormData) => Promise<void>;
  strata: Strata;
  widget: StrataWidget;
}

export function Widget({
  createEvent,
  createFile,
  deleteEvent,
  deleteFile,
  deleteWidget,
  upsertStrataWidget,
  strata,
  widget,
}: Props) {
  switch (widget.type) {
    case "events_upcoming":
    case "event": {
      return (
        <Suspense
          fallback={
            <WidgetSkeleton title={<Header as="h2">{widget.title}</Header>} />
          }
        >
          <ServerEventWidget
            createEvent={createEvent}
            deleteEvent={deleteEvent}
            deleteWidget={deleteWidget}
            upsertStrataWidget={upsertStrataWidget}
            widget={widget}
          />
        </Suspense>
      );
    }

    case "files_minutes":
    case "files_recent":
    case "file": {
      return (
        <Suspense
          fallback={
            <WidgetSkeleton title={<Header as="h2">{widget.title}</Header>} />
          }
        >
          <ServerFileWidget
            createFile={createFile}
            deleteFile={deleteFile}
            deleteWidget={deleteWidget}
            upsertStrataWidget={upsertStrataWidget}
            widget={widget}
          />
        </Suspense>
      );
    }

    case "info":
    case "info_contact": {
      return (
        <Suspense
          fallback={
            <WidgetSkeleton title={<Header as="h2">{widget.title}</Header>} />
          }
        >
          <ServerInfoWidget
            deleteWidget={deleteWidget}
            strata={strata}
            upsertStrataWidget={upsertStrataWidget}
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
