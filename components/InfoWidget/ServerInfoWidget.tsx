import { auth } from "../../auth";
import { StrataWidget } from "../../data";
import { can, p } from "../../data/users/permissions";
import { AbstractWidget } from "../AbstractWidget";
import { Text } from "../Text";

interface Props {
  widget: StrataWidget;
}

export async function ServerInfoWidget({
  deleteWidget,
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
      <Text>{widget.body}</Text>
    </AbstractWidget>
  );
}
