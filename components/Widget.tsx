import { Suspense } from "react";
import { getWidget } from "../data/widgets/getWidget";
import { EventWidget } from "./EventWidget";
import { FileWidget } from "./FileWidget";
import { Skeleton } from "./Skeleton";
import { Header } from "./Header";

interface Props {
  createEvent: (fd: FormData) => void;
  createFile: (fd: FormData) => void;
  deleteWidget: (widgetId: string) => void;
  widgetId: string;
  // widget: IWidget;
}

export async function Widget({
  createEvent,
  createFile,
  deleteWidget,
  widgetId,
}: Props) {
  const widget = await getWidget(widgetId);

  if (!widget) {
    return null;
  }

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
