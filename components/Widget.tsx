import { Suspense } from "react";

import { Strata, StrataWidget } from "../data";
import { ServerEventWidget } from "./EventWidget/ServerEventWidget";
import { ServerFileWidget } from "./FileWidget/ServerFileWidget";
import { Header } from "./Header";
import { ServerInfoWidget } from "./InfoWidget/ServerInfoWidget";
import { WidgetSkeleton } from "./Skeleton/WidgetSkeleton";

interface Props {
  strata: Strata;
  widget: StrataWidget;
}

export function Widget({ strata, widget }: Props) {
  switch (widget.type) {
    case "events_upcoming":
    case "event": {
      return (
        <Suspense
          fallback={
            <WidgetSkeleton title={<Header as="h2">{widget.title}</Header>} />
          }
        >
          <ServerEventWidget strataId={strata.id} widget={widget} />
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
          <ServerFileWidget strataId={strata.id} widget={widget} />
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
            strata={strata}
            strataId={strata.id}
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
