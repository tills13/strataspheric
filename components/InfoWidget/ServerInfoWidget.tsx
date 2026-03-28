import { Strata, StrataWidget } from "../../data";
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
  return (
    <AbstractWidget
      strataId={strataId}
      widget={widget}
      widgetTitle={widget.title}
    >
      {widget.type === "info" ? (
        <Text
          dangerouslySetInnerHTML={{
            __html: sanitizeHtml(widget.body ?? ""),
          }}
        />
      ) : (
        <InfoWidgetContact strata={strata} />
      )}
    </AbstractWidget>
  );
}
