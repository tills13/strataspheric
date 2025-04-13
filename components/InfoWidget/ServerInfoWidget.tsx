import { Strata, StrataWidget } from "../../data";
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

export async function ServerInfoWidget({
  deleteWidget,
  strata,
  upsertStrataWidget,
  widget,
}: Props) {
  return (
    <AbstractWidget
      deleteWidget={deleteWidget}
      upsertStrataWidget={upsertStrataWidget}
      widget={widget}
      widgetTitle={widget.title}
    >
      {widget.type === "info" ? (
        <Text>{widget.body}</Text>
      ) : (
        <InfoWidgetContact strata={strata} />
      )}
    </AbstractWidget>
  );
}
