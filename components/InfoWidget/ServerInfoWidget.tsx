import { Strata, StrataWidget, db } from "../../data";
import { sanitizeHtml } from "../../utils/sanitizeHtml";
import {
  AbstractWidget,
  Props as AbstractWidgetProps,
} from "../AbstractWidget";
import { Text } from "../Text";
import { InfoWidgetContact } from "./InfoWidgetContact";

interface Props extends AbstractWidgetProps {
  strata: Strata;
  widget: StrataWidget;
}

export async function ServerInfoWidget({ strata, strataId, widget }: Props) {
  const widgetInfo =
    widget.type === "info"
      ? await db()
          .selectFrom("widget_info")
          .select("widget_info.body")
          .where("widget_info.widgetId", "=", widget.id)
          .executeTakeFirst()
      : undefined;

  // body is sanitized via sanitizeHtml before rendering
  const sanitizedBody = sanitizeHtml(widgetInfo?.body ?? "");

  return (
    <AbstractWidget
      strataId={strataId}
      widget={widget}
      widgetTitle={widget.title}
    >
      {widget.type === "info" ? (
        <Text
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: sanitizedBody,
          }}
        />
      ) : (
        <InfoWidgetContact strata={strata} />
      )}
    </AbstractWidget>
  );
}
