import { auth } from "../../../auth";
import { Grid } from "../../../components/Grid";
import { NewWidgetWidget } from "../../../components/NewWidgetWidget";
import { Widget } from "../../../components/Widget";
import { Strata } from "../../../data";
import { can } from "../../../data/users/permissions";
import { getWidgets } from "../../../data/widgets/getWidgets";

interface Props {
  strata: Strata;
}

export async function StrataWidgets({ strata }: Props) {
  const [session, widgets] = await Promise.all([auth(), getWidgets(strata.id)]);

  return (
    <Grid cols={{ base: 1, tabletPlus: 2, desktop: 3 }} p="normal">
      {widgets.map((widget) => (
        <Widget key={widget.id} strata={strata} widget={widget} />
      ))}
      {can(session?.user, "stratas.widgets.create") && (
        <NewWidgetWidget strataId={strata.id} />
      )}
    </Grid>
  );
}
