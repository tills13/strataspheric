import { type Widget as IWidget } from "../data/widgets";
import { EventWidget } from "./EventWidget";
import { FileWidget } from "./FileWidget";

interface Props {
  createEvent: (fd: FormData) => void;
  createFile: (fd: FormData) => void;
  deleteWidget: (widgetId: string) => void;
  widget: IWidget;
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
        <EventWidget
          createEvent={createEvent}
          deleteWidget={deleteWidget}
          widget={widget}
        />
      );
    }

    case "file": {
      return (
        <FileWidget
          createFile={createFile}
          deleteWidget={deleteWidget}
          widget={widget}
        />
      );
    }

    default: {
      return null;
    }
  }
}
