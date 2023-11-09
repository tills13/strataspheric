import { type Widget as IWidget } from "../data/widgets";
// import { EventWidget } from "./EventWidget";
import { FileWidget } from "./FileWidget";

interface Props {
  widget: IWidget;
}

export function Widget({ widget }: Props) {
  switch (widget.type) {
    case "file": {
      return <FileWidget widget={widget} />;
    }

    // case "event": {
    //   return <EventWidget widget={widget} />;
    // }

    default: {
      return null;
    }
  }
}
